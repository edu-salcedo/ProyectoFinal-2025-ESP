
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MyCard from '../../components/MyCard'
import { useEffect, useState } from "react"
import { Spinner } from 'react-bootstrap';
import { UseCart } from '../../hooks/UseCart';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmModal from '../../components/modal/ConfirmModal';

const API_URL = 'https://6855d6011789e182b37c719b.mockapi.io/api/v1/products';
//rfc
function Products() {
    const navigate = useNavigate()
    const { addToCart } = UseCart()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [modalShow, setModalShow] = useState(false);



    const fetchProducts = () => {
        axios.get(API_URL)
            .then(res => { setProducts(res.data); setLoading(false); })
            .catch(console.error);
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDetail = (idItem) => {
        console.log(idItem)
        navigate(`/product/${idItem}`)
    }
    const handleAdd = (product) => {
        addToCart(product)
        setModalShow(true)
    }
    const handleAddToCart = () => {
        navigate("/cart")
    }

    return (
        <>
            {error ? (<p>{error}</p>) : (
                loading ? (<div className='text-center pt-5'><Spinner animation="border" variant="primary" /></div>) : (

                    <Row className='p-3 gap-4 w-100'>

                        {products.map(product => (
                            <Col key={product.id} className=' d-flex justify-content-center'>
                                <MyCard {...product} handleAdd={() => { handleAdd(product) }} handleDetail={() => { handleDetail(product.id) }} />
                            </Col>
                        ))}
                    </Row>)


            )}

            <ConfirmModal
                show={modalShow}
                tittle="Agregar al carrito"
                message="Agregaste al carrito"
                confirmText="ir al carrito"
                onConfirm={handleAddToCart}
                onHide={() => setModalShow(false)}

            />
        </>
    )
}

export default Products