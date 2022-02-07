import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistroRiesgo from "../views/Registro de riesgos/RegistroRiesgo";
import Login from "../views/Login/Login";
import RiesgosNoAsignados from "../views/Tecnico/RiesgosNoAsignados";
import AsignarRiesgo from "../views/Tecnico/AsignarRiesgo";

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/asignarriesgo" element={<AsignarRiesgo />} />
                    <Route exact path="/riesgosnoasignados" element={<RiesgosNoAsignados/>} />
                    <Route exact path="/login" element={<Login/>} />
                    <Route exact path="/" element={<RegistroRiesgo/>} />
                </Routes>
            </div>
        </Router>
    );
}