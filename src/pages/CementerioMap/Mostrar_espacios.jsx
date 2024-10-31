import React, { useState, useEffect } from "react";
import { obtenerBloquesConDetalles } from "../../api/BloquesService";
import CrearBloqueForm from "./CrearBloque_Form";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const BloquesComponent = () => {
  const [bloques, setBloques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSpaceId, setActiveSpaceId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    cargarBloques();
  }, []);

  const cargarBloques = async () => {
    try {
      setLoading(true);
      const response = await obtenerBloquesConDetalles();
      console.log(response.data.bloques);
      setBloques(response.data.bloques);
    } catch (error) {
      setError("Error al cargar los bloques");
    } finally {
      setLoading(false);
    }
  };

  const redirigirAHistorial = (bloque, fila, columna, espacioId) => {
    navigate(
      `/espacio/${bloque.nombre}/${fila.numero}/${columna.numero}/${espacioId}/historial`
    );
  };

  const redirigirAInhumacionForm = (bloque, fila, columna, espacioId) => {
    navigate(
      `/inhumacion/${bloque.nombre}/${fila.numero}/${columna.numero}/${espacioId}`
    );
  };

  const redirigirAExhumacion = (inhumacionId, espacioId) => {
    // Redirigir a la página de exhumación
    navigate(`/exhumar/${espacioId}/${inhumacionId}`);
  };

  const handleSpaceClick = (espacio) => {
    // Si el espacio clickeado es el mismo que el activo, lo cerramos; de lo contrario, abrimos el nuevo
    setActiveSpaceId((prevId) => (prevId === espacio.id ? null : espacio.id));
  };

  return (
    <div className="container ">
      <span className="titulo-inh p-2 d-flex">
        Gestión de Bloques del Cementerio
      </span>
      <div className="contenido">
        <div className="p-2">
          <CrearBloqueForm onBloqueCreado={cargarBloques} />
        </div>

        <span className="titulo-span">Lista de bloques</span>

        {loading ? (
          <p className="text-center">Cargando bloques...</p>
        ) : (
          <>
            <div className="contenido p-1 ">
              <div className="row">
                {bloques.map((bloque) => (
                  <div
                    className="col-12 col-sm-8 col-md-6 mb-0"
                    key={bloque.id}
                  >
                    <div className="card h-100">
                      <div className="card-header bg-primary text-white">
                        <strong className="card-title">
                          Bloque {bloque.nombre}
                        </strong>
                      </div>
                      <div className="card-body p-0 ">
                        {bloque.filas.map((fila) => (
                          <div key={fila.id} className="m-2">
                            <h6 className="fw-bold">Fila {fila.numero}</h6>
                            <div className="row">
                              {fila.columnas.map((columna) => (
                                <div key={columna.id} className="col">
                                  <span>Col {columna.numero}</span>
                                  <div className="d-flex justify-content-center">
                                    {columna.espacios.map((espacio) => (
                                      <div
                                        key={`${fila.id}-${columna.id}-${espacio.id}`} // Asegúrate de que la clave sea única
                                        className="position-relative"
                                      >
                                        <span
                                          className={`badge me-1 ${
                                            espacio.estado === "ocupado"
                                              ? "bg-danger"
                                              : "bg-success"
                                          }`}
                                          style={{
                                            cursor:"pointer",
                                            fontSize: "0.8rem",
                                            width: "1.8rem",
                                            height: "1.8rem",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                          }}
                                          onClick={() =>
                                            handleSpaceClick(espacio)
                                          }

                                          
                                        >
                                          {fila.numero},{columna.numero}
                                        </span>

                                        {/* Botones de Opciones */}
                                        {activeSpaceId === espacio.id && (
                                          <div
                                            className="d-flex flex-column position-absolute"
                                            style={{
                                              top: "2rem",
                                              left: "0",
                                              zIndex: "1",
                                            }}
                                          >
                                            {espacio.estado ===
                                              "disponible" && (
                                              <button
                                                className="btn btn-primary btn-sm  mb-1"
                                                onClick={() =>
                                                  redirigirAInhumacionForm(
                                                    bloque,
                                                    fila,
                                                    columna,
                                                    espacio.id
                                                  )
                                                }
                                              >
                                                Registrar Inhumación
                                              </button>
                                            )}

                                            {espacio.estado === "ocupado" && (
                                             
                                                                              
                                                <button
                                                  className="btn btn-warning btn-sm mb-1"
                                                  onClick={() =>
                                                    redirigirAExhumacion(                                                     
                                                      espacio.id
                                                    )
                                                  }
                                                >
                                                  Registrar Exhumación
                                                </button>
                                              
                                            )}

                                            <button
                                              className="btn btn-danger btn-sm "
                                              onClick={() =>
                                                redirigirAHistorial(
                                                  bloque,
                                                  fila,
                                                  columna,
                                                  espacio.id
                                                )
                                              }
                                            >
                                              Ver Historial
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default BloquesComponent;
