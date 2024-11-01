import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchInhumacionesID,
  exhumarID,
  fetchFamiliares,
} from "../../api/InhumacionService";
import "../../App.css";

const ExhumarInhumacion = () => {
  const { bloque, fila, columna, espacioId, inhumacionId } = useParams();
  const [inhumacion, setInhumacion] = useState(null);
  const [familiares, setFamiliares] = useState([]);
  const [familiarSeleccionado, setFamiliarSeleccionado] = useState("");
  const [familiarNuevo, setFamiliarNuevo] = useState({
    CI: "",
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    parentesco: "",
    celular: "",
  });
  const [nroComprobante, setNroComprobante] = useState("");
  const [fechaComprobante, setFechaComprobante] = useState("");
  const [fechaExhumacion, setFechaExhumacion] = useState("");
  const [motivo, setMotivo] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInhumacionDetails = async () => {
      try {
        const data = await fetchInhumacionesID(inhumacionId);
        setInhumacion(data.inhumacion);
      } catch (error) {
        setError("Error al cargar los detalles de la inhumación");
      }
    };

    loadInhumacionDetails();
  }, [inhumacionId]);

  useEffect(() => {
    const loadFamiliares = async (persona_id) => {
      try {
        const data = await fetchFamiliares(persona_id);
        setFamiliares(data);
      } catch (error) {
        setError("Error al cargar los familiares");
      }
    };

    if (inhumacion) {
      loadFamiliares(inhumacion.persona_id);
    }
  }, [inhumacion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let familiarData;
    if (familiarSeleccionado) {
      const familiarEncontrado = familiares.find(
        (f) => f.CI === familiarSeleccionado
      );
      familiarData = familiarEncontrado ? familiarEncontrado : {};
    } else {
      familiarData = {
        CI: familiarNuevo.CI,
        nombre: familiarNuevo.nombre,
        apellido_paterno: familiarNuevo.apellido_paterno,
        apellido_materno: familiarNuevo.apellido_materno,
        parentesco: familiarNuevo.parentesco,
        celular: familiarNuevo.celular,
      };
    }

    const exhumacionData = {
      nro_comprobante: nroComprobante,
      fecha_comprobante: fechaComprobante,
      fecha_exhumacion: fechaExhumacion,
      motivo,
      familiar: familiarData,
      espacio_id: inhumacion.espacio_id, // Agregar espacio_id aquí
    };

    try {
      const response = await exhumarID(inhumacionId, exhumacionData);
      console.log("Exhumación realizada:", response.data);
      alert("Exhumación registrada con éxito");
    } catch (error) {
      console.log(exhumacionData);
      console.error(
        "Error al realizar la exhumación:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message ||
          "Ocurrió un error al registrar la exhumación"
      );
    }
  };

  return (
    <div>
      <span className="titulo-inh p-2 d-flex">Exhumar Inhumación</span>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {inhumacion ? (
        <div className="contenido p-3">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                  <span className="titulo-span">Detalles de la Inhumación</span>
                  <div className="mx-3">
                  <strong>Fecha de Inhumacion: </strong>
                  {inhumacion.fecha_entrada} {"    "}
                </div>
              </div>
              <div className="col-md-6">
                <span className="titulo-span">Detalles de la Ubicacion</span>
                <div className="mx-3">
                <strong>Bloque: </strong> {bloque} {"    "}
                <strong>Fila: </strong> {fila} {"    "}
                <strong>Columna: </strong> {columna}
              </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <span className="titulo-span">Detalles del Difunto</span>
                <div className="mx-3">
                  <strong>CI: </strong>
                  {inhumacion.persona?.CI || "No disponible"}
                  <br />
                  <strong>Nombre y Apellidos: </strong>
                  {inhumacion.persona
                    ? `${inhumacion.persona.nombre} ${inhumacion.persona.apellido_paterno} ${inhumacion.persona.apellido_materno}`
                    : "No disponible"}
                  <br />
                  <strong>Fecha de Nacimiento: </strong>
                  {inhumacion.persona?.fecha_nacimiento || "No disponible"}
                  <br />
                  <strong>Fecha de Fallecimiento: </strong>
                  {inhumacion.persona?.fecha_fallecimiento || "No disponible"}
                  <br />
                </div>
              </div>
              <div className="col-md-6">
                <span className="titulo-span">Detalles de Familiares</span>
                {inhumacion.persona.familiares &&
                inhumacion.persona.familiares.length > 0 ? (
                  <div className="mx-3">
                    {inhumacion.persona.familiares.map((familiar) => (
                      <div key={familiar.CI}>
                        <strong>CI: </strong>
                        {familiar.CI}
                        <br />
                        <strong>Nombre y Apellidos: </strong>
                        {familiar.nombre} {familiar.apellido_materno}{" "}
                        {familiar.apellido_paterno}
                        <br />
                        <strong>Parentesco: </strong>
                        {familiar.parentesco}
                        <br />
                        <strong>Telf/Celular: </strong>
                        {familiar.celular}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No hay familiares disponibles.</p>
                )}
              </div>
            </div>

            <span className="titulo-span">Detalles de la Exhumación</span>
            <div className="row mx-2">
              <div className="col-md-6 d-flex p-2">
                <label>Número de Comprobante:</label>
                <input
                  type="text"
                  value={nroComprobante}
                  onChange={(e) => setNroComprobante(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 p-2">
                <label>Fecha de Comprobante:</label>
                <input
                  type="date"
                  value={fechaComprobante}
                  onChange={(e) => setFechaComprobante(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 p-2">
                <label>Fecha de Exhumación: </label>
                <input
                  type="date"
                  value={fechaExhumacion}
                  onChange={(e) => setFechaExhumacion(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 p-2 d-flex">
                <label>Motivo de Exhumación: </label>
                <textarea
                  className="fixed"
                  style={{ width: "350px", height: "50px" }}
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mx-3">
              <label>Seleccionar Familiar:</label>
              <select
                value={familiarSeleccionado}
                onChange={(e) => setFamiliarSeleccionado(e.target.value)}
              >
                <option value="">-- Elegir un Familiar --</option>
                {familiares.map((familiar) => (
                  <option key={familiar.CI} value={familiar.CI}>
                    {familiar.nombre} {familiar.apellido_paterno}{" "}
                    {familiar.apellido_materno}
                  </option>
                ))}
              </select>
            </div>
            <div className="mx-3 pt-3 pb-2">
              <label>O registrar nuevo familiar:</label>
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setFamiliarSeleccionado(""); // Limpiar selección de familiar existente
                  }
                }}
              />
              <span>Nuevo Familiar</span>
            </div>

            {familiarSeleccionado === "" && (
              <div>
                <span className="titulo-span">Detalles del Nuevo Familiar</span>
                <div className="row mx-2">
                  <div className="col-md-6 p-2">
                    <label>CI:</label>
                    <input
                      type="text"
                      value={familiarNuevo.CI}
                      onChange={(e) =>
                        setFamiliarNuevo({
                          ...familiarNuevo,
                          CI: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6 p-2">
                    <label>Nombre:</label>
                    <input
                      type="text"
                      value={familiarNuevo.nombre}
                      onChange={(e) =>
                        setFamiliarNuevo({
                          ...familiarNuevo,
                          nombre: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6 p-2">
                    <label>Apellido Paterno:</label>
                    <input
                      type="text"
                      value={familiarNuevo.apellido_paterno}
                      onChange={(e) =>
                        setFamiliarNuevo({
                          ...familiarNuevo,
                          apellido_paterno: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6 p-2">
                    <label>Apellido Materno:</label>
                    <input
                      type="text"
                      value={familiarNuevo.apellido_materno}
                      onChange={(e) =>
                        setFamiliarNuevo({
                          ...familiarNuevo,
                          apellido_materno: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6 p-2">
                    <label>Parentesco:</label>
                    <input
                      type="text"
                      value={familiarNuevo.parentesco}
                      onChange={(e) =>
                        setFamiliarNuevo({
                          ...familiarNuevo,
                          parentesco: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6 p-2">
                    <label>Celular:</label>
                    <input
                      type="text"
                      value={familiarNuevo.celular}
                      onChange={(e) =>
                        setFamiliarNuevo({
                          ...familiarNuevo,
                          celular: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mx-3">
              <button type="submit" className="btn btn-primary">
                Registrar Exhumación
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>Cargando detalles de la inhumación...</p>
      )}
    </div>
  );
};

export default ExhumarInhumacion;
