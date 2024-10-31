import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerhistorialEspacios } from "../../api/BloquesService";
import "../../App.css";

const HistorialInhumaciones = () => {
  const { bloque, fila, columna, espacioId } = useParams(); // Obteniendo espacioId desde la URL
  const [inhumaciones, setInhumaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fechaHoy = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        setLoading(true);
        const response = await obtenerhistorialEspacios(espacioId);
        setInhumaciones(response.data.inhumaciones);
      } catch (error) {
        setError("No se pudo cargar el historial.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, [espacioId]);

  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <span className="titulo-inh p-2 d-flex">Historial de Inhumaciones</span>
      <div className="contenido p-2">
        <span className="titulo-span">
          Bloque {bloque}: Fila {fila}, Columna {columna}
        </span>

        {inhumaciones.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Persona</th>
                  <th>Fecha de Ingreso</th>
                  <th>Fecha de Salida</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {inhumaciones.map((inhumacion) => (
                  <tr key={inhumacion.id}>
                    <td>
                      {inhumacion.persona
                        ? `${inhumacion.persona.nombre} ${inhumacion.persona.apellido_paterno}`
                        : "Sin datos"}
                    </td>
                    <td>{inhumacion.fecha_entrada}</td>
                    <td>{inhumacion.fecha_finalizado}</td>
                    <td>{inhumacion.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted">
            No hay inhumaciones registradas para este espacio.
          </p>
        )}
      </div>
    </div>
  );
};

export default HistorialInhumaciones;
