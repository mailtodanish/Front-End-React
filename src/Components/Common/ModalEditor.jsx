import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

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
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.parentAction}>
                Close
              </Button>
              <Button variant="primary" onClick={this.props.parentAction}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }

export default ModalEditor;