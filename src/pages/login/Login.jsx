import Form from 'react-bootstrap/Form';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseAuth } from '../../hooks/UseAuth';

import Button from '../../components/Button';

import "./login.css"

export default function Login() {
    const navigate = useNavigate()
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorAuth, setErrorAuth] = useState("");
    const { login } = UseAuth();
    const [errors, setErrors] = useState({ user: false, password: false, auth: false });

    const handleSubmit = (e) => {

        e.preventDefault();
        const InputErrors = {
            //si el name sin espacios es  ugual  a '', hay un error
            user: user.trim() === '',
            password: password.trim() === '',
        };
        setErrors(InputErrors);
        //Objects.values() Convierte el objeto en un arreglo de sus valoresn y busca con .some()si alguno es true        
        const hasErrors = Object.values(InputErrors).some(Boolean);

        if (hasErrors) return;

        if (login(user, password)) {
            navigate("/lista-productos");
        } else {
            setErrorAuth("No se encontro en usuario o la contraseña es incorrecta");

        }
    };
    return (
        <div className='form-container' >
            <Form className='bg-login' onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>User</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        value={user} onChange={(e) => setUser(e.target.value)}
                        isInvalid={errors.user}
                    />
                    <Form.Control.Feedback type="invalid">
                        ingresa el usuario.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="ingrese contraseña"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        isInvalid={errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        ingrese contraseña.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button>iniciar seccion</Button>

                {errorAuth && <p className='text-danger fs-6'>{errorAuth}</p>}

            </Form>
        </div>
    );
}

