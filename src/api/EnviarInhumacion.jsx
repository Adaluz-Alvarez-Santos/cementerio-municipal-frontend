import axios from 'axios';
const submitInhumacion = async (data) => {
    try {
        console.log('Datos a enviar:', data); // Verificar que los datos son correctos
        const response = await axios.post('http://localhost:8000/api/inhumaciones', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Inhumación creada:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error en la creación de inhumación:', error.response.data);
            console.error('Código de estado:', error.response.status);
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor:', error.request);
        } else {
            console.error('Error al enviar la solicitud:', error.message);
        }
    }
};

export default submitInhumacion;