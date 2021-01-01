import React, { Component } from 'react'
import add from '../svg/add.svg'
import home from '../svg/home.svg'
import trash from '../svg/trash.svg'
import edit from '../svg/edit.svg'
import './Tags.css'
import axios from 'axios';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../Constant/apiConstants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Moment from 'react-moment';

Moment.globalFormat = 'D MMM YYYY';

export class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: true,
            add: false,
            tagValue: '',
            tableRow: [],
        };
        this.getAllTag();
    }
    

    addIconClicked = () => {
        this.setState({
            add: true,
            table: false,
        });
    }
    tagOnChane = (e) => {
        this.setState({
            tagValue: e.target.value
        });
    }
    homeIconClicked = () => {
        this.getAllTag();
        this.setState({
            add: false,
            table: true,
        });
    }
    getAllTag = () => {
        var self = this;
        self.setState({
            successMessage: "Loading...",
        });

        const token = localStorage.getItem(ACCESS_TOKEN_NAME);

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get(API_BASE_URL + '/tags/', config)
            .then(function (response) {
                if (!('error' in response.data)) {
                    console.table(response.data['tags']);
                    self.setState({
                        tableRow: response.data['tags']
                    });

                } else {
                    NotificationManager.warning(response.data['error'], 'info');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    addTag = (e) => {
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
            "name": this.state.tagValue
        }
        console.table(payload);
        axios.post(API_BASE_URL + '/tags/', payload, config)
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
    deleteTag(id){
        // Delete Tag
        var self = this;

        const token = localStorage.getItem(ACCESS_TOKEN_NAME);

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.delete(API_BASE_URL + `/tags/?id=${id}`, config)
            .then(function (response) {
                if (!('error' in response.data)) {
                    NotificationManager.success("Tag deleted.", 'info');    
                                  

                } else {
                    NotificationManager.warning(response.data['error'], 'info');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h4>Tags</h4>
                <div className="row">
                    <div className="col-10">
                    </div>
                    <div className="col-1">
                        <a className={this.state.table ? "btn TagsactiveIcon" : "btn"} onClick={this.homeIconClicked}>
                            <img className="Tagsicon" src={home}></img>
                        </a>
                    </div>
                    <div className="col-1">
                        <a className={this.state.add ? "btn TagsactiveIcon" : "btn"} onClick={this.addIconClicked}>
                            <img className="Tagsicon" src={add}></img>
                        </a>
                    </div>
                </div>
                {this.state.add && <div className="row">
                    <div className="col-4 col-md-4 offset-md-4 form-group">
                        <label>Tag</label>
                        <input value={this.state.tagValue} onChange={this.tagOnChane} className="form-control" />
                        <div className="row">
                            <div class="col">
                                <button
                                    className="btn float-right mr-2 mt-3"
                                    onClick={this.addTag}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>}
                {this.state.table && <div>
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">#Id</th>
                                <th scope="col">Tag</th>
                                <th scope="col">Created</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <React.Fragment>
                                {this.state.tableRow.map(row => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.name}</td>
                                        <td>
                                            <Moment unix>
                                                {row.created_ts}
                                            </Moment>
                                        </td>
                                        <td>
                                            
                                            <a className={this.state.table ? "btn TagsactiveIcon" : "btn"} onClick={()=>this.deleteTag(row.id)}>
                                                <img className="Tagsicon" src={trash}></img>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        </tbody>
                    </table>
                </div>}
                <NotificationContainer />
            </div>
        )
    }
}

export default Tags
