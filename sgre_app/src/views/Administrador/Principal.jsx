import React from "react"
import { Link } from "react-router-dom"
import Navbar from "./navbar"

const Principal = () => {

    return (
        <div>
            <Navbar />
            <div className="row m-3">
                <div className="container-fluid">
                    <h2 className="text-center">Bienvenido Admin</h2>
                    <h6 className="text-center">¿Qué desea hacer?</h6>
                    <div className="row m-3">
                        <div className="col">
                            <Link to="/administrador/origen" className="card nLD" style={{"height": "100%"}}>
                                <div className="card-body text-center">
                                    <h6>Parametrizar los orígenes de riesgo</h6>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="/administrador/tipo" className="card nLD" style={{"height": "100%"}}>
                                <div className="card-body text-center">
                                    <h6>Parametrizar los tipos de riesgo</h6>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="/administrador/nivel" className="card nLD" style={{"height": "100%"}}>
                                <div className="card-body text-center">
                                    <h6>Parametrizar los niveles de riesgo</h6>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="row m-3">
                        <div className="col">
                            <Link to="/administrador/usuarios" className="card nLD" style={{"height": "100%"}}>
                                <div className="card-body text-center">
                                    <h6>Crear usuarios</h6>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="/administrador/riesgos" className="card nLD" style={{"height": "100%"}}>
                                <div className="card-body text-center">
                                    <h6>Ver riesgos</h6>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Principal
