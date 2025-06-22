
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const API_URL = 'https://6855d6011789e182b37c719b.mockapi.io/api/v1/products';

export default function ProductModalForm({ product, show, onHide }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setQuantity(product.quantity || 1);
            setDescription(product.description)
        } else {
            setName('');
            setPrice('');
            setQuantity(1)
            setDescription('')
        }
    }, [product, show]);
    //si el estado de producto o mostrar cambia

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = { name, description, price: Number(price), quantity: Number(quantity) };

        try {
            if (product) {
                // si hay un producto  se edita
                await axios.put(`${API_URL}/${product.id}`, newProduct);
            } else {
                // si no hay producto se crea uno nuevo
                await axios.post(API_URL, newProduct);
            }
            onHide();
        } catch (err) {
            console.error('Error al guardar producto:', err);
        }
    };

    return (

        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{product ? "Editando producto" : "Nuevo producto"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="nombre del producto"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                autoFocus
                            />
                            <Form.Label>descripción</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="descripción del producto"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                autoFocus
                            />
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control
                                type="Number"
                                placeholder=""
                                value={quantity}
                                onChange={e => setQuantity(e.target.value)}
                                autoFocus
                            />
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="Number"
                                placeholder=""
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                autoFocus
                            />
                            <div className="d-flex justify-content-end mt-4 gap-3">
                                <Button variant="primary" type='submit'>
                                    {product ? 'editar' : 'agregar'}
                                </Button>
                                <Button variant="secondary" onClick={onHide}>
                                    cancelar
                                </Button>
                            </div>

                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}


