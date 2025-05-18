
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleLogin} className='w-50 mx-auto mt-4'>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Login;