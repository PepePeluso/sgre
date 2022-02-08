import React, {Fragment} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Decode from "jwt-decode"
import { useSelector, useDispatch } from 'react-redux'
import RegistroRiesgo from "../views/Registro de riesgos/RegistroRiesgo";
import Login from "../views/Login/Login";
import RiesgosNoAsignados from "../views/Tecnico/RiesgosNoAsignados";
import AsignarRiesgo from "../views/Tecnico/AsignarRiesgo";
import TableRiesgos from "../views/Unidad Responsable/TableRiesgos";
import Principal from "../views/Administrador/Principal";
import { setUnidadID } from "../Store/slices/RiesgoUnidad";
import VisualizarRiesgo from "../views/Unidad Responsable/VisualizarRiesgo";
import CrearUsuarios from "../views/Administrador/CrearUsuarios";

export const AppRouter = () => {

    const dispatch = useDispatch()
    const token = useSelector(state => state.Token.token)
    let decodeToken = []

    const usuarioToken = () => {
        if (token === "")
        return(0)
        else{
            decodeToken = Decode(token)
            return (decodeToken.jsonDatos.rol_id)
        }
    }

    const rutaTecnico = () => {
        var userToken = usuarioToken()
        if (userToken === 2){
            return (
                <Fragment>
                    <Route exact path="/asignarriesgo" element={<AsignarRiesgo />} />
                    <Route exact path="/riesgosnoasignados" element={<RiesgosNoAsignados/>} />
                    <Route exact path="/" element={<Navigate to="/riesgosnoasignados"/>} />
                </Fragment>
            )
        } else {
            return(
                <Fragment>
                    <Route exact path="/asignarriesgo" element={<Navigate to="/"/>} />
                    <Route exact path="/riesgosnoasignados" element={<Navigate to="/"/>} />
                </Fragment>
            )
        }
    }

    const rutaUsuario = () => {
        var userToken = usuarioToken()
        if (userToken === 0){
            return (
                <Fragment>
                    <Route exact path="/login" element={<Login/>} />
                    <Route exact path="/" element={<RegistroRiesgo/>} />
                </Fragment>
            )
        } else {
            return(
                <Fragment>
                    <Route exact path="/login" element={<Navigate to="/"/>} />
                </Fragment>
            )
        }
    }

    const rutaUnidad = () => {
        var userToken = usuarioToken()
        if (userToken === 3){
            dispatch(setUnidadID(decodeToken.jsonDatos.unidad_id))
            return (
                <Fragment>
                    <Route exact path="/unidadresponsable" element={<TableRiesgos />} />
                    <Route exact path="/visualizarriesgo" element={<VisualizarRiesgo />} />
                    <Route exact path="/" element={<Navigate to="/unidadresponsable"/>} />
                </Fragment>
            )
        } else {
            return(
                <Fragment>
                    <Route exact path="/unidadresponsable" element={<Navigate to="/"/>} />
                    <Route exact path="/visualizarriesgo" element={<Navigate to="/" />} />
                </Fragment>
            )
        }
    }

    const rutaAdminstrador = () => {
        var userToken = usuarioToken()
        if (userToken === 1){
            return (
                <Fragment>
                    <Route exact path="/administrador/usuarios" element={<CrearUsuarios />} />
                    <Route exact path="/administrador" element={<Principal />} />
                    <Route exact path="/" element={<Navigate to="/administrador"/>} />
                </Fragment>
            )
        } else {
            return(
                <Fragment>
                    <Route exact path="/administrador/usuarios" element={<Navigate to="/"/>} />
                    <Route exact path="/administrador" element={<Navigate to="/"/>} />
                </Fragment>
            )
        }
    }

    return (
        <Router>
            <div>
                <Routes>
                    {rutaAdminstrador()}
                    {rutaUnidad()}
                    {rutaTecnico()}
                    {rutaUsuario()}
                </Routes>
            </div>
        </Router>
    );
}