import React, { Component } from 'react'
import {ACCESS_TOKEN_NAME} from '../../Constant/apiConstants';

export class Logout extends Component {

    redirectToLogin = () => {
        this.props.history.push('/login'); 
        this.props.updateTitle('Login');
    }
    componentDidMount(){
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        this.redirectToLogin();
    }
    render() {
        return null;
    }
}

export default Logout
