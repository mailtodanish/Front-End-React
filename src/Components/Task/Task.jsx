import React, { Component } from 'react'
import add from '../svg/add.svg'
import home from '../svg/home.svg'
import trash from '../svg/trash.svg'
import edit from '../svg/edit.svg'
import task_done from '../svg/task_done.svg'
import Moment from 'react-moment';
import axios from 'axios';
import './Task.css'
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../Constant/apiConstants';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: true,
            add: false,
            tableRow: [],
            detail:'',
        };
        this.getAllTask();
       
    }
    addIconClicked = () => {
        this.setState({
            add: true,
            table: false,
        });
    }
    homeIconClicked = () => {
        this.getAllTask();
        this.setState({
            add: false,
            table: true,
        });
    }
    taskOnChange = (e) => {
        this.setState({
            detail: e.target.value
        });
    }
    getAllTask = () => {
        var self = this;
        self.setState({
            successMessage: "Loading...",
        });

        const token = localStorage.getItem(ACCESS_TOKEN_NAME);

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get(API_BASE_URL + '/todo/', config)
            .then(function (response) {
                if (!('error' in response.data)) {
                    console.table(response.data['todos']);
                    self.setState({
                        tableRow: response.data['todos']
                    });

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
        axios.delete(API_BASE_URL + `/todo/?id=${id}`, config)
            .then(function (response) {
                if (!('error' in response.data)) {
                    self.getAllTask();
                    NotificationManager.success("Task deleted.", 'info');   
                } else {
                    NotificationManager.warning(response.data['error'], 'info');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    updateTodo = (id) => {
        var self = this;

        const token = localStorage.getItem(ACCESS_TOKEN_NAME);

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const payload = {
            "done_flag": true,
            "id":id
        }
        console.table(payload);
        axios.put(API_BASE_URL + '/todo/', payload, config)
            .then(function (response) {
                if (!('error' in response.data)) {
                    self.getAllTask();
                    NotificationManager.success("Task added.", 'info');

                } else {
                    NotificationManager.warning(response.data['error'], 'info');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    addTodo = () => {
        var self = this;

        const token = localStorage.getItem(ACCESS_TOKEN_NAME);

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const payload = {
            "detail": this.state.detail
        }
        console.table(payload);
        axios.post(API_BASE_URL + '/todo/', payload, config)
            .then(function (response) {
                if (!('error' in response.data)) {
                    self.setState({
                        detail: ""
                    });
                    NotificationManager.success("Task added.", 'info');

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
                <h4>Todo</h4>
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
                        <label>Add Todo</label>
                        <input value={this.state.detail} onChange={this.taskOnChange} className="form-control" />
                        <div className="row">
                            <div class="col">
                                <button
                                    className="btn float-right mr-2 mt-3"
                                    onClick={this.addTodo}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>}
                {this.state.table && <div>
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">#Id</th>
                                <th scope="col">Todo</th>
                                <th scope="col">Created</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        <React.Fragment>
                                {this.state.tableRow.map(row => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.detail}</td>
                                        <td>
                                            <Moment unix>
                                                {row.created_ts}
                                            </Moment>
                                        </td>
                                        <td>
                                            
                                            <a className={this.state.table ? "btn " : "btn"} onClick={()=>this.deleteTag(row.id)}>
                                                <img className="Tagsicon" src={trash}></img>
                                            </a>
                                            <a className={this.state.table ? "btn TagsactiveIcon" : "btn"} onClick={()=>this.updateTodo(row.id)}>
                                                <img className="Tagsicon" src={task_done}></img>
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

export default Task
