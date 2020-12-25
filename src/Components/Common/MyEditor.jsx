import React, { Component } from 'react'

export class MyEditor extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
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
          >
          </textarea>
         
      </div>
       <div class="wrapper">
       <small className="form-text text-muted">remiaing: {this.props.counter}</small >
     </div>
     </div>
    )
  }
}

export default MyEditor
