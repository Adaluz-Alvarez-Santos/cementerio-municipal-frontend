import React, { useState } from "react";
import submitInhumacion from "../../api/EnviarInhumacion";
import "../../App.css";

const Inhumacion = () => {
  const [selectedOption, setSelectedOption] = useState("Municipal");
  const [formData, setFormData] = useState({
    fecha_entrada: "",
    fecha_comprobante: "",
    nro_comprobante: "",
    persona: {
      CI: "",
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      fecha_nacimiento: "",
      fecha_fallecimiento: "",
      es_adulto: "",
    },
    familiares: [
      {
        CI: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        parentesco: "",
        celular: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [key, subKey] = name.split(".");

    if (subKey) {
      setFormData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [subKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleFamiliarChange = (e) => {
    const { name, value } = e.target;
    // Asumiendo que solo hay un familiar por el momento
    setFormData((prev) => ({
      ...prev,
      familiares: [
        {
          ...prev.familiares[0],
          [name]: value,
        },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitInhumacion(formData)

      .then((data) => {
        console.log("Inhumación creada:", data);
        // Reset form or handle success

      })
      .catch((error) => {
        console.error("Error al crear la inhumación:", error);
        // Handle error
      });
      
  };

  return (
    <div className="container-fluid border">
      <span className="titulo-inh p-2 d-flex">Inhumacion</span>

      <form onSubmit={handleSubmit} className="contenido p-3">
        <div>
          <div className=" row g-1 cont p-2">
            <div className="col d-flex">
              <label htmlFor="fecha_ent" className="form-label">
                Fecha de entrada
              </label>
              <input
                type="date"
                name="fecha_entrada"
                value={formData.fecha_entrada}
                onChange={handleChange}
              />
            </div>
            <div className="col d-flex">
              <label htmlFor="fecha_comp" className="form-label">
                Fecha de Comprobante
              </label>
              <input
                type="date"
                name="fecha_comprobante"
                value={formData.fecha_comprobante}
                onChange={handleChange}
              />
            </div>
            <div className="col d-flex">
              <label htmlFor="nro_compro" className="form-label ">
                Nro de Comprobante
              </label>
              <input
                type="text"
                name="nro_comprobante"
                value={formData.nro_comprobante}
                onChange={handleChange}
              />
            </div>
          </div>
          <span className="titulo-span">Difunto</span>
          <div className="row g-1 cont">
            <div className="col-md-6 d-flex">
              <label htmlFor="persona.CI" className="form-label">
                CI
              </label>
              <input
                type="text"
                name="persona.CI"
                value={formData.persona.CI}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 d-flex">
              <label htmlFor="persona.nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                name="persona.nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 d-flex">
              <label htmlFor="persona.apellido_paterno" className="form-label ">
                Apellido Paterno
              </label>
              <input
                type="text"
                name="persona.apellido_paterno"
                value={formData.persona.apellido_paterno}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 d-flex">
              <label htmlFor="persona.apellido_materno" className="form-label">
                Apellido Materno
              </label>
              <input
                name="persona.apellido_materno"
                value={formData.ap_materno}
                onChange={handleChange}
              />
            </div>
            <div className="col d-flex">
              <label htmlFor="persona.fecha_nacimiento" className="form-label">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="persona.fecha_nacimiento"
                value={formData.persona.fecha_nacimiento}
                onChange={handleChange}
                placeholder="Fecha de Nacimiento"
                required
              />
            </div>
            <div className="col d-flex">
              <label
                htmlFor="persona.fecha_fallecimiento"
                className="form-label"
              >
                Fecha de Fallecimiento
              </label>
              <input
                type="date"
                name="persona.fecha_fallecimiento"
                value={formData.persona.fecha_fallecimiento}
                onChange={handleChange}
                placeholder="Fecha de Fallecimiento"
                required
              />
            </div>
            <div className="col d-flex">
              <input
                type="radio"
                class="form-check-input border border-primary"
                name="es_adulto"
                value="true" // Este valor es un string, será convertido a booleano en el onChange
                checked={formData.persona.es_adulto === true} // Verifica si el valor es true
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    persona: {
                      ...prev.persona,
                      es_adulto: true, // Asigna true directamente
                    },
                  }))
                }
              />
              {"  "}
              Adulto
              <input
                type="radio"
                class="form-check-input border border-primary"
                name="es_adulto"
                value="false"
                checked={formData.persona.es_adulto === false} // Verifica si el valor es false
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    persona: {
                      ...prev.persona,
                      es_adulto: false, // Asigna false directamente
                    },
                  }))
                }
              />
              {"  "}
              Párbulo
            </div>
          </div>

          <span className="titulo-span ">Familiar</span>
          <div className="row g-1 cont">
            <div className="col-md-6 d-flex">
              <label htmlFor="ci_familiar" className="form-label">
                CI
              </label>
              <input
                type="text"
                name="CI"
                value={formData.familiares[0].CI}
                onChange={handleFamiliarChange}
                required
              />
            </div>
            <div className="col-md-6 d-flex">
              <label htmlFor="nombre_fam" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.familiares[0].nombre}
                onChange={handleFamiliarChange}
                required
              />
            </div>
            <div className="col-md-6 d-flex">
              <label htmlFor="ap_materno_fam" className="form-label">
                Apellido Paterno
              </label>
              <input
                type="text"
                name="apellido_paterno"
                value={formData.familiares[0].apellido_paterno}
                onChange={handleFamiliarChange}
                required
              />
            </div>
            <div className="col-md-6 d-flex">
              <label htmlFor="ap_materno_fam" className="form-label">
                Apellido Materno
              </label>
              <input
                type="text"
                name="apellido_materno"
                value={formData.familiares[0].apellido_materno}
                onChange={handleFamiliarChange}
                required
              />
            </div>
            <div className="col-md-6 d-flex">
              <label htmlFor="parentesco" className="form-label">
                Parentesco
              </label>
              <input
                type="text"
                name="parentesco"
                value={formData.familiares[0].parentesco}
                onChange={handleFamiliarChange}
                required
              />
            </div>
            <div className="col-md-6 d-flex">
              <label htmlFor="celular" className="form-label">
                telefono/celular
              </label>
              <input
                type="text"
                name="celular"
                value={formData.familiares[0].celular}
                onChange={handleFamiliarChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary boton-form">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inhumacion;
