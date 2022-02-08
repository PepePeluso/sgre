import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useLocation } from "react-router-dom"
import Swal from "sweetalert2"
import { stringify } from "query-string"
import axios from "axios"
import Navbar from "./navbar"

const VisualizarRiesgo = () => {
    const { numriesgo } = useLocation().state
    const riesgo = useSelector(state => state.RiesgoUnidad.riesgosUnidad[numriesgo])

    const urlMaps = "https://www.google.com/maps/place/" + riesgo.ubicacion[0].ubi_ubicacion
    const urlPostFechaEstado = "https://backend-sgre.herokuapp.com/creafechaest"
    const urlFecha = "https://backend-sgre.herokuapp.com/updatefecha"

    const hoy = new Date()

    const [fechaEstado, setFechaEstado] = useState({
        rie_idriesgo: riesgo.rie_idriesgo,
        est_id: 4,
        fec_fecha: hoy.getFullYear() + "-" + (hoy.getMonth() + 1).toString().padStart(2, 0)
            + "-" + hoy.getDate().toString().padStart(2, 0)
    })

    const actualizarEstado = async () => {
        if (riesgo.est_id === 3) {
            let fecEstString = "?" + stringify(fechaEstado)
            try {
                await axios.put(urlFecha + "?rie_idriesgo=" + riesgo.rie_idriesgo + "&est_id=4")
                let resp = await axios.post(urlPostFechaEstado + fecEstString)
                console.log(resp)
            } catch (err) {
                console.error(err)
            }
        }
    }

    useEffect(() => {
        actualizarEstado()
    }, [])

    const cambiarformatoFecha = (date) => {
        var fecha = String(date)
        return fecha.replace("T00:00:00.000Z", "")
    }

    return (
        <div>
            <Navbar />
            <div className="row m-3">
                <div className="container-fluid">
                    <h2>Riesgos no asignados</h2>
                    <div className="card my-3">
                        <div className="card-header">
                            <h5>Riesgo</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col col-2">
                                    <div className="input-group">
                                        <label className="m-2">ID:</label>
                                        <input type="text" className="form-control" value={riesgo.rie_idriesgo} readOnly />
                                    </div>
                                </div>
                                <div className="col col-4">
                                    <div className="input-group">
                                        <label className="m-2">Tipo:</label>
                                        <input type="text" className="form-control" value={riesgo.tipo[0].tipo_descripcion} readOnly />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="input-group">
                                        <label className="m-2">Fecha Ingreso:</label>
                                        <input type="text" className="form-control" value={cambiarformatoFecha(riesgo.rie_fechaingreso)} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <div className="input-group">
                                        <label className="m-2">Origen:</label>
                                        <input type="text" className="form-control" value={riesgo.origen[0].ori_descripcion} readOnly />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="input-group">
                                        <label className="m-2">Nivel:</label>
                                        <input type="text" className="form-control" value={riesgo.nivel[0].niv_descripcion} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="m-2">Descripción:</label>
                                    <textarea className="form-control" value={riesgo.rie_descripcion} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="card-header">
                            <h6>Ubicación</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <div className="input-group">
                                        <label className="m-2">Pais:</label>
                                        <input type="text" className="form-control" value={riesgo.ubicacion[0].ubi_pais} readOnly />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="input-group">
                                        <label className="m-2">Zona:</label>
                                        <input type="text" className="form-control" value={riesgo.ubicacion[0].ubi_zona} readOnly />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="input-group">
                                        <label className="m-2">Provincia:</label>
                                        <input type="text" className="form-control" value={riesgo.ubicacion[0].ubi_provincia} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col">
                                    <div className="input-group">
                                        <label className="m-2">Cantón:</label>
                                        <input type="text" className="form-control" value={riesgo.ubicacion[0].ubi_canton} readOnly />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="input-group">
                                        <label className="m-2">Ciudad:</label>
                                        <input type="text" className="form-control" value={riesgo.ubicacion[0].ubi_ciudad} readOnly />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="input-group">
                                        <label className="m-2">Localidad:</label>
                                        <input type="text" className="form-control" value={riesgo.ubicacion[0].ubi_localidad} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-8">
                                    <div className="input-group">
                                        <label className="m-2">Georreferencia:</label>
                                        <input type="text" className="form-control" value={riesgo.ubicacion[0].ubi_ubicacion} readOnly />
                                    </div>
                                </div>
                                <div className="col">
                                    <a className="btn btn-info w-100" href={urlMaps} target="_blank">Ver en Google Maps</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h5>Contacto</h5>
                        </div>
                        <div className="card-body">
                            <div className="input-group">
                                <label className="m-2">Nombre:</label>
                                <input type="text" className="form-control" value={riesgo.rie_nombre} readOnly />
                            </div>
                            <div className="input-group my-3">
                                <label className="m-2">Correo:</label>
                                <input type="text" className="form-control" value={riesgo.rie_correo} readOnly />
                            </div>
                            <div className="input-group">
                                <label className="m-2">Teléfono:</label>
                                <input type="text" className="form-control" value={riesgo.rie_telefono} readOnly />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default VisualizarRiesgo