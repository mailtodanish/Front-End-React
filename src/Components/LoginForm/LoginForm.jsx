
import React, { Component } from 'react'
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../Constant/apiConstants';
import { withRouter } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';


export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
            successMessage: null,
            
        };
    }
    handleChange = (e) => {
        const {id , value} = e.target   
        this.setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    handleSubmitClick = (e) => {
        this.setState({
            successMessage: "Loading...",
        });
        e.preventDefault();
        const payload={
            "email":this.state.email,
            "password":this.state.password,
        }
        axios.post(API_BASE_URL+'/auth/login', payload)
            .then(function (response) {
                if(!('error' in response.data)){
                    NotificationManager.success("Login sucessfull.", 'info');
                    localStorage.setItem(ACCESS_TOKEN_NAME,response.data.access_token);
                    window.location = "/home"                 
                } else{
                    NotificationManager.warning(response.data['error'], 'info');
                }
            })
            .catch(function (error) {
                console.log(error);
            }); 
       
    }
    render() {
        return (
            <div className="card-body login_container">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={this.state.email}
                       onChange={this.handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={this.state.password}
                       onChange={this.handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button id="login_id"
                    type="submit" 
                    className="btn"
                    onClick={this.handleSubmitClick}
                >Login</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
                {this.state.successMessage}
            </div>
            
            <NotificationContainer/>
        </div>
        )
    }
}

export default LoginForm