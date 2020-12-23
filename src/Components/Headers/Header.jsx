import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../Constant/apiConstants';
import './Header.css'
import logout from '../svg/logout.svg'
import settings from '../svg/settings.svg'
import home from '../svg/home.svg'


function Header(props) {



    return (
        <div class="header">
            <a href="#default" class="square"></a>
            <div class="header-right">
            <NavLink className="nav-link" to="/home">
                    <img src={home}></img>
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