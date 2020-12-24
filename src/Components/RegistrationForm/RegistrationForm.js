import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { withRouter } from "react-router-dom";
import {API_BASE_URL} from '../../Constant/apiConstants';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function RegistrationForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: ""
        
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length) {
            
            const payload={
                "user_data": {
                    "email": state.email,
                    "password": state.password,
                    "confirm_password": state.password
                  }
            }
            axios.post(API_BASE_URL+'/auth/register', payload)
            .then(function (response) {
                if(!('error' in response.data)){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Registration successful. Redirecting to home page..'
                    }))
                    NotificationManager.success("Registration successful.", 'info');
                    // redirectToHome();
                   
                } else{
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : ''
                    }));
                    NotificationManager.warning(response.data['error'], 'info');
                }
            })
            .catch(function (error) {
                console.log(error);
            });    
        }else{
            NotificationManager.warning('Email or password missing.', 'alert');
        }
          
        
    }
   
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            NotificationManager.warning('Passwords do not match', 'warning');
        }
    }
    return(
        <div className="reg_container card-body">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div>
                <button id="submit_id"
                    type="submit" 
                    className="btn"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            
            <NotificationContainer/>
        </div>
    )
}

export default withRouter(RegistrationForm);