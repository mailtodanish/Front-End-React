import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../Constant/apiConstants';


function Header(props) {

    let title = 'MySpace'
    const token = localStorage.getItem(ACCESS_TOKEN_NAME);
    if (!token) {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="#">MySpace</NavLink>
            </nav>
        )
    }
    else {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="#">MySpace</NavLink>
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link active" to="#">Home <span className="sr-only">(current)</span></NavLink>
                    <NavLink className="nav-item nav-link" to="#">Features</NavLink>
                    <NavLink className="nav-item nav-link" to="#">Pricing</NavLink>
                    <NavLink className="nav-item nav-link disabled" to="#">Disabled</NavLink>
                </div>
                
            </div> */}
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/logout">Logout</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default Header;