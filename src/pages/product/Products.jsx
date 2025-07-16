
import { Form, Col, Row, Spinner, Button, Container } from 'react-bootstrap';

import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';


import { UseCart } from '../../hooks/UseCart';
import { UseAuth } from '../../hooks/UseAuth';
import { useApi } from '../../hooks/useApi';

import DropdownCategory from '../../components/Dropdown';
import ProductCard from './ProductCard'
import ConfirmModal from '../../components/modal/ConfirmModal';
import PaginationIU from '../../components/Pagination';

const API_URL = 'https://6855d6011789e182b37c719b.mockapi.io/api/v1/products';
//rfc
function Products() {
    const navigate = useNavigate();
    const { user } = UseAuth()
    const { addToCart } = UseCart();
    const [products, setProducts] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    //contante para definir la cantidad de productos por página
    const productsPerPage = 6;

    // useSearchParams para obtener el parámetro de categoría de la URL
    const categoryParam = searchParams.get('categoria');

    const { data: productList, loading, error, refetch } = useApi(API_URL);
    // useApi para traer todos los productos de la API

    useEffect(() => {
        if (productList) {
            setProducts(productList);
            setFilteredProducts(productList);
            if (categoryParam) {
                const filtered = products.filter(product =>
                    product.category.toLowerCase() === categoryParam.toLowerCase()
                );
                setFilteredProducts(filtered);
            }
        }
    }, [productList, categoryParam]);

    //fución para manejar el cambio de input en el campo de búsqueda
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    }

    // función para manejar el clic en el botón de detalle del producto
    const handleDetailProduct = (idItem) => {
        navigate(`/producto/${idItem}`);
    }

    // función para manejar el clic en el botón de agregar al carrito
    const handleAddToCart = (product) => {
        addToCart(product);
        setModalShow(true);
    }

    // función para manejar el clic en el botón de ir al carrito
    const handleGoToCart = () => {
        user ? navigate("/carrito") : navigate("/login");

    }

    // función para manejar la selección de categoría desde el dropdown
    const handleSelectCategory = (selectedCategory) => {
        setSearchTerm('');
        const filtered = products.filter(product =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        setFilteredProducts(filtered);
        navigate(`/productos?categoria=${selectedCategory}`);
    }

    const refresh = () => {
        refetch();
        setFilteredProducts(products); // Mostrar todos
        setSearchTerm('');
        navigate('/productos');
    }


    // Calculamos los índices de los productos a mostrar en la página actual
    // se multiplica la página actual por la cantidad de productos por página
    const indexOfLastProduct = currentPage * productsPerPage;
    // se resta la cantidad de productos por página al índice del último producto
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    // se obtiene el array de productos filtrados y se le aplica el método slice para obtener los productos de la página actual
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    // se calcula el total de páginas dividiendo la cantidad de productos filtrados por la cantidad de productos por página y redondeando hacia arriba
    if (loading) return <div className='text-center pt-5'><Spinner animation="border" variant="primary" /></div>;
    if (error) return <p className=' container text-center my-5 fs-5'>{error}</p>;

    return (
        <>
            <Container>

                <Row >
                    <Col xs={12} md={2} lg={3}>
                        <div className="aside text-center">
                            {filteredProducts.length < productList.length && (
                                <Button variant='info' onClick={() => refresh()} className='my-3'>Todos los productos</Button>
                            )}

                            <Form className="p-3 m-auto w-100">
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar productos..."
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                />
                            </Form >

                            {/* componente  Dropdown para seleccionar categoría */}
                            <h5 className='text-center mt-3'>Categorías</h5>
                            <DropdownCategory category={categoryParam} onSelectCategory={handleSelectCategory} />

                        </div>
                    </Col>

                    <Col xs={12} md={10} lg={9}>
                        <Row className='p-2 p-md-3 gap-md-5'>
                            {currentProducts.length === 0 ? (
                                <p className="text-center w-100 fs-3 pt-5">No se encontraron productos.</p>
                            ) : (
                                currentProducts.map(product => (
                                    <Col key={product.id} className='d-flex justify-content-center'>
                                        <ProductCard
                                            {...product}
                                            handleAdd={() => { handleAddToCart(product) }}
                                            handleDetail={() => { handleDetailProduct(product.id) }}
                                        />
                                    </Col>
                                ))
                            )}
                        </Row>
                        <div className="w-100">

                            {totalPages > 1 && (
                                <PaginationIU
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </div>

                    </Col>
                </Row>
            </Container>

            {/* Modal de confirmación  se agregó al carrito */}
            <ConfirmModal
                show={modalShow}
                tittle="Producto agregado"
                message={user ? "se agrego el prodcuto" : "Iniciá sesión para ver al carrito"}
                confirmText={user ? "ir al carrito" : "Iniciar sesión"}
                onConfirm={handleGoToCart}
                onHide={() => setModalShow(false)}
                color={"green"}
            />
        </>
    )
}

export default Products