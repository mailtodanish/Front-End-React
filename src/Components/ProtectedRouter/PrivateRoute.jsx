import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ACCESS_TOKEN_NAME} from '../../Constant/apiConstants';

const token = localStorage.getItem(ACCESS_TOKEN_NAME);
const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			if (token) {
				return <Component {...props} />;
			} else {
				return <Redirect to="/login" />;
			}
		}}
	/>
);
export default PrivateRoute;