import { Button, Form, Modal } from 'react-bootstrap';

import { useEffect, useState } from 'react';

import { useApi } from '../../../hooks/useApi';

import DropdownCategory from '../../../components/Dropdown';

const API_URL = 'https://6855d6011789e182b37c719b.mockapi.io/api/v1/products';
export default function ProductModalForm({ product, show, onHide, onSave, lastId }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { create, update } = useApi(API_URL);

    const [errors, setErrors] = useState({ name: false, category: false, quantity: false, price: false });


    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description)
            setImage(product.image || '');
            setCategory(product.category || '');
            setQuantity(product.quantity || 1);
            setPrice(product.price);

        } else {
            setName('');
            setDescription('')
            setImage('');
            setCategory('');
            setQuantity(1)
            setPrice('');
            const newId = lastId + 1;
            const picsumUrl = `https://picsum.photos/id/${newId}/300/200`;
            setImage(picsumUrl);
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
            quantity: Number(quantity),
            price: Number(price),
        };

        const InputErrors = {
            //si el name sin espacios es  ugual  a '', hay un error
            name: name.trim() === '',
            category: category.trim() === '',
            //si el numero es menor a 0  o no ingresa un numero, hay error
            quantity: Number(quantity) <= 0 || isNaN(quantity),
            price: Number(price) <= 0 || isNaN(price)
        };

        setErrors(InputErrors);

        //Objects.values() Convierte el objeto en un arreglo de sus valoresn y busca con .some()si alguno es true        
        const hasErrors = Object.values(InputErrors).some(Boolean);

        if (hasErrors) return;

        try {
            if (product) {
                // si hay un producto  se edita
                await update(product.id, newProduct);
                onSave("update");
            } else {
                // si no hay producto se crea uno nuevo
                await create(newProduct);
                onSave("create");
            }
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
                        {/* Nombre */}
                        <Form.Group controlId="formName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="nombre del producto"
                                value={name}
                                onChange={e => {
                                    setName(e.target.value);
                                    if (errors.name && e.target.value.trim() !== '') {
                                        setErrors(prev => ({ ...prev, name: false }));
                                    }
                                }}
                                isInvalid={errors.name}

                            />
                            <Form.Control.Feedback type="invalid">
                                El nombre es obligatorio.
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Descripción */}
                        <Form.Group controlId="formDescription">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="descripción del producto"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        {/* Imagen */}
                        <Form.Group controlId="formImage">
                            <Form.Label>URL Imagen</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="URL imagen"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />
                        </Form.Group>

                        {/* Categoría */}
                        <Form.Group controlId="formCategory" className="mt-3">
                            <Form.Label>Categoría</Form.Label>
                            <div className="w-75">
                                <DropdownCategory category={category} onSelectCategory={handleSelectCategory} className={`form-control ${errors.category ? 'is-invalid' : ''}`} />
                                {errors.category && (
                                    <div className="invalid-feedback d-block">
                                        La categoría es obligatoria.
                                    </div>
                                )}
                            </div></Form.Group>

                        {/* Cantidad */}
                        <Form.Group controlId="formQuantity">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control
                                type="number"
                                value={quantity}
                                onChange={e => {
                                    setQuantity(e.target.value);
                                    if (errors.quantity && Number(e.target.value) > 0) {
                                        setErrors(prev => ({ ...prev, quantity: false }));
                                    }
                                }}
                                isInvalid={errors.quantity}
                            />
                            <Form.Control.Feedback type="invalid">
                                La cantidad debe ser mayor que 0.
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Precio */}
                        <Form.Group controlId="formPrice">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={e => {
                                    setPrice(e.target.value);
                                    if (errors.price && Number(e.target.value) > 0) {
                                        setErrors(prev => ({ ...prev, price: false }));
                                    }
                                }}
                                isInvalid={errors.price}
                            />
                            <Form.Control.Feedback type="invalid">
                                El precio debe ser mayor que 0.
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Botones */}
                        <div className="d-flex justify-content-end mt-4 gap-3">
                            <Button variant="primary" type="submit">
                                {product ? "editar" : "agregar"}
                            </Button>
                            <Button variant="secondary" onClick={onHide}>
                                cancelar
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal >
        </>
    );
}


