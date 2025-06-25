import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

import './productStyle.css'
function ProductCard({ id, name, price, image, handleAdd, handleDetail }) {

    return (
        <>
            <Card style={{ width: '16rem', height: '21rem' }}>
                <Card.Img src={image} className='cardimg' onClick={handleDetail} />
                <Card.Body className='CardBody'>
                    <Card.Title className='cardtitle '>{name}</Card.Title>
                    <Card.Subtitle> $ {price}</Card.Subtitle>
                    <Button variant="primary" onClick={handleAdd} className='w-75 mt-2'>Agregar</Button>

                </Card.Body>
            </Card >
        </>
    );
}

export default ProductCard;