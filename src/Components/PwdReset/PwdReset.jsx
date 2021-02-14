import React, { Component } from 'react'
import './PwdReset.css'
import axios from 'axios';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../Constant/apiConstants';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export class PwdReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpwd: '',
            newpwd: '',
            confipwd: '',

        };

    }
    resetPwd = (e) => {
        var self = this;
        self.setState({
            successMessage: "Loading...",
        });

        e.preventDefault();

        const token = localStorage.getItem(ACCESS_TOKEN_NAME);

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const payload = {
            "old_password": this.state.oldpwd,
            "new_password": this.state.newpwd,
            "conf_new_pw": this.state.confipwd
        }
        console.table(payload);
        axios.post(API_BASE_URL + '/user/update/password/', payload, config)
            .then(function (response) {
                if (!('error' in response.data)) {
                    self.setState({
                        tagValue: ""
                    });
                    NotificationManager.success("Tag added.", 'info');

                } else {
                    NotificationManager.warning(response.data['error'], 'info');
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    oldpwdOnChane = (e) => {
        this.setState({
            oldpwd: e.target.value
        });
    }
    newPwdOnChane = (e) => {
        this.setState({
            newpwd: e.target.value
        });
    }
    nconfPwdOnChane = (e) => {
        this.setState({
            confipwd: e.target.value
        });
    }

    render() {
        return (
            <div >
                <label>Old Password</label>
                <input value={this.state.oldpwd} onChange={this.oldpwdOnChane} className="form-control" />
                <label>New Password</label>
                <input value={this.state.newpwd} onChange={this.newPwdOnChane} className="form-control" />
                <label>Confirm Password</label>
                <input value={this.state.confipwd} onChange={this.nconfPwdOnChane} className="form-control" />
                <div className="row">
                    <div class="col">
                        <button
                            className="btn float-right mr-2 mt-3"
                            onClick={this.resetPwd}>Reset</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PwdReset
