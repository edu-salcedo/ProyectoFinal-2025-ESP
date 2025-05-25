
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';


function Header() {

    const navigate = useNavigate()
    const isAuth = localStorage.getItem('auth') === 'true'
    const logOut = () => {
        localStorage.removeItem('auth')
        navigate('/login')
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary px-5 ">
            <Container fluid>
                <Navbar.Brand href="#">E-commerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" >
                    <Nav className="w-75 justify-content-around" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>
                        <Nav.Link as={Link} to="/contact"> Contact</Nav.Link>
                        {
                            isAuth && (
                                <>
                                    <Nav.Link as={Link} to="/profile/edusalcedo"> Profile</Nav.Link>
                                    <Nav.Link as={Link} to="/admin"> Admin</Nav.Link>
                                </>
                            )
                        }
                    </Nav>

                    <Nav>
                        {
                            !isAuth ? (
                                <Nav.Link as={Link} to="/login"> Login</Nav.Link>
                            ) : (
                                <Button variant='' onClick={logOut}> log out</Button>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;