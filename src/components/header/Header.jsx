import { Button, Container, Nav, Navbar } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { UseCart } from '../../hooks/UseCart';
import { UseAuth } from '../../hooks/UseAuth';

import './headerStyle.css';

function Header() {
    const { user, logout } = UseAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const { cart } = UseCart()
    const totalQuantity = cart.reduce((acu, product) => acu + product.quantity, 0)

    const handleCartClick = () => {
        if (user) {
            navigate('/carrito');
        } else {
            toast.warn('Inicia sesión para ver al carrito', {
                position: 'top-right',
                autoClose: 3000,
            });
            navigate('/login');
        }
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary px-5 sticky-top" >
            <Container fluid>
                <Navbar.Brand> <Nav.Link as={Link} to="/">E-commerce</Nav.Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" >
                    <Nav className="w-75 justify-content-around" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "actives" : ""}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/productos" className={location.pathname === "/products" ? "actives" : ""}>Productos</Nav.Link>
                        {

                            user && (
                                <>
                                    <Nav.Link as={Link} to="/lista-productos">administrar productos</Nav.Link>
                                </>
                            )
                        }
                    </Nav>

                    <Nav className='w-25 justify-content-around'>
                        {
                            !user ? (
                                <Nav.Link as={Link} to="/login" className={location.pathname === "/login" ? "active" : ""}> Login</Nav.Link>
                            ) : (
                                <Button variant='' onClick={handleLogout} className=''> Salir</Button>
                            )
                        }
                        <Nav.Link onClick={handleCartClick}>
                            <button type="button" className="btn btn-primary position-relative">
                                <i className="bi bi-cart4"> </i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
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