import React, { useContext } from "react"
import "bootstrap/dist/css/bootstrap.css"
import { Link } from 'react-router-dom'

import { userContext } from "../App";

const Navbar = () => {
    const { state, dispatch } = useContext(userContext);

    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-Link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-Link" to="/about">User Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-Link" to="/contact">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-Link" to="/logout">LogOut</Link>
                    </li>

                </>
            )
        } else {
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-Link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-Link" to="/about">User Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-Link" to="/contact">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-Link" to='/login'>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-Link" to="/register">Register</Link>
                    </li>

                </>
            )
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">MERN</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <RenderMenu />
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
}

export default Navbar;
