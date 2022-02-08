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
                    <ul className="navbar-nav mr-auto" />
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">Bienvenido, bombero</a>
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