
import Button from '../../components/Button';
import { useState } from 'react';
import { UseAuth } from '../../hooks/UseAuth';
import Form from 'react-bootstrap/Form';
import "./login.css"
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate()
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = UseAuth();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(user, password)) {
            navigate("/profile");
        } else {
            setError("No se encontro en usuario o la contraseña es incorrecta");

        }
    };
    return (
        <div className='form-container' >
            <Form className='bg-login' onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>User</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value={user} onChange={(e) => setUser(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Im not a robot" />
                </Form.Group>
                <Button>iniciar seccion</Button>

                {error && <p className='text-danger bold'>{error}</p>}

            </Form>
        </div>
    );
}

export default Login;