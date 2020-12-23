import React, { useState } from 'react';
import './App.css';
import Header from './Components/Headers/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';
import LoginForm from './Components/LoginForm/LoginForm';
import Home from './Components/Home/Home';
import Logout from './Components/LoginForm/Logout';
import PrivateRoute from './Components/ProtectedRouter/PrivateRoute';
import NotFoundPage from  './Components/LoginForm/NotFoundPage'
import LandingPage from './Components/LandingPage/LandingPage';

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <div className="App">        
        
          <Switch>
            <Route path="/" exact={true}>
              <LandingPage/>
            </Route>
            <Route path="/register" exact={true}>
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>

            <PrivateRoute path="/home" component={Home} />

            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="*" component={NotFoundPage} />

          </Switch>
        </div>
      
    </Router>
  );
}

export default App;
