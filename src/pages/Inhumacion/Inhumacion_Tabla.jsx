import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchInhumaciones } from "../../api/InhumacionService";

const InhumacionesTable = () => {
  const [inhumaciones, setInhumaciones] = useState([]); // Datos de inhumaciones
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const navigate = useNavigate(); // Hook de navegación

  useEffect(() => {
    const loadInhumaciones = async (page) => {
      setLoading(true); // Iniciamos el estado de carga
      try {
        const data = await fetchInhumaciones(page); // Pasa la página como argumento
        setInhumaciones(data.data); // Almacena los datos de inhumaciones
        setCurrentPage(data.current_page); // Almacena la página actual
        setTotalPages(data.last_page); // Almacena el total de páginas
      } catch (error) {
        console.error("Error fetching inhumaciones", error);
      } finally {
        setLoading(false); // Terminamos el estado de carga
      }
    };

    loadInhumaciones(currentPage); // Cargar inhumaciones de la página actual
  }, [currentPage]); // Dependencia en currentPage para recargar cuando cambie

  // Funciones para cambiar de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Redirigir a la página de extensión
  const handleExtender = (inhumacionId) => {
    navigate(`/extender/${inhumacionId}`);
  };

  // Redirigir a la página de exhumación
  const handleExhumacion = (inhumacionId) => {
    navigate(`/exhumar/${inhumacionId}`);
  };

  // Redirigir a la página de perpetuidad
  const handlePerpetuidad = (inhumacionId) => {
    navigate(`/perpetuidad/${inhumacionId}`);
  };

  return (
    <div className="">
      <span className="titulo-inh p-2 d-flex">Tabla de Inhumaciones</span>
      <div className="contenido p-3">
        {loading ? ( // Si está cargando, mostramos el spinner
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
                <th>Fecha Entrada</th>
                <th>Nro Comprobante</th>
                <th>Nombre</th>
                <th>Ap. Paterno</th>
                <th>Ap. Materno</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {inhumaciones
                .filter((inhumacion) => inhumacion.estado === "inhumacion")
                .map((inhumacion) => (
                  <tr key={inhumacion.id}>
                    <td>{inhumacion.id}</td>
                    <td>{inhumacion.fecha_entrada}</td>
                    <td>{inhumacion.nro_comprobante}</td>
                    <td>{inhumacion.persona.nombre}</td>
                    <td>{inhumacion.persona.apellido_paterno}</td>
                    <td>{inhumacion.persona.apellido_materno}</td>
                    <td>
                      <button onClick={() => handleExtender(inhumacion.id)}>
                        Extender
                      </button>
                      <button onClick={() => handleExhumacion(inhumacion.id)}>
                        Exhumación
                      </button>
                      <button onClick={() => handlePerpetuidad(inhumacion.id)}>
                        Perpetuidad
                      </button>
                    </td>
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

export default InhumacionesTable;
