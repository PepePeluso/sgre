import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import Navbar from "./navbar"
import Maps from "./Maps"

const RegistroRiesgo = () => {

    const [TipoRiesgo, setTipoRiesgo] = useState([])
    const { position } = useSelector(state => state.position)

    const hoy = new Date()

    useEffect(() => {
        setTipoRiesgo(["inundaciones", "deslizamientos", "incendios forestales"])
    }, [])

    useEffect(() => {
        setLocalizaciónForm({ ...LocalizacionForm, georreferencia: position.lat + "," + position.lng })
    }, [position])

    const [RiesgoForm, setRiesgoForm] = useState({
        tipo: "inundaciones",
        descripcion: "",
        fechaIngreso: hoy.getFullYear() + "-" + (hoy.getMonth() + 1).toString().padStart(2, 0)
            + "-" + hoy.getDate().toString().padStart(2, 0)
    })

    const { tipo, descripcion } = RiesgoForm

    const [LocalizacionForm, setLocalizaciónForm] = useState({
        pais: "Ecuador",
        provincia: "",
        canton: "",
        ciudad: "",
        zona: "Zona 1",
        localidad: "",
        georreferencia: ""
    })

    const { canton, pais, provincia, ciudad, zona, localidad, georreferencia } = LocalizacionForm

    const [UsuarioForm, setUsuarioForm] = useState({
        nombre: "",
        correo: "",
        telefono: ""
    })

    const { nombre, correo, telefono } = UsuarioForm

    const RegistrarRiesgo = () => {
        setRiesgoForm({
            ...RiesgoForm, fechaIngreso: hoy.getFullYear() + "-"
                + (hoy.getMonth() + 1).toString().padStart(2, 0)
                + "-" + hoy.getDate().toString().padStart(2, 0)
        })
        console.log(LocalizacionForm)
        console.log(UsuarioForm)
        console.log(RiesgoForm)
    }

    return (
        <div>
            <Navbar />
            <div className="row m-3">
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
                                    <select className="col form-select" value={tipo}
                                        onChange={(e) => {
                                            setRiesgoForm({ ...RiesgoForm, tipo: e.target.value });
                                        }}>
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
                                <textarea className="form-control" value={descripcion}
                                    onChange={(e) => {
                                        setRiesgoForm({ ...RiesgoForm, descripcion: e.target.value });
                                    }} />
                            </div>
                            <div className="mb-2">
                                <label className="align-self-center text-center m-2">Subir Evidencias:</label>
                                <input type="file" accept="image/jpeg" className="form-control" readOnly />
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
                                <input type="text" className="form-control" value={pais} readOnly />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-1 m-2">Provincia:</label>
                                <input type="text" className="form-control" value={provincia}
                                    onChange={(e) => {
                                        setLocalizaciónForm({ ...LocalizacionForm, provincia: e.target.value })
                                    }} />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-1 m-2">Cantón:</label>
                                <input type="text" className="form-control" value={canton}
                                    onChange={(e) => {
                                        setLocalizaciónForm({ ...LocalizacionForm, canton: e.target.value })
                                    }} />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-1 m-2">Ciudad:</label>
                                <input type="text" className="form-control" value={ciudad}
                                    onChange={(e) => {
                                        setLocalizaciónForm({ ...LocalizacionForm, ciudad: e.target.value })
                                    }} />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-1 m-2">Zona:</label>
                                <input type="text" className="form-control" value={zona} readOnly />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-1 m-2">Localidad:</label>
                                <input type="text" className="form-control" value={localidad}
                                    onChange={(e) => {
                                        setLocalizaciónForm({ ...LocalizacionForm, localidad: e.target.value })
                                    }} />
                            </div>
                            <div className="mb-2">
                                <div className="input-group mb-2">
                                    <label className="m-2">Georreferencia:</label>
                                    <input type="text" className="form-control" value={georreferencia} readOnly />
                                </div>
                                <div>
                                    <Maps />
                                </div>
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
                                <input type="text" className="form-control" value={nombre}
                                    onChange={(e) => {
                                        setUsuarioForm({ ...UsuarioForm, nombre: e.target.value })
                                    }} />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-1 m-2">Correo:</label>
                                <input type="text" className="form-control" value={correo}
                                    onChange={(e) => {
                                        setUsuarioForm({ ...UsuarioForm, correo: e.target.value })
                                    }} />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-1 m-2">Teléfono:</label>
                                <input type="text" className="form-control" value={telefono}
                                    onChange={(e) => {
                                        setUsuarioForm({ ...UsuarioForm, telefono: e.target.value })
                                    }} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <button onClick={RegistrarRiesgo}
                            className="btn btn-primary" >Registrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistroRiesgo