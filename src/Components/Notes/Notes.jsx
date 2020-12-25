import React, { Component } from 'react'
import Select from 'react-select';
import axios from 'axios';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../Constant/apiConstants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import MyEditor from '../Common/MyEditor'
import Moment from 'react-moment';
import trash from '../svg/trash.svg'
import edit from '../svg/edit.svg'
import './Notes.css'

export class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            selectedOption: null,
            noteRow: [],
            characterCounter: 0,
        };

        this.getAllTag();

    }
    getAllNotes = () => {
        var self = this;
        const token = localStorage.getItem(ACCESS_TOKEN_NAME);

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const tag_id = self.state.selectedOption.value;
        axios.get(API_BASE_URL + `/note/tag?tag_id=${tag_id}`, config)
            .then(function (response) {

                if (!('error' in response.data)) {

                    self.setState({
                        noteRow: response.data['notes']
                    });

                } else {
                    NotificationManager.warning(response.data['error'], 'info');
                }
            })
            .catch(function (error) {
                console.log(error);
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

                    let data = response.data['tags']
                    let options = data.map(x => ({ 'value': x['id'], 'label': x['name'] }));
                    self.setState({
                        options: options
                    });

                } else {
                    NotificationManager.warning(response.data['error'], 'info');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    textAreaUpdate = (e) => {
        const charCount = e.target.value.length;
        const charLeft = 245 - charCount;
        if (charLeft > -1) {
            this.setState({
                value: e.target.value,
                characterCounter: charLeft
            });
        }
    }
    deleteNote =(id)=>{
        var self = this;
        self.setState({
            successMessage: "Loading...",
        });

        const token = localStorage.getItem(ACCESS_TOKEN_NAME);

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.delete(API_BASE_URL + `/note/?id=${id}`, config)
            .then(function (response) {
                if (!('error' in response.data)) {
                   //Delete Notification
                   NotificationManager.warning('Note deleted.', 'info');
                } else {
                    NotificationManager.warning(response.data['error'], 'info');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    addMyNote = () => {
        var self = this;
        if (this.state.value) {

            const token = localStorage.getItem(ACCESS_TOKEN_NAME);

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const payload = {
                "detail": this.state.value,
                "tag_id": this.state.selectedOption.value
            }

            axios.post(API_BASE_URL + '/note/', payload, config)
                .then(function (response) {
                    console.log(response.data);
                    if (!('error' in response.data)) {
                        self.setState({
                            value: '',
                        });
                        self.getAllNotes();
                        NotificationManager.info('Note created.', 'info');

                    } else {
                        NotificationManager.warning(response.data['error'], 'info');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            NotificationManager.warning("Detail cant be blank.", 'info');
        }

    }
    handleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption.value)
        );
       
    };
    render() {
        {this.state.selectedOption && this.getAllNotes();}
        return (
            <div>
                <h5>Select Tag:</h5>
                <Select autoFocus isSearchable
                    placeholder='Select Tag...'
                    value={this.state.selectedOption}
                    onChange={this.handleChange}
                    options={this.state.options}
                />
                <hr />
                { this.state.selectedOption && <div>
                    <h5>Add Note:</h5>

                    <MyEditor onChange={this.textAreaUpdate}
                    counter={this.state.characterCounter}
                        value={this.state.value} />
                    <div className="row">
                        <div class="col">
                            <button
                                className="btn float-right mr-2 mt-3"
                                onClick={this.addMyNote}>Add</button>
                        </div>
                    </div>
                    <hr></hr>
                    <table class="table">
                        <thead class="thead-light">
                            <tr class="d-flex">
                                <th scope="col" class="col-1">#Id</th>
                                <th scope="col" class="col-7">Detail</th>
                                <th scope="col" class="col-2">Created</th>
                                <th scope="col" class="col-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <React.Fragment>
                                {this.state.noteRow.map(row => (
                                    <tr key={row.id} class="d-flex">
                                        <td  class="col-1">{row.id}</td>
                                        <td class="col-7">{row.detail}</td>
                                        <td class="col-2">
                                            <Moment unix>
                                                {row.created_ts}
                                            </Moment>
                                        </td>
                                        <td class="col-2">
                                            <a className={this.state.noteRow ? "btn TagsactiveIcon" : "btn"} onClick={()=>this.deleteNote(row.id)}>
                                                <img className="Tagsicon" src={trash}></img>
                                            </a>
                                            <a className={this.state.noteRow ? "btn TagsactiveIcon" : "btn"} onClick={this.homeIconClicked}>
                                                <img className="Tagsicon" src={edit}></img>
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

export default Notes
