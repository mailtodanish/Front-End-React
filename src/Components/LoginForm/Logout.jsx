import React, { Component } from 'react'
import {ACCESS_TOKEN_NAME} from '../../Constant/apiConstants';

export class Logout extends Component {

   
    componentDidMount(){
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        window.location = "/login"
    }
    render() {
        return null;
    }
}

export default Logout
