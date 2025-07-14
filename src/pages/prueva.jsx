
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function TestForm() {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({ name: false });

    const handleSubmit = (e) => {
        e.preventDefault();
        const hasError = name.trim() === '';
        setErrors({ name: hasError });
        if (!hasError) alert('Formulario válido');
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isInvalid={errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        El nombre es obligatorio.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit">Enviar</Button>
            </Form>
        </>
    );
}