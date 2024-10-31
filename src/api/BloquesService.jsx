import api from "./api";

export const obtenerBloquesConDetalles = async () => {
  try {
    const response = await api.get("/bloques");
    return response;
  } catch (error) {
    console.error("Error al obtener los bloques", error);
    throw error; // Puedes lanzar el error para manejarlo en el componente
  }
};

// Función para crear un nuevo bloque
export const crearBloque = async (bloque) => {
  try {
    const response = await api.post("/bloques", bloque);
    return response;
  } catch (error) {
    console.error("Error al crear el bloque:", error);
    throw error;
  }
};

export const obtenerhistorialEspacios = async (espacioId) => {
  try{
  const response = await api.get(`/espacios/${espacioId}/historial`);
  return response;
  }catch{
    console.error("Error al obtener el historial", error);
    throw error; 
  }
};

export const cambiarEstadoEspacio = (filaId, columnaId, data) => {
  return api.put(`/espacios/${filaId}/${columnaId}`, data);
};
