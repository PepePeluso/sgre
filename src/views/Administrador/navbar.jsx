import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setToken } from "../../Store/slices/Token"

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cerrarSesion = () => {
        dispatch(setToken(""))
        navigate("/login")
    }

    return (
        <Fragment>
            <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand h1">
                        SGRE Zona 1
                    </Link>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/administrador/origen" className="nav-link active">
                                Origen
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/administrador/tipo" className="nav-link active">
                                Tipo
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/administrador/nivel" className="nav-link active">
                                Nivel
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/administrador/usuarios" className="nav-link active">
                                Usuarios
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/administrador/riesgos" className="nav-link active">
                                Ver Riesgos
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">Bienvenido, Admin</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li>
                                    <p className="dropdown-item" onClick={cerrarSesion}>Cerrar sesión</p>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </nav>
        </Fragment>
    )
}

export default Navbar