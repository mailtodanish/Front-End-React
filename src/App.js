import React, { lazy, Suspense, useState } from 'react';
import { Alert, Layout } from 'antd';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Loading from './Components/Common/Loading'

const Settings = lazy(() => import('./Components/LoginForm/Settings'));
const RegistrationForm = lazy(() => import('./Components/RegistrationForm/RegistrationForm'));
const LoginForm = lazy(() => import('./Components/LoginForm/LoginForm'));
const Home = lazy(() => import('./Components/Home/Home'));
const Logout = lazy(() => import('./Components/LoginForm/Logout'));
const PrivateRoute = lazy(() => import('./Components/ProtectedRouter/PrivateRoute'));
const NotFoundPage = lazy(() => import('./Components/LoginForm/NotFoundPage'));
const LandingPage = lazy(() => import('./Components/LandingPage/LandingPage'));

const { ErrorBoundary } = Alert;

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading size="large" />}>
        <Layout.Content>
          <Router>
            <div className="App">

              <Switch>
                <Route path="/" exact={true}>
                  <LandingPage />
                </Route>
                <Route path="/register" exact={true}>
                  <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
                </Route>
                <Route path="/login">
                  <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} />
                </Route>

                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/settings" component={Settings} />
                <Route path="/logout">
                  <Logout />
                </Route>
                <Route path="*" component={NotFoundPage} />

              </Switch>
            </div>

          </Router>
        </Layout.Content>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
