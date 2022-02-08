import React, { Fragment, useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { stringify } from "query-string"
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import Navbar from "./navbar";
import { setToken } from "../../Store/slices/Token"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const url = "https://backend-sgre.herokuapp.com/login"

    useEffect(() => {
        dispatch(setToken(""))
    }, [])

    const [loginForm, setLoginForm] = useState({
        user: "",
        password: ""
    })

    const { user, password } = loginForm

    const getToken = async () => {
        const credenciales = "?" + stringify(loginForm, { encode: false })
        console.log(credenciales)
        try {
            const tokenApi = await axios.post(url + credenciales)
            if (tokenApi.data.code) {
                Swal.fire("Error", tokenApi.data.message, "error")
            } else {
                dispatch(setToken(tokenApi.data.token))
                navigate("/")
            }
        } catch (err) {
            console.error(err.message)
            Swal.fire("Error", "Error en la app", "error")
        }
    }

    return (
        <Fragment>
            <Navbar />
            <div className="row m-3">
                <div className="container-fluid">
                    <h2>Iniciar sesión</h2>
                    <div className="card">
                        <div className="card-body">
                            <div className="input-group mb-2">
                                <label className="col-3 align-self-center text-center m-2">Usuario</label>
                                <input type="text" className="form-control" value={user}
                                    onChange={(e) => {
                                        setLoginForm({ ...loginForm, user: e.target.value })
                                    }} />
                            </div>
                            <div className="input-group mb-2">
                                <label className="col-3 align-self-center text-center m-2">Contraseña</label>
                                <input type="password" className="form-control" value={password}
                                    onChange={(e) => {
                                        setLoginForm({ ...loginForm, password: e.target.value })
                                    }} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <button onClick={getToken}
                            className="btn btn-primary">Iniciar Sesión</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Login