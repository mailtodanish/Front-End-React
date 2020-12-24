import React, { Component } from 'react'

export class MyEditor extends Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon">
                <i className="fas fa-pencil-alt prefix"></i>
                </span>
            </div>
            <textarea className="form-control" id="testarea_id" 
            rows="8"
            onChange={this.props.onChange}
            value={this.props.value}
            ></textarea>
        </div>
    )
  }
}

export default MyEditor
