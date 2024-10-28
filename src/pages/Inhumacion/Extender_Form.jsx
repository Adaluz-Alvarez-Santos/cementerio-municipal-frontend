import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchInhumacionesID,
  extenderInhumacion,
} from "../../api/InhumacionService";
import "../../App.css";
import Inhumacion from "./Inhumacion_Form";

const ExtenderInhumacion = () => {
  const { id } = useParams();
  const [inhumacion, setInhumacion] = useState(null);
  const [extensionTime, setExtensionTime] = useState("");

  const loadInhumacionDetails = async () => {
    try {
      const data = await fetchInhumacionesID(id);
      console.log("Detalles de inhumación:", data);
      setInhumacion(data.inhumacion); // Cambiar aquí para acceder a inhumacion
    } catch (error) {
      console.error("Error al cargar los detalles de la inhumación:", error);
    }
  };

  useEffect(() => {
    loadInhumacionDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await extenderInhumacion(id);
      alert("Inhumación extendida con éxito");
    } catch (error) {
      console.error("Error al extender la inhumación", error);
    }
  };

  if (!inhumacion)
    return (
      <div className="spinner-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  // Acceder a los datos de persona
  const { persona } = inhumacion;

  return (
    <div>
      <span className="titulo-inh p-2 d-flex">Detalles de Inhumación</span>
      <div className="contenido p-3">
        <p>
          <strong>ID Inhumación:</strong> {inhumacion.id}
        </p>
        <p>
          <strong>Nombre de la Persona:</strong>{" "}
          {persona ? persona.nombre : "No disponible"}
        </p>
        <p>
          <strong>Apellido Paterno:</strong>{" "}
          {persona ? persona.apellido_paterno : "No disponible"}
        </p>
        <p>
          <strong>Apellido Materno:</strong>{" "}
          {persona ? persona.apellido_materno : "No disponible"}
        </p>

        {inhumacion.persona.familiares &&
        inhumacion.persona.familiares.length > 0 ? (
          <ul>
            {inhumacion.persona.familiares.map((familiar) => (
              <li key={familiar.CI}>
                {familiar.nombre} {familiar.apellido_paterno}{" "}
                {familiar.apellido_materno} - {familiar.parentesco}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay familiares disponibles.</p>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Tiempo de Extensión:</label>
          </div>
          <button type="submit">Confirmar </button>
        </form>
      </div>
    </div>
  );
};

export default ExtenderInhumacion;
