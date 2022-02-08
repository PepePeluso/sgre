import React, { useState, useEffect } from "react"
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import Navbar from "./navbar"
import { Link } from "react-router-dom"
import { setRiesgosUnidad } from "../../Store/slices/RiesgoUnidad"

const TableRiesgos = () => {
    const unidadResponsableID = 1
    const dispatch = useDispatch()

    const url = "https://backend-sgre.herokuapp.com/riesgoU"
    const titulos = ["id", "Código", "Tipo", "Ciudad", "Fecha Ingreso", "Estado", "Visualizar"]

    const data = useSelector(state => state.RiesgoUnidad.riesgosUnidad)
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        setCargando(true)
        dispatch(setRiesgosUnidad([]))
        const getRiesgosU = async () => {
            const consulta = await axios.get(url + "?unidad_id=" + unidadResponsableID.toString())
            if (consulta.data.error === 0) { }
            else {
                dispatch(setRiesgosUnidad(consulta.data))
                setCargando(false)
            }
        }
        getRiesgosU()
    }, [])

    const cambiarformatoFecha = (date) => {
        var fecha = String(date)

        return fecha.replace("T00:00:00.000Z", "")
    }

    return (
        <div>
            <Navbar />
            <div className="row-m-3">
                <div className="container-fluid">
                    <h2>Riesgos Asignados</h2>
                    <div className="table-responsive m 3">
                        <table className="table" >
                            <thead>
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
                                                <td>{riesgo.rie_codigo}</td>
                                                <td>{riesgo.tipo[0].tipo_descripcion}</td>
                                                <td>{riesgo.ubicacion[0].ubi_ciudad}</td>
                                                <td>{cambiarformatoFecha(riesgo.rie_fechaingreso)}</td>
                                                <td>{riesgo.estado[0].est_descripcion}</td>
                                                <td>
                                                    <Link to="/visualizarriesgo" state={{ numriesgo: index }}>
                                                        <button className="btn btn-secondary">Visualizar</button>
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

export default TableRiesgos
