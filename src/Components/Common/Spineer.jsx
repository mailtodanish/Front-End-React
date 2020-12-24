import React from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default class Spinner extends React.Component {
 //other logic
   render() {
    return(
     <Loader
        type="Puff"
        color="#f59c29"
        height={100}
        width={100}
        timeout={300000} //3 secs

     />
    );
   }
}