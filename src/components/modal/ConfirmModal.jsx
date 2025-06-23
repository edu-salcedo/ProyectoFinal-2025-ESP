
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



export default function ConfirmModal({ show, tittle, message, confirmText, onConfirm, onHide }) {

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
                <Button onClick={onConfirm} className='bg-success'>{confirmText}</Button>
                <Button onClick={onHide}>close</Button>
            </Modal.Footer>
        </Modal>
    );
}

