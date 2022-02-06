import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"

const Navbar = () => {
    return (
        <Fragment>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand h1">
                        SGRE Zona 1
                    </Link>
                    <ul className="navbar-nav mr-auto" />
                    <Link to="/login" className="navbar-text">
                        <FontAwesomeIcon icon={faUserCircle} />
                        <strong>Iniciar Sesión</strong> 
                    </Link>
                </div>
            </nav>
        </Fragment>
    )
}

export default Navbar