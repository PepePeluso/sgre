import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistroRiesgo from "../views/Registro de riesgos/RegistroRiesgo";
import Login from "../views/Login/Login";
import RiesgosNoAsignados from "../views/Tecnico/RiesgosNoAsignados";
import AsignarRiesgo from "../views/Tecnico/AsignarRiesgo";
import TableRiesgos from "../views/Unidad Responsable/TableRiesgos";
import Principal from "../views/Administrador/Principal";

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/administrador" element={<Principal />} />
                    <Route exact path="/unidadresponsable" element={<TableRiesgos />} />
                    <Route exact path="/asignarriesgo" element={<AsignarRiesgo />} />
                    <Route exact path="/riesgosnoasignados" element={<RiesgosNoAsignados/>} />
                    <Route exact path="/login" element={<Login/>} />
                    <Route exact path="/" element={<RegistroRiesgo/>} />
                </Routes>
            </div>
        </Router>
    );
}