import React, { Component } from 'react'

import Header from '../Headers/Header'
import './Home.css'
import home from '../svg/home.svg'
import tag from '../svg/tag.svg'
import report from '../svg/report.svg'
import Tags from '../Tags/Tags'
import Report from '../Report/Report'
import Select from 'react-select';
import Notes from '../Notes/Notes'
import todo from '../svg/to-do-list.svg'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            add: true,
            tag: false,
            report:false,
            todo:false,
        };
    }
   
    
    addIconClicked = () => {
        
        this.setState({
            add: true,
            tag: false,
            report:false,
            todo:false,
        });
    }
    tagIconClicked = () => {
        this.setState({
            add: false,
            tag: true,
            report:false,
            todo:false,
        });
    }
    reportIconClicked = () => {
        this.setState({
            add: false,
            tag: false,
            report:true,
            todo:false,
        });
    }
    todoIconClicked = () => {
        this.setState({
            add: false,
            tag: false,
            report:false,
            todo:true,
        });
    }
    render() {
        return (
            <div>
                <Header></Header>
                <div className="main">
                    <div className="row">
                        <div className="col-1 left-panel">
                            <a className={this.state.add ? "btn activeIcon" : "btn"} onClick={this.addIconClicked}>
                                <img className="icon" src={home}></img>
                            </a>
                            <a className={this.state.tag ? "btn activeIcon" : "btn"} onClick={this.tagIconClicked}>
                                <img className="icon" src={tag}></img>
                            </a>
                            <a className={this.state.report ? "btn activeIcon" : "btn"} onClick={this.reportIconClicked}>
                                <img className="icon" src={report}></img>
                            </a>
                            <a className={this.state.todo ? "btn activeIcon" : "btn"} onClick={this.todoIconClicked}>
                                <img className="icon" src={todo}></img>
                            </a>
                        </div>
                        <div className="col-10">
                            {this.state.add && <div>
                                <Notes></Notes>
                            </div>}
                            {this.state.tag && <div>
                               <Tags></Tags>
                            </div>}
                            {this.state.report && <div>
                               <Report></Report>
                            </div>}
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default Home
