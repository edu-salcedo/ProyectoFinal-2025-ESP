
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


export default function ModalWindow(props) {
    const navigate = useNavigate();

    const handleGotocart = () => {
        console.log("navegando al carrito")
        navigate("/cart")
    };
    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered className='text-center'>
            <Modal.Header  >
                <Modal.Title id="contained-modal-title-vcenter" className='m-auto'>
                    Felicitaciones !!!!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <p>
                    se agrego el producto
                </p>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-around'>
                <Button onClick={handleGotocart} className='bg-success'>ir al carrito</Button>
                <Button onClick={props.onHide}>close</Button>
            </Modal.Footer>
        </Modal>
    );
}

