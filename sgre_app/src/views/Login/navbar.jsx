import React, { Fragment } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <Fragment>
            <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand h1">
                        SGRE Zona 1
                    </Link>
                </div>
            </nav>
        </Fragment>
    )
}

export default Navbar