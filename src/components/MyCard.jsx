import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './Mycard.css'
import { use } from 'react';

function MyCard({ id, title, price, image }) {
    const navigate = useNavigate()

    const handleDetail = (idItem) => {
        console.log(id)
        navigate(`/product/${idItem}`)
    }

    return (
        <>
            <Card style={{ width: '16rem', height: '21rem' }}>
                <Card.Img src={image} className='cardimg' onClick={() => handleDetail(id)} />
                <Card.Body className='CardBody'>
                    <Card.Title className='cardtitle '>{title}</Card.Title>
                    <Card.Subtitle> $ {price}</Card.Subtitle>
                    <Button variant="primary" className='w-50'>buy</Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default MyCard;