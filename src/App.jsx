import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Inicio from "./pages/Inicio";
import Inhumacion from "./pages/Inhumacion/Inhumacion_Form";
import NotFoundPage from "./pages/NotFoundPage";
import InhumacionesTable from "./pages/Inhumacion/Inhumacion_tabla";
import ExtenderInhumacion from "./pages/Inhumacion/Extender_Form";
import ExhumarForm from "./pages/Exhumacion/Exhumar_Form";
import PerpetuidadForm from "./pages/Perpetuidad/PerpetuidadForm";
import ExhumacionesTable from "./pages/Exhumacion/Exhumar_tabla";
import BloquesList from "./pages/CementerioMap/Mostrar_espacios";
import HistorialInhumaciones from "./pages/CementerioMap/Historial_Espacios";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content-wrapper">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/inhumacion" element={<Inhumacion />} />
              <Route path="/inhumacion/:bloque/:fila/:columna/:espacioId" element={<Inhumacion />} />
              <Route path="/espacio/:bloque/:fila/:columna/:espacioId/:historial" element={<HistorialInhumaciones />} />
              <Route path="/tablaInhumacion" element={<InhumacionesTable />} />
              <Route path="/extender/:id" element={<ExtenderInhumacion />} />
              <Route path="/exhumar/:id" element={<ExhumarForm />} />
              <Route path="/perpetuidad/:id" element={<PerpetuidadForm />} />
              <Route path="/tablaExhumacion" element={<ExhumacionesTable />} />
              <Route path="/bloques" element={<BloquesList/>}/>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
