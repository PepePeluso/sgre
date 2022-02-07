import React, { Fragment } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <Fragment>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand h1">
                        SGRE Zona 1
                    </Link>
                    <ul className="navbar-nav mr-auto" />
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">Bienvenido, bombero</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li>
                                    <Link to="/login" className="dropdown-item">
                                        Cerrar sesión
                                    </Link>
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