
import { useEffect, useState } from 'react';

import { Button, Form, Modal, Dropdown } from 'react-bootstrap';

import { useApi } from '../../../hooks/useApi';

const API_URL = 'https://6855d6011789e182b37c719b.mockapi.io/api/v1/products';

export default function ProductModalForm({ product, show, onHide, onSave }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { create, update } = useApi(API_URL);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image || '');
            setCategory(product.category || '');
            setQuantity(product.quantity || 1);
            setDescription(product.description)
        } else {
            setName('');
            setPrice('');
            setImage('');
            setCategory('');
            setQuantity(1)
            setDescription('')
        }
    }, [product, show]);
    //si el estado de producto o mostrar cambia

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            name,
            description,
            image,
            category,
            price: Number(price),
            quantity: Number(quantity)
        };

        try {
            if (product) {
                // si hay un producto  se edita
                await update(product.id, newProduct);
            } else {
                // si no hay producto se crea uno nuevo
                await create(newProduct);
            }
            onSave();
        } catch (err) {
            console.error('Error al guardar producto:', err);
        }
    };

    const handleSelectCategory = (category) => {
        setCategory(category);
    };

    return (

        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{product ? "Editando producto" : "Nuevo producto"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 text-center" controlId="exampleForm.ControlInput1">
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
                            <Form.Label>Url imagen</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="url de la imagen"
                                value={image}
                                onChange={e => setCategory(e.target.value)}
                                autoFocus
                            />

                            <Form.Group className="mt-3">
                                <Form.Label>Categoría</Form.Label>
                                <Dropdown onSelect={handleSelectCategory}>
                                    <Dropdown.Toggle variant="light">
                                        {category || "Seleccioná una categoría"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="Moda">Moda</Dropdown.Item>
                                        <Dropdown.Item eventKey="herramientas">Herramientas</Dropdown.Item>
                                        <Dropdown.Item eventKey="televisores">Televisores</Dropdown.Item>
                                        <Dropdown.Item eventKey="climatización">Climatización</Dropdown.Item>
                                        <Dropdown.Item eventKey="notebooks">Notebooks</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>

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


