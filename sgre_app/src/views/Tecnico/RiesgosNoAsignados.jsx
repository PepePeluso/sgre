import React, { useState, useEffect } from "react"
import Axios from "axios"
import { useSelector, useDispatch } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import Navbar from "./navbar"
import { setRiesgosNoAsignados } from "../../Store/slices/RiesgoNoAsignado"

const RiesgosNoAsignados = () => {
    const dispatch = useDispatch()

    const titulos = ["id", "Tipo", "Ubicación", "Descripción", "Fecha Ingreso", "Estado", "Asignar"]

    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        //dispatch(setRiesgosNoAsignados([]))
    }, [])

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
                                                <td>{riesgo.rie_idRiesgo}</td>
                                                <td>{riesgo.tipo_id}</td>
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