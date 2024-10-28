import api from "./api";

export const fetchExhumaciones = async (page = 1) => {
    try {
      const response = await api.get(`/exhumaciones?page=${page}`);
  
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
  