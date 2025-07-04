
import { Form, Col, Row, Spinner, Dropdown } from 'react-bootstrap';
import { useEffect, useState } from "react"
import { UseCart } from '../../hooks/UseCart';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard'
import ConfirmModal from '../../components/modal/ConfirmModal';
import { useApi } from '../../hooks/useApi';
import { useSearchParams } from 'react-router-dom';
const API_URL = 'https://6855d6011789e182b37c719b.mockapi.io/api/v1/products';
//rfc
function Products() {
    const navigate = useNavigate();
    const { addToCart } = UseCart();
    const [products, setProducts] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams] = useSearchParams();

    const category = searchParams.get('categoria');

    const { data: productList, loading, error } = useApi(API_URL);
    // useApi para traer todos los productos de la API

    useEffect(() => {
        if (productList) {
            setProducts(productList);
            setFilteredProducts(productList);
            if (category) {
                const filtered = products.filter(product =>
                    product.category.toLowerCase() === category.toLowerCase()
                );
                setFilteredProducts(filtered);
            }
        }
    }, [productList, category]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    }

    const handleDetailProduct = (idItem) => {
        navigate(`/producto/${idItem}`);
    }
    const handleAddToCart = (product) => {
        addToCart(product);
        setModalShow(true);
    }
    const handleGoToCart = () => {
        navigate("/carrito");
    }

    const handleSelectCategory = (selectedCategory) => {
        setSearchTerm('');

        const filtered = products.filter(product =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()

        );
        setFilteredProducts(filtered);
        navigate(`/productos?categoria=${selectedCategory}`);
    }

    if (loading) return <div className='text-center pt-5'><Spinner animation="border" variant="primary" /></div>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Row className='w-100 mt-3 p-0'>
                <Col xs={12} md={2} lg={3} className=' border rounded-2 border-dark-subtle'>

                    <Form className="p-3 m-auto w-100">
                        <Form.Control
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                    </Form >

                    <Dropdown onSelect={handleSelectCategory}>
                        <Dropdown.Toggle variant="light" className='w-100'>
                            Seleccioná una categoría
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='w-100'>
                            <Dropdown.Item eventKey="Moda">Moda</Dropdown.Item>
                            <Dropdown.Item eventKey="herramientas">Herramientas</Dropdown.Item>
                            <Dropdown.Item eventKey="televisores">Televisores</Dropdown.Item>
                            <Dropdown.Item eventKey="climatización">Climatización</Dropdown.Item>
                            <Dropdown.Item eventKey="notebooks">Notebooks</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

                <Col xs={12} md={10} lg={9} className='text-center'>
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

                </Col>
            </Row>



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