import React, { useState } from 'react';
import { crearBloque } from '../../api/BloquesService';

const CrearBloqueForm = ({ onBloqueCreado }) => {
    const [nuevoBloque, setNuevoBloque] = useState({ nombre: '', filas: '', columnas: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoBloque({ ...nuevoBloque, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nuevoBloque.nombre || !nuevoBloque.filas || !nuevoBloque.columnas) {
            setError('Todos los campos son obligatorios');
            return;
        }
        try {
            await crearBloque(nuevoBloque);
            setNuevoBloque({ nombre: '', filas: '', columnas: '' });
            setError('');
            onBloqueCreado(); // Llama a la función para recargar los bloques
        } catch (error) {
            setError('Error al crear el bloque');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h5>Crear nuevo Bloque</h5>
            <div className="form-group">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre del bloque"
                    value={nuevoBloque.nombre}
                    onChange={handleChange}
                    className="form-control mb-2"
                />
            </div>
            <div className="form-group">
                <input
                    type="number"
                    name="filas"
                    placeholder="Número de Filas"
                    value={nuevoBloque.filas}
                    onChange={handleChange}
                    className="form-control mb-2"
                />
            </div>
            <div className="form-group">
                <input
                    type="number"
                    name="columnas"
                    placeholder="Número de Columnas"
                    value={nuevoBloque.columnas}
                    onChange={handleChange}
                    className="form-control mb-2"
                />
            </div>
            <button type="submit" className="btn btn-primary">Crear Bloque</button>
            {error && <p className="text-danger mt-2">{error}</p>}
        </form>
    );
};

export default CrearBloqueForm;
