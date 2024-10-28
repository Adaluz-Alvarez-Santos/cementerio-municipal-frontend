import api from "./api";

export const fetchInhumaciones = async (page = 1) => {
  try {
    const response = await api.get(`/inhumaciones?page=${page}`);

    // Verifica si los datos existen y son válidos
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("No data received or invalid response");
    }
  } catch (error) {
    console.error("Error fetching inhumaciones:", error.message);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

export const fetchFamiliares = async (personaId) => {
  try {
    const response = await api.get(`/familiares/${personaId}`); // Ajusta la ruta según tu API
    return response.data; // Devuelve la lista de familiares
  } catch (error) {
    console.error("Error al obtener los familiares:", error);
    throw error; // Puedes lanzar el error para manejarlo en el componente
  }
};

export const submitInhumacion = async (data) => {
  try {
    const response = await api.post("/inhumaciones", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Inhumación creada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear la inhumación:", error);
    throw error;
  }
};

export const fetchInhumacionesID = async (inhumacionId) => {
  const response = await api.get(`/inhumaciones/${inhumacionId}`);
  return response.data;
};

export const extenderInhumacion = async (inhumacionId) => {
  const response = await api.put(`/inhumaciones/${inhumacionId}/extender`);
  return response.data;
};


export const exhumarID = async (idInhumacion, exhumacionData) => {
  try {
    const response = await api.post(`/exhumaciones/${idInhumacion}`, exhumacionData);
    return response.data;
  } catch (error) {
    console.error("Error al exhumar la inhumación:", error);
    throw error;
  }
};

export const perpetuarInhumacion = async (inhumacionId) => {
  const response = await api.post(`/inhumaciones/${inhumacionId}/perpetuidad`);
  return response.data;
};
