
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MyCard from '../../components/MyCard'
import { useEffect, useState } from "react"
import { Spinner } from 'react-bootstrap';
import { UseCart } from '../../hooks/UseCart';
import { useNavigate } from 'react-router-dom';

function Products() {
    const navigate = useNavigate()
    const { addToCart, cart } = UseCart()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        fetch('https://fakestoreapi.com/products/')
            .then(response => response.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                console.log(err)
            })

    }, []);

    const handleDetail = (idItem) => {
        console.log(idItem)
        navigate(`/product/${idItem}`)
    }

    return (
        <>

            {cart.length > 0 && (
                <div className='text-center'>
                    <button className='btn btn-primary' onClick={() => navigate('/cart')}>Cart {cart.length}</button>

                </div>

            )}


            {error ? (<p>{error}</p>) : (
                loading ? (<div className='text-center pt-5'><Spinner animation="border" variant="primary" /></div>) : (

                    <Row className='m-3 gap-4'>
                        {products.map(product => (
                            <Col key={product.id}>
                                <MyCard {...product} addToCart={() => { addToCart(product) }} handleDetail={() => { handleDetail(product.id) }} />
                            </Col>
                        ))}
                    </Row>)
            )}
        </>
    )
}

export default Products