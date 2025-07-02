
import { Form, Col, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from "react"
import { UseCart } from '../../hooks/UseCart';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard'
import ConfirmModal from '../../components/modal/ConfirmModal';
import { useApi } from '../../hooks/useApi';

const API_URL = 'https://6855d6011789e182b37c719b.mockapi.io/api/v1/products';
//rfc
function Products() {
    const navigate = useNavigate();
    const { addToCart } = UseCart();
    const [products, setProducts] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: productList, loading, error } = useApi(API_URL);

    useEffect(() => {
        if (productList) {
            setProducts(productList);
            setFilteredProducts(productList);
        }
    }, [productList]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    }

    const handleDetailProduct = (idItem) => {
        navigate(`/product/${idItem}`);
    }
    const handleAddToCart = (product) => {
        addToCart(product);
        setModalShow(true);
    }
    const handleGoToCart = () => {
        navigate("/cart");
    }
    if (loading) return <div className='text-center pt-5'><Spinner animation="border" variant="primary" /></div>;
    if (error) return <p>{error}</p>;
    return (
        <>

            <>
                <Form className="p-3 w-25 m-auto ">
                    <Form.Control
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                </Form >

                <Row className='p-3 gap-4 w-100'>
                    {filteredProducts.length === 0 ? (
                        <p className="text-center w-100">No se encontraron productos.</p>
                    ) : (

                        filteredProducts.map(product => (
                            <Col key={product.id} className=' d-flex justify-content-center'>
                                <ProductCard
                                    {...product}
                                    handleAdd={() => { handleAddToCart(product) }}
                                    handleDetail={() => { handleDetailProduct(product.id) }}
                                />
                            </Col>
                        ))
                    )}
                </Row>
            </>


            <ConfirmModal
                show={modalShow}
                tittle="Agregar al carrito"
                message="Agregaste al carrito"
                confirmText="ir al carrito"
                onConfirm={handleGoToCart}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default Products