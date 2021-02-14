import React, { Component } from 'react'

import Header from '../Headers/Header'
import PwdReset from '../PwdReset/PwdReset';
import reset from '../svg/pwd_reset.svg'

import './Settings.css'
export class settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pwd: true,
            tag: false,
            report: false,
            todo: false,
        };
    }


    pwdIconClicked = () => {

        this.setState({
            pwd: true,
            tag: false,
            report: false,
            todo: false,
        });
    }

    render() {
        return (
            <div>
                <Header></Header>
                <div className="main">
                    <div className="row">
                        <div className="col-1 left-panel">
                            <a className={this.state.pwd ? "btn activeIcon" : "btn"} onClick={this.pwdIconClicked}>
                                <img className="icon" src={reset}></img>
                            </a>

                        </div>
                        <div className="col-10">
                            {this.state.pwd && <div>
                                <PwdReset></PwdReset>
                            </div>}
                            

                        </div>
                    </div>


                </div>

            </div>
        )
    }
}

export default settings
