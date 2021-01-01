import React, { Component } from 'react'
import Select from 'react-select';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../Constant/apiConstants';
import axios from 'axios';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import MyEditor from '../Common/MyEditor'
import Moment from 'react-moment';
import trash from '../svg/trash.svg'
import edit from '../svg/edit.svg'
import './Notes.css'
import ModalEditor from '../Common/ModalEditor';

export class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            content: '',
            selectedOption: null,
            noteRow: [],
            open: false,

        };


        this.togglePopup = this.togglePopup.bind(this);
    }

    notification_svc = (msg) => {
        NotificationManager.warning(msg, 'info');
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
    togglePopup() {
        console.log(this.state.open);
        this.setState({
            open: !this.state.open
        });
    }

    deleteNote = (id) => {
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
                    self.getAllNotes();
                    NotificationManager.warning('Note deleted.', 'info');
                } else {
                    NotificationManager.warning(response.data['error'], 'info');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => this.getAllNotes()
        );

    };
    componentWillMount() {

        this.getAllTag();
    }
    render() {
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

                    <MyEditor
                        textAreaUpdate={this.textAreaUpdate}
                        selectedTag={this.state.selectedOption.value}
                        notification_svc={this.state.notification_svc}
                        getAllNotes={this.getAllNotes}
                    />

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
                                        <td class="col-1">{row.id}</td>
                                        <td class="col-7">{row.detail}</td>
                                        <td class="col-2">
                                            <Moment unix>
                                                {row.created_ts}
                                            </Moment>
                                        </td>
                                        <td class="col-2">
                                            <a className={this.state.noteRow ? "btn TagsactiveIcon" : "btn"} onClick={() => this.deleteNote(row.id)}>
                                                <img className="Tagsicon" src={trash}></img>
                                            </a>
                                            <a className={this.state.noteRow ? "btn TagsactiveIcon" : "btn"} onClick={this.togglePopup}>
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
                {this.state.open && <ModalEditor show={this.state.open} parentAction={this.togglePopup}></ModalEditor>}
            </div>
        )
    }
}

export default Notes
