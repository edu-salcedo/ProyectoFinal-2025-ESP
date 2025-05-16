
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MyCard from '../components/MyCard';
import { useEffect, useState } from "react"
import { Spinner } from 'react-bootstrap';
import spinner from "../assets/spinner.svg"

function Products() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/')
            .then(response => response.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(err => {
                console.error("Error de carga de API", err);
            })

    }, []);



    return (
        <>
            {
                loading ? (<div className='text-center pt-5'><Spinner animation="border" variant="primary" /></div>) : (

                    <Row className='m-3 gap-4'>
                        {products.map(product => (

                            <Col key={product.id}>
                                <MyCard title={product.title} image={product.image} description={product.description} />
                            </Col>
                        ))}

                    </Row>)
            }
        </>
    )
}

export default Products