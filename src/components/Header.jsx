

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import './header.css'
import { UseCart } from '../hooks/useCart';


function Header() {

    const navigate = useNavigate()
    const isAuth = localStorage.getItem('auth') === 'true'
    const logOut = () => {
        localStorage.removeItem('auth')
        navigate('/login')
    }

    const { cart } = UseCart()
    const totalQuantity = cart.reduce((acu, product) => acu + product.quantity, 0)

    return (
        <Navbar expand="lg" className="bg-body-tertiary px-5 ">
            <Container fluid>
                <Navbar.Brand> <Nav.Link as={Link} to="/">Ecommerce</Nav.Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" >
                    <Nav className="w-75 justify-content-around" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active" : ""}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/products" className={location.pathname === "/products" ? "active" : ""}>Productos</Nav.Link>
                        {

                            isAuth && (
                                <>
                                    <Nav.Link as={Link} to="/profile/edusalcedo" > Perfil</Nav.Link>
                                    <Nav.Link as={Link} to="/admin"> Admin</Nav.Link>
                                </>
                            )
                        }
                    </Nav>

                    <Nav className='w-25 justify-content-around'>
                        {
                            !isAuth ? (
                                <Nav.Link as={Link} to="/login" className={location.pathname === "/login" ? "active" : ""}> Login</Nav.Link>
                            ) : (
                                <Button variant='' onClick={logOut} className=''> Salir</Button>
                            )
                        }
                        <Nav.Link as={Link} to="/cart">
                            <button type="button" class="btn btn-primary position-relative">
                                <i className="bi bi-cart4"> </i>
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                                    {totalQuantity}
                                </span>
                            </button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;