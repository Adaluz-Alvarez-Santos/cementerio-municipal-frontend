import React, { useState, useEffect } from "react";
import { fetchExhumaciones } from "../../api/exhumacionService";
import { fetchInhumaciones } from "../../api/InhumacionService";

const ExhumacionesTable = () => {
  const [exhumaciones, setExhumaciones] = useState([]); // Datos de inhumaciones
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    const loadExhumaciones = async (page) => {
      setLoading(true); // Iniciamos el estado de carga
      try {
        const data = await fetchExhumaciones(page); // Pasa la página como argumento
        setExhumaciones(data.data); // Almacena los datos de inhumaciones
        setCurrentPage(data.current_page); // Almacena la página actual
        setTotalPages(data.last_page); // Almacena el total de páginas
      } catch (error) {
        console.error("Error fetching inhumaciones", error);
      } finally {
        setLoading(false); // Terminamos el estado de carga
      }
    };

    loadExhumaciones(currentPage); // Cargar inhumaciones de la página actual
  }, [currentPage]); // Dependencia en currentPage para recargar cuando cambie


  // Funciones para cambiar de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="">
      <span className="titulo-inh p-2 d-flex">Tabla de Exhumaciones</span>
      <div className="contenido p-3">
        {loading ? (
          <div className="spinner-container">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <table
            className="table table-success table-hover table-responsive-md"
            style={{ backgroundColor: "#688391" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha de Exhumacion</th>
                <th>Nro Comprobante</th>
                <th>Nombre</th>
                <th>Ap. Paterno</th>
                <th>Ap. Materno</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {exhumaciones.map((exhumacion) => (
                <tr key={exhumacion.id}>
                  <td>{exhumacion.id}</td>
                  <td>{exhumacion.fecha_exhumacion}</td>
                  <td>{exhumacion.nro_comprobante}</td>
                  <td>{exhumacion.inhumacion?.persona?.nombre}</td>
                  <td>{exhumacion.inhumacion?.persona?.apellido_paterno}</td>
                  <td>{exhumacion.inhumacion?.persona?.apellido_materno}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
  
        {/* Paginación - solo se muestra si no está cargando */}
        {!loading && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );  
};

export default ExhumacionesTable;
 