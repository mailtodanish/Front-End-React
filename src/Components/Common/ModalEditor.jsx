import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import MyEditor from './MyEditor';

class ModalEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: props.show
      };
    }

    render() {
      return (
        <>
          <Modal show={this.props.show} onHide={this.props.parentAction}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <MyEditor
                      content={this.props.body}
                      note_id={this.props.note_id}
                      isupdate={true}
                      refresh_record
                    />
              </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.parentAction}>
                Close
              </Button>
             
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }

export default ModalEditor;