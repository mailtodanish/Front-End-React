import React from 'react';
import { NavLink } from "react-router-dom";
import './Header.css'
import logout from '../svg/logout.svg'
import settings from '../svg/settings.svg'
import search from '../svg/search.svg'
import { useLocation } from 'react-router-dom'


function Header(props) {
    const location = useLocation();
    console.log("test",location.pathname);

    return (
        <div className="header-NonLandingPage">
            <a href="#default" className="square"></a>
            <div className="header-right">
            <NavLink className="nav-link" to="/home">
                    <img src={search}></img>
                </NavLink>
                
                <NavLink className="nav-link" to="/settings">
                    <img src={settings}></img>
                </NavLink>
                <NavLink className="nav-link" to="/logout">
                    <img src={logout}></img>
                </NavLink>

            </div>
        </div>

    )



}
export default Header;