import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { stringify } from "query-string"
import axios from "axios"
import Navbar from "./navbar"

const CrearUsuarios = () => {
    const navigate = useNavigate()

    const urlCreaUser = "https://backend-sgre.herokuapp.com/creausuario"
    const urlRolUser = "https://backend-sgre.herokuapp.com/rol"
    const urlUniResp = "https://backend-sgre.herokuapp.com/unidad"

    const [rol, setRol] = useState([])
    const [unidadRespon, setUnidadRespon] = useState([])

    const roles = async () => {
        const resp = await axios.get(urlRolUser)
        if (resp.data.code) {
            console.error(resp.data)
        } else {
            setRol(resp.data || [{}])
        }
    }

    const unidades = async () => {
        const resp = await axios.get(urlUniResp)
        if (resp.data.code) {
            console.error(resp.data)
        } else {
            setUnidadRespon(resp.data || [{}])
        }
    }

    useEffect(() => {
        const inicial = async () => {
            await unidades()
            await roles()
        }
        inicial()
    }, [])

    const [userForm, setUserForm] = useState({
        usu_usuario: "",
        usu_contrasena: "",
        rol_id: 0,
        unidad_id: 0
    })

    const { usu_usuario, usu_contrasena, rol_id, unidad_id } = userForm

    const crearUsuario = async () => {
        if ((usu_usuario === "") || (usu_contrasena === "")) {
            Swal.fire("Error", "Complete los campos vacios", "error")
        } else if (rol_id === 0) {
            Swal.fire("Error", "Seleccione el rol", "error")
        } else if ((rol_id === 3) && (unidad_id === 0)) {
            Swal.fire("Error", "Seleccione la unidad responsable", "error")
        } else {
            const { value: confirm } = await Swal.fire({ title: "Atención", text: "¿Está seguro de crear este usuario?", icon: "info", showCancelButton: true })
            if (confirm) {
                let usuarioString = "?" + stringify(userForm)
                console.log(usuarioString)
                try {
                    const usuario = await axios.post(urlCreaUser + usuarioString)
                    if (usuario.data.code) {
                        Swal.fire("Error", usuario.data.message, "error")
                    } else {
                        Swal.fire("Perfecto", "Usuario creado con éxito", "success")
                        navigate("/")
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
                    <h2>Crear nuevo usuario</h2>
                    <div className="card my-3">
                        <div className="card-body">
                            <div className="input-group mb-2">
                                <label className="col-3 align-self-center text-center m-2">Usuario:</label>
                                <input type="text" className="form-control" value={usu_usuario}
                                    onChange={(e) => {
                                        setUserForm({ ...userForm, usu_usuario: e.target.value })
                                    }} />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-3 align-self-center text-center m-2">Contraseña:</label>
                                <input type="password" className="form-control" value={usu_contrasena}
                                    onChange={(e) => {
                                        setUserForm({ ...userForm, usu_contrasena: e.target.value })
                                    }} />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-3 align-self-center text-center m-2">Rol:</label>
                                <div className="col">
                                    <select className="col form-select" value={rol_id}
                                        onChange={(e) => {
                                            setUserForm({
                                                ...userForm, rol_id: parseInt(e.target.value)
                                            });
                                        }}>
                                        <option key={0} value={0}>Elija un rol</option>
                                        {rol.map((Rol, index) => {
                                            return (
                                                <option key={index} value={Rol.rol_id}>{Rol.rol_descripcion}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="input-group">
                                <label className="col-3 align-self-center text-center m-2">Unidad Responsable:</label>
                                <div className="col">
                                    <select className="col form-select" value={unidad_id}
                                        onChange={(e) => {
                                            setUserForm({
                                                ...userForm, unidad_id: parseInt(e.target.value)
                                            });
                                        }}>
                                        <option key={0} value={0}>Elija un rol</option>
                                        {(rol_id===3) && unidadRespon.map((unidad, index) => {
                                            return (
                                                <option key={index} value={unidad.unidad_id}>{unidad.unidad_descripcion}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <button onClick={crearUsuario}
                            className="btn btn-primary">Crear Usuario</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CrearUsuarios