import React from 'react';

function Header(props) {

    let title = 'MySpace'

    return(
        <nav class="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
            <span className="h3">{props.title || title}</span>
            </div>
        </nav>
    )
}
export default Header;