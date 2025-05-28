import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './Mycard.css'

function MyCard({ id, title, price, image, addToCart, handleDetail }) {

    return (
        <>
            <Card style={{ width: '16rem', height: '21rem' }}>
                <Card.Img src={image} className='cardimg' onClick={handleDetail} />
                <Card.Body className='CardBody'>
                    <Card.Title className='cardtitle '>{title}</Card.Title>
                    <Card.Subtitle> $ {price}</Card.Subtitle>
                    <Button variant="primary" onClick={addToCart} className='w-50'>carrito</Button>

                </Card.Body>
            </Card >
        </>
    );
}

export default MyCard;