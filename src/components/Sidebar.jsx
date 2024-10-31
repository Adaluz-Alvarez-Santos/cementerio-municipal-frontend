import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar d-flex d-none d-md-block ">
      <nav>
        <ul>
          <li>
            <i className="bi bi-house-door-fill"></i>
            <Link className="fs-6" to="/">
              Home
            </Link>
          </li>
          <li>
            <i className="bi bi-tree-fill"></i>
            <Link className="fs-6" to="bloques">
              Gestion de Bloques y Registro
            </Link>
          </li>
          {/*<li>
            <i class="bi bi-tree-fill"></i>
            <Link className="fs-6" to="tablaInhumacion">
              Tabla de Inhumacion
            </Link>
          </li>

          <li>
            <i className="bi bi-tree-fill"></i>
            <Link className="fs-6" to="tablaExhumacion">
              Tabla de Exhumacion
            </Link>
          </li>*/}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
