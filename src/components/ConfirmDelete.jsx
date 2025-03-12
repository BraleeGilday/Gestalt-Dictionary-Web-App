import { Modal, Button } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";

// https://react-bootstrap.netlify.app/docs/components/modal/

function ConfirmDelete( {handleClose, showModal, onDelete, script} ) {

    return (
      <>
        <Modal
          show={showModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this script?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
                variant="primary"   
                onClick={() => {
                    onDelete(script._id);
                    handleClose();
                }}
            >
                Delete Script
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ConfirmDelete