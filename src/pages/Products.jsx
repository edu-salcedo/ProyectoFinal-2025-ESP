
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MyCard from '../components/MyCard';
import { useEffect, useState } from "react"

function Products() {

    const [product, setProduct] = useState([])

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/')
            .then(response => response.json())
            .then(data => {
                setProduct(data)

            })
            .catch(err => {
                console.error("Error de carga de API", err);
            })

    }, []);



    return (
        <>
            <Row>
                {product.map(pro => (

                    <div key={pro.id}>
                        <MyCard title={pro.title} image={pro.image} description={pro.description} />
                    </div>
                ))}

            </Row>

        </>
    )
}

export default Products