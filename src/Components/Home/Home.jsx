import React, { Component } from 'react'
import MyEditor from '../Common/MyEditor'
import Header from '../Headers/Header'
import './Home.css'
import add from '../svg/add.svg'
import tag from '../svg/tag.svg'
import report from '../svg/report.svg'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            add: true,
            tag: false,
            report:false,
        };
    }
    addMyNote = () => {
        if (this.state.value) {
            console.log(this.state.value);
        }

    }
    textAreaUpdate = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    addIconClicked = () => {
        this.setState({
            add: true,
            tag: false,
            report:false,
        });
    }
    tagIconClicked = () => {
        this.setState({
            add: false,
            tag: true,
            report:false,
        });
    }
    reportIconClicked = () => {
        this.setState({
            add: false,
            tag: false,
            report:true,
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
                                <img className="icon" src={add}></img>
                            </a>
                            <a className={this.state.tag ? "btn activeIcon" : "btn"} onClick={this.tagIconClicked}>
                                <img className="icon" src={tag}></img>
                            </a>
                            <a className={this.state.report ? "btn activeIcon" : "btn"} onClick={this.reportIconClicked}>
                                <img className="icon" src={report}></img>
                            </a>
                        </div>
                        <div className="col-10">
                            {this.state.add && <div>
                                <MyEditor onChange={this.textAreaUpdate}
                                    value={this.state.value} />
                                <div className="row">
                                    <div class="col">
                                        <button
                                            className="btn float-right mr-2 mt-3"
                                            onClick={this.addMyNote}>Add</button>
                                    </div>
                                </div>
                            </div>}
                            {this.state.tag && <div>
                                {/* <tags></tags> */}
                            </div>}
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default Home
