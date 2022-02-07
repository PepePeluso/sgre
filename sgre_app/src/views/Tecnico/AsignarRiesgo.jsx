import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from "react-router-dom"
import axios from "axios"
import Navbar from "./navbar"

const AsignarRiesgo = () => {
    const { numriesgo } = useLocation().state
    const riesgo = useSelector(state => state.RiesgoNoAsignado.riesgosNoAsignados[numriesgo])
    const urlMaps = "https://www.google.com/maps/place/" + riesgo.ubicacion[0].ubi_ubicacion
    const urlOrigen = "https://backend-sgre.herokuapp.com/origen"
    const urlNivel = "https://backend-sgre.herokuapp.com/nivel"
    const urlUnidad = "https://backend-sgre.herokuapp.com/unidad"
    const urlAntSeq = "https://backend-sgre.herokuapp.com/riesgoAntSeq"
    const urlNatSeq = "https://backend-sgre.herokuapp.com/riesgoNatSeq"


    const [origenRiesgo, setOrigenRiesgo] = useState([])
    const [nivelRiesgo, setNivelRiesgo] = useState([])
    const [unidadRespon, setUnidadRespon] = useState([])
    const [lastValueNat, setLasValueNat] = useState(0)
    const [lastValueAnt, setLasValueAnt] = useState(0)
    const [lastValueOth, setLasValueOth] = useState(0)

    const origenes = async () => {
        const resp = await axios.get(urlOrigen)
        if (resp.data.code) {
            console.error(resp.data)
        } else {
            setOrigenRiesgo(resp.data || [{}])
        }
    }
    const niveles = async () => {
        const resp = await axios.get(urlNivel)
        if (resp.data.code) {
            console.error(resp.data)
        } else {
            setNivelRiesgo(resp.data || [{}])
        }
    }
    const unidades = async () => {
        const resp = await axios.get(urlUnidad)
        if (resp.data.code) {
            console.error(resp.data)
        } else {
            setUnidadRespon(resp.data || [{}])
        }
    }
    const antropicoSeq = async () => {
        const resp = await axios.get(urlAntSeq)
        if (resp.data.code) {
            console.error(resp.data)
        } else {
            setLasValueAnt(resp.data[0].last_value || 0)
        }
    }
    const naturalSeq = async () => {
        const resp = await axios.get(urlNatSeq)
        if (resp.data.code) {
            console.error(resp.data)
        } else {
            setLasValueNat(resp.data[0].last_value || 0)
        }
    }

    useEffect(() => {
        const inicial = async () =>{
            await origenes()
            await niveles()
            await unidades()
            await antropicoSeq()
            await naturalSeq()
        }
        inicial()
    }, [])

    const cambiarformatoFecha = (date) => {
        var fecha = String(date)
        return fecha.replace("T00:00:00.000Z", "")
    }

    const rieCodigo = (origen) => {
        if (origen === 1) {
            return "SGRE-N-" + lastValueNat.toString().padStart(3, 0) + "-secuencial"
        } else if (origen === 2) {
            return "SGRE-A-" + lastValueAnt.toString().padStart(3, 0) + "-secuencial"
        } else {
            return "SGRE-O-" + lastValueOth.toString().padStart(3, 0) + "-secuencial"
        }
    }

    const [riesgoForm, setRiesgoForm] = useState({
        origen: 0,
        nivel: 0,
        estado: 3,
        unidad: 0,
        rie_codigo: ""
    })

    const { origen, nivel, unidad} = riesgoForm

    const asignarRiesgo = async () =>{
        console.log(riesgoForm)
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
                            <h5>Asignar</h5>
                        </div>
                        <div className="card-body">
                            <div className="input-group">
                                <label className="col-3 m-2">Origen:</label>
                                <div className="col">
                                    <select className="col form-select" value={origen}
                                        onChange={(e) => {
                                            setRiesgoForm({ ...riesgoForm, origen: parseInt(e.target.value),
                                                rie_codigo: rieCodigo(parseInt(e.target.value)) });
                                        }}>
                                        <option key={0} value={0}>Elija un origen</option>
                                        {origenRiesgo.map((origen, index) => {
                                            return (
                                                <option key={index} value={origen.ori_id}>{origen.ori_descripcion}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="input-group my-3">
                                <label className="col-3 m-2">Nivel:</label>
                                <div className="col">
                                    <select className="col form-select" value={nivel}
                                        onChange={(e) => {
                                            setRiesgoForm({ ...riesgoForm, nivel: parseInt(e.target.value) });
                                        }}>
                                        <option key={0} value={0}>Elija un nivel</option>
                                        {nivelRiesgo.map((nivel, index) => {
                                            return (
                                                <option key={index} value={nivel.niv_id}>{nivel.niv_descripcion}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="input-group">
                                <label className="col-3 m-2">Unidad Responsable:</label>
                                <div className="col">
                                    <select className="col form-select" value={unidad}
                                        onChange={(e) => {
                                            setRiesgoForm({ ...riesgoForm, unidad: parseInt(e.target.value) });
                                        }}>
                                        <option key={0} value={0}>Elija una Unidad Responsable</option>
                                        {unidadRespon.map((unidad, index) => {
                                            return (
                                                <option key={index} value={unidad.unidad_id}>{unidad.unidad_descripcion}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-3">
                                <button onClick={asignarRiesgo}
                                    className="btn btn-primary">Asignar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AsignarRiesgo