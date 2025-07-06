
import { Form, Col, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from "react"
import { UseCart } from '../../hooks/UseCart';
import { useNavigate } from 'react-router-dom';
import DropdownCategory from '../../components/Dropdown';
import ProductCard from './ProductCard'
import ConfirmModal from '../../components/modal/ConfirmModal';
import PaginationIU from '../../components/Pagination';
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
    const [currentPage, setCurrentPage] = useState(1);
    //contante para definir la cantidad de productos por página
    const productsPerPage = 6;

    // useSearchParams para obtener el parámetro de categoría de la URL
    const categoryParam = searchParams.get('categoria');

    const { data: productList, loading, error } = useApi(API_URL);
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
        navigate("/carrito");
    }

    // función para manejar la selección de categoría desde el dropdown
    // se filtran los productos por la categoría seleccionada
    const handleSelectCategory = (selectedCategory) => {
        setSearchTerm('');
        const filtered = products.filter(product =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        setFilteredProducts(filtered);
        navigate(`/productos?categoria=${selectedCategory}`);
    }


    // Calculamos los índices de los productos a mostrar en la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (loading) return <div className='text-center pt-5'><Spinner animation="border" variant="primary" /></div>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Row className='w-100 mt-3 p-0'>
                <Col xs={12} md={2} lg={3} className=' border rounded-2 border-dark-subtle pt-5'>

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
                </Col>

                <Col xs={12} md={10} lg={9} className='text-center'>
                    <Row className='p-3 gap-4 w-100'>
                        {currentProducts.length === 0 ? (
                            <p className="text-center w-100">No se encontraron productos.</p>
                        ) : (
                            currentProducts.map(product => (
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
                    {totalPages > 1 && (
                        <PaginationIU
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}

                </Col>
            </Row>

            {/* Modal de confirmación  se agregó al carrito */}
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