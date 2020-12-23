import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../Constant/apiConstants';


function Header(props) {

    
    
        return (
            <div class="header">
                    <a href="#default" class="square"></a>
                    <div class="header-right">
                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                        
                       
                    </div>
            </div>
            
        )
    
   
    
}
export default Header;