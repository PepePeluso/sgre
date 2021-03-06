import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import axios from "axios"
import Swal from "sweetalert2"
import { stringify } from "query-string"
import Navbar from "./navbar"
import Maps from "./Maps"

const RegistroRiesgo = () => {

    const [TipoRiesgo, setTipoRiesgo] = useState([])
    const { position } = useSelector(state => state.position)
    const urlTipo = "https://backend-sgre.herokuapp.com/tipo"
    const urlPostUbi = "https://backend-sgre.herokuapp.com/creaubicacion"
    const urlPostRegistro = "https://backend-sgre.herokuapp.com/creariesgo"
    const urlPostFechaEstado = "https://backend-sgre.herokuapp.com/creafechaest"

    const [loadTipo, setLoadTipo] = useState(true)

    const hoy = new Date()

    useEffect(() => {
        const tipos = async () => {
            const resp = await axios.get(urlTipo)
            if (resp.data.code) {
                console.error(resp.data)
            } else {
                setTipoRiesgo(resp.data || [{}])
            }
        }
        tipos()
    }, [])

    useEffect(() => {
        setLocalizaci√≥nForm({ ...LocalizacionForm, ubi_ubicacion: position.lat + "," + position.lng })
    }, [position])

    const [RiesgoForm, setRiesgoForm] = useState({
        tipo_id: 0,
        rie_descripcion: "",
        rie_fechaIngreso: hoy.getFullYear() + "-" + (hoy.getMonth() + 1).toString().padStart(2, 0)
            + "-" + hoy.getDate().toString().padStart(2, 0),
        est_id: 1,
        ubi_id: 0
    })

    const { tipo_id, rie_descripcion } = RiesgoForm

    const [LocalizacionForm, setLocalizaci√≥nForm] = useState({
        ubi_pais: "Ecuador",
        ubi_provincia: "",
        ubi_canton: "",
        ubi_ciudad: "",
        ubi_zona: "Zona 1",
        ubi_localidad: "",
        ubi_ubicacion: ""
    })

    const { ubi_canton, ubi_pais, ubi_provincia, ubi_ciudad, ubi_zona, ubi_localidad, ubi_ubicacion } = LocalizacionForm

    const [UsuarioForm, setUsuarioForm] = useState({
        rie_nombre: "",
        rie_correo: "",
        rie_telefono: ""
    })

    const { rie_nombre, rie_correo, rie_telefono } = UsuarioForm

    const [fechaEstado, setFechaEstado] = useState({
        rie_idriesgo: 0,
        est_id: 1,
        fec_fecha: hoy.getFullYear() + "-" + (hoy.getMonth() + 1).toString().padStart(2, 0)
            + "-" + hoy.getDate().toString().padStart(2, 0)
    })

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const RegistrarRiesgo = async () => {
        if (tipo_id === 0) {
            Swal.fire("Error", "Seleccione el tipo de riesgo", "error")
        } else if (rie_descripcion === "") {
            Swal.fire("Error", "Describa el riesgo", "error")
        } else if ((ubi_provincia === "") || (ubi_canton === "") || (ubi_ciudad === "")
            || (ubi_localidad === "")) {
            Swal.fire("Error", "La localizaci√≥n del riesgo esta incompleta", "error")
        } else if ((rie_nombre === "") || (rie_correo === "") || (rie_telefono === "")) {
            Swal.fire("Error", "Los datos de contacto est√°n incompletos", "error")
        } else if (validateEmail(rie_correo) === null) {
            Swal.fire("Error", "Ingrese un correo valido", "error")
        } else {
            const { value: confirm } = await Swal.fire({ title: "Atenci√≥n", text: "¬ŅEst√° seguro de registrar este riesgo?", icon: "info", showCancelButton: true })
            if (confirm) {
                const ubicacionString = "?" + stringify(LocalizacionForm,{encode:false})
                var riesgoString = "?" + stringify(RiesgoForm,{encode:false}) + "&" + stringify(UsuarioForm,{encode:false})
                var fechaEstadoString = "?" + stringify(fechaEstado,{encode:false})
                console.log(ubicacionString)
                console.log(riesgoString)
                console.log(fechaEstadoString)
                try {
                    const postUbi = await axios.post(urlPostUbi + ubicacionString)
                    if (postUbi.data.code) {
                        console.log("primer error")
                        console.log(postUbi.data.message)
                        Swal.fire("Error", postUbi.data.message, "error")
                    } else {
                        riesgoString = riesgoString.replace("ubi_id=0","ubi_id="+postUbi.data.body.ubi_id)
                        const postRiesgo = await axios.post(urlPostRegistro + riesgoString)
                        if (postRiesgo.data.code) {
                            console.log("segundo error")
                            console.log(postRiesgo.data.message)
                            Swal.fire("Error", postRiesgo.data.message, "error")
                        } else {
                            fechaEstadoString = fechaEstadoString.replace("rie_idriesgo=0","rie_idriesgo="+postRiesgo.data.body.rie_idriesgo)
                            const postFechaEstado = await axios.post(urlPostFechaEstado + fechaEstadoString)
                            if (postFechaEstado.data.code) {
                                console.log("tercer error")
                                console.log(postFechaEstado.data.message)
                                Swal.fire("Error", postFechaEstado.data.message, "error")
                            } else {
                                Swal.fire("Perfecto", "Riesgo registrado con √©xito", "success")
                            }
                        }
                    }
                } catch (err) {
                    console.error(err)
                    Swal.fire("Error", "Error de la app", "error")
                }
            }
        }
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
                                    <select className="col form-select" value={tipo_id}
                                        onChange={(e) => {
                                            setRiesgoForm({ ...RiesgoForm, tipo_id: e.target.value });
                                        }}>
                                        <option value={0}>Elija un tipo</option>
                                        {TipoRiesgo.map((tipo, index) => {
                                            return (
                                                <option key={index} value={tipo.tipo_id}>{tipo.tipo_descripcion}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-2">
                                <label className="align-self-center text-center m-2">Descripci√≥n:</label>
                                <textarea className="form-control" value={rie_descripcion}
                                    onChange={(e) => {
                                        setRiesgoForm({ ...RiesgoForm, rie_descripcion: e.target.value });
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
                            <h5>Localizaci√≥n del riesgo</h5>
                        </div>
                        <div className="card-body">
                            <div className="input-group mb-2">
                                <label className="col-1 m-2">Pais:</label>
                                <input type="text" className="form-control" value={ubi_pais} readOnly />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-1 m-2">Provincia:</label>
                                <input type="text" className="form-control" value={ubi_provincia}
                                    onChange={(e) => {
                                        setLocalizaci√≥nForm({ ...LocalizacionForm, ubi_provincia: e.target.value })
                                    }} />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-1 m-2">Cant√≥n:</label>
                                <input type="text" className="form-control" value={ubi_canton}
                                    onChange={(e) => {
                                        setLocalizaci√≥nForm({ ...LocalizacionForm, ubi_canton: e.target.value })
                                    }} />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-1 m-2">Ciudad:</label>
                                <input type="text" className="form-control" value={ubi_ciudad}
                                    onChange={(e) => {
                                        setLocalizaci√≥nForm({ ...LocalizacionForm, ubi_ciudad: e.target.value })
                                    }} />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-1 m-2">Zona:</label>
                                <input type="text" className="form-control" value={ubi_zona} readOnly />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-1 m-2">Localidad:</label>
                                <input type="text" className="form-control" value={ubi_localidad}
                                    onChange={(e) => {
                                        setLocalizaci√≥nForm({ ...LocalizacionForm, ubi_localidad: e.target.value })
                                    }} />
                            </div>
                            <div className="mb-2">
                                <div className="input-group mb-2">
                                    <label className="m-2">Georreferencia:</label>
                                    <input type="text" className="form-control" value={ubi_ubicacion} readOnly />
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
                                <input type="text" className="form-control" value={rie_nombre}
                                    onChange={(e) => {
                                        setUsuarioForm({ ...UsuarioForm, rie_nombre: e.target.value })
                                    }} />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-1 m-2" id="emailInput">Correo:</label>
                                <input type="email" className="form-control" value={rie_correo}
                                    onChange={(e) => {
                                        setUsuarioForm({ ...UsuarioForm, rie_correo: e.target.value })
                                    }} />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-1 m-2">Tel√©fono:</label>
                                <input type="text" className="form-control" value={rie_telefono}
                                    onChange={(e) => {
                                        setUsuarioForm({ ...UsuarioForm, rie_telefono: e.target.value })
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