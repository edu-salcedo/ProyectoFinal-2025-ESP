
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MyCard from '../../components/MyCard'
import { useEffect, useState } from "react"
import { Spinner } from 'react-bootstrap';


function Products() {

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



    return (
        <>
            {error ? (<p>{error}</p>) : (
                loading ? (<div className='text-center pt-5'><Spinner animation="border" variant="primary" /></div>) : (

                    <Row className='m-3 gap-4'>
                        {products.map(product => (

                            <Col key={product.id}>
                                <MyCard id={product.id} title={product.title} price={product.price} image={product.image} />
                            </Col>
                        ))}

                    </Row>)
            )}

        </>
    )
}

export default Products