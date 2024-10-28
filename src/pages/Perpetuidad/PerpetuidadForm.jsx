import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchInhumacionesID,
  perpetuarInhumacion,
} from "../../api/InhumacionService"; // Asegúrate de que estas funciones estén definidas

const PerpetuidadForm = () => {
  const { id } = useParams();
  const [inhumacion, setInhumacion] = useState(null); // Estado para cargar los datos de la inhumación
  const [razonPerpetuidad, setRazonPerpetuidad] = useState(""); // Razón de la perpetuidad

  const loadInhumacionDetails = async () => {
    try {
      const data = await fetchInhumacionesID(id);
      console.log("Detalles de inhumación:", data);
      setInhumacion(data.inhumacion); // Asegúrate de acceder correctamente a los datos
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
      await perpetuarInhumacion(id, { razon: razonPerpetuidad }); // Enviamos la razón de perpetuidad al backend
      alert("Perpetuidad registrada con éxito");
    } catch (error) {
      console.error("Error al registrar la perpetuidad", error);
    }
  };

  if (!inhumacion) return <p>Cargando detalles...</p>;

  return (
    <div>
      <h3>Detalles de Inhumación</h3>
      <p>
        <strong>ID Inhumación:</strong> {inhumacion.id}
      </p>
      <p>
        <strong>Nombre:</strong> {inhumacion.persona.nombre} {inhumacion.persona.apellido_paterno} {inhumacion.persona.apellido_materno}
      </p>
      <p>
        <strong>Fecha Entrada:</strong> {inhumacion.fecha_entrada}
      </p>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Razón de la Perpetuidad:</label>
          <textarea
            value={razonPerpetuidad}
            onChange={(e) => setRazonPerpetuidad(e.target.value)}
            placeholder="Ingrese la razón de la perpetuidad"
            required
          />
        </div>
        <button type="submit">Confirmar Perpetuidad</button>
      </form>
    </div>
  );
};

export default PerpetuidadForm;
