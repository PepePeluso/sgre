import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const RegistroRiesgo = () => {

    const [TipoRiesgo, setTipoRiesgo] = useState([])
    const [FechaIngreso, setFechaIngreso] = useState([])

    useEffect(() => {
        setTipoRiesgo(["inundaciones", "deslizamientos", "incendios forestales"])
    }, [])

    const render = () => {
        return <h1>{Status}</h1>;
    };

    return (
        <div className="container-fluid">
            <h2>Registrar nuevo riesgo</h2>
            <div className="card mt-3">
                <div className="card-header">
                    <h5>Riesgo</h5>
                </div>
                <div className="card-body">
                    <div className="input-group mb-2">
                        <label className="col-1 m-2">Tipo:</label>
                        <div className="col">
                            <select className="col form-select">
                                {TipoRiesgo.map((tipo, index) => {
                                    return (
                                        <option key={index}>{tipo}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="mb-2">
                        <label className="align-self-center text-center m-2">Descripción:</label>
                        <textarea className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label className="align-self-center text-center m-2">Subir Evidencias:</label>
                        <textarea className="form-control" />
                    </div>
                </div>
            </div>
            <div className="card mt-3">
                <div className="card-header">
                    <h5>Localización del riesgo</h5>
                </div>
                <div className="card-body">
                    <div className="input-group mb-2">
                        <label className="col-1 m-2">Pais:</label>
                        <input type="text" className="form-control" value={"Ecuador"} readOnly />
                    </div>
                    <div className="input-group mb-2">
                        <label className="col-1 m-2">Ciudad:</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="input-group mb-2">
                        <label className="col-1 m-2">Provincia:</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="input-group mb-2">
                        <label className="col-1 m-2">Cantón:</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="input-group mb-2">
                        <label className="col-1 m-2">Zona:</label>
                        <input type="text" className="form-control" value={"Zona 1"} readOnly />
                    </div>
                    <div className="input-group mb-2">
                        <label className="col-1 m-2">Localidad:</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label className="m-2">Georreferencia:</label>
                        <input type="text" className="form-control" />
                    </div>
                </div>
            </div>
            <div className="card mt-3">
                <div className="card-header">
                    <h5>Datos para contacto</h5>
                </div>
                <div className="card-body">
                    <div className="input-group mb-2">
                        <label className="col-1 m-2">Nombre:</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="input-group mb-2">
                        <label className="col-1 m-2">Correo:</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="input-group mb-2">
                        <label className="col-1 m-2">Teléfono:</label>
                        <input type="text" className="form-control" />
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <button
                    className="btn btn-primary" >Registrar</button>
            </div>
        </div>
    );
}

export default RegistroRiesgo