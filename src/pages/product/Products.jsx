
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MyCard from '../../components/MyCard'
import { useEffect, useState } from "react"
import { Spinner } from 'react-bootstrap';
import { UseCart } from '../../hooks/UseCart';
import { useNavigate } from 'react-router-dom';
import ModalWindow from '../../components/modal/ModalWindow';
//rfc
function Products() {
    const navigate = useNavigate()
    const { addToCart } = UseCart()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [modalShow, setModalShow] = useState(false);
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
    const handleAdd = (product) => {

        addToCart(product)
        setModalShow(true)
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

            <ModalWindow show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}

export default Products