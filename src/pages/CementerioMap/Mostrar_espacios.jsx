import React, { useState, useEffect } from "react";
import {
  obtenerBloquesConDetalles,
  cambiarEstadoEspacio,
} from "../../api/BloquesService";
import CrearBloqueForm from "./CrearBloque_Form";

const BloquesComponent = () => {
  const [bloques, setBloques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [numero, setNumero] = useState(""); // Número de fila o columna a agregar/eliminar

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


  return (
    <div className="container">
      <h3 className="text-center my-4">Gestión de Bloques del Cementerio</h3>
      <CrearBloqueForm onBloqueCreado={cargarBloques} />
      {loading ? (
        <p className="text-center">Cargando bloques...</p>
      ) : (
        <>
          <div className="contenido p-3 ">
            <div className="row">
              {bloques.map((bloque) => (
                <div className="col-12 col-sm-8 col-md-6 mb-3" key={bloque.id}>
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
                                <span>col {columna.numero}</span>
                                <div className="d-flex justify-content-center">
                                  {columna.espacios.map((espacio) => {
                                    console.log(espacio);
                                    return (
                                      <span
                                        key={`${fila.id}-${columna.id}-${espacio.id}`} // Asegúrate de que la clave sea única
                                        className={`badge me-1 ${
                                          espacio.estado === "ocupado"
                                            ? "bg-danger"
                                            : "bg-success"
                                        }`}
                                        style={{
                                          cursor: "pointer",
                                          fontSize: "0.8rem",
                                          width: "1.8rem",
                                          height: "1.8rem",
                                          display: "inline-flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                        onClick={() => {
                                          const nuevoEstado =
                                            espacio.estado === "ocupado"
                                              ? "disponible"
                                              : "ocupado";
                                          cambiarEstadoEspacio(
                                            fila.id,
                                            columna.id,
                                            nuevoEstado
                                          );
                                        }}
                                      >
                                        {fila.numero},{columna.numero}
                                      </span>
                                    );
                                  })}
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
  );
};

export default BloquesComponent;
