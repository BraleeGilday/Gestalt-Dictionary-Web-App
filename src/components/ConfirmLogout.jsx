import { Modal, Button } from "react-bootstrap";

function ConfirmLogout({ handleClose, showModal, onLogout }) {
    return (
        <Modal className="logout-modal" show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>Confirm Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to log out?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button 
                    variant="primary"
                    onClick={() => {
                        onLogout();
                        handleClose();
                    }}
                >
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmLogout;
