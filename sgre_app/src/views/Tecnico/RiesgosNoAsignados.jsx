import React, { useState, useEffect } from "react"
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import Navbar from "./navbar"
import { setRiesgosNoAsignados } from "../../Store/slices/RiesgoNoAsignado"
import { Link } from "react-router-dom"

const RiesgosNoAsignados = () => {
    const dispatch = useDispatch()

    const url = "https://backend-sgre.herokuapp.com/riesgoT"
    const titulos = ["id", "Tipo", "Ciudad", "Descripción", "Fecha Ingreso", "Estado", "Asignar"]

    const data = useSelector(state => state.RiesgoNoAsignado.riesgosNoAsignados)
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        setCargando(true)
        dispatch(setRiesgosNoAsignados([]))
        const getRiesgosT = async () =>{
            const consulta = await axios.get(url)
            if (consulta.data.error === 0) {}
            else {
                dispatch(setRiesgosNoAsignados(consulta.data))
                setCargando(false)
            }
        }
        getRiesgosT()
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
                    <div className="table-responsive m-3">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    {titulos.map((titulo, index) => {
                                        return (
                                            <th key={index}>{titulo}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {!(data === []) &&
                                    data.map((riesgo, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{riesgo.rie_idriesgo}</td>
                                                <td>{riesgo.tipo[0].tipo_descripcion}</td>
                                                <td>{riesgo.ubicacion[0].ubi_ciudad}</td>
                                                <td>{riesgo.rie_descripcion}</td>
                                                <td>{cambiarformatoFecha(riesgo.rie_fechaingreso)}</td>
                                                <td>{riesgo.estado[0].est_descripcion}</td>
                                                <td>
                                                    <Link to="/asignarriesgo" state={{numriesgo: index}}>
                                                        <button className="btn btn-secondary">Asignar</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                {cargando &&
                                    <tr>
                                        {titulos.map((titulo, index) => {
                                        return (
                                            <th key={index}><Skeleton/></th>
                                        )
                                    })}
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RiesgosNoAsignados