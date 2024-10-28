import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Cambia esto si tu URL de API es diferente
});

// Puedes agregar interceptores, configuración adicional, etc. aquí si es necesario

export default api;
