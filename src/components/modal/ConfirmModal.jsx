
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



export default function ConfirmModal({ show, tittle, message, confirmText, onConfirm, onHide, color }) {


    const confirmButton = {
        backgroundColor: color || 'blue',
        borderColor: color || 'blue',
        color: 'white'
    }
    return (
        <Modal show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered className='text-center'>
            <Modal.Header  >
                <Modal.Title id="contained-modal-title-vcenter" className='m-auto'>
                    {tittle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <p>
                    {message}
                </p>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-around'>
                <Button onClick={onConfirm} style={confirmButton}>{confirmText}</Button>
                <Button onClick={onHide}>cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}

