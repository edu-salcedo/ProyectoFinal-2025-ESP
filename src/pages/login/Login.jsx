
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./login.css"
import { useNavigate } from 'react-router-dom';
function Login() {

    const navigate = useNavigate()
    const handleLogin = () => {
        localStorage.setItem('auth', 'true')
        navigate('/profile/edusalcedo')
    }
    return (
        <div className='form-container' >
            <Form className='bg-login'>
                <Form.Group className="mb-3">
                    <Form.Label>User</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Im not a robot" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleLogin} className='w-50 mx-auto mt-4'>
                    log in
                </Button>
            </Form>
        </div>
    );
}

export default Login;