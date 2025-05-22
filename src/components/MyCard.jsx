import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './Mycard.css'

function MyCard({ title, image }) {

    return (
        <>
            <Card style={{ width: '16rem', height: '21rem' }}>
                <Card.Img src={image} className='cardimg' />
                <Card.Body className='CardBody'>
                    <Card.Title className='cardtitle '>{title}</Card.Title>
                    <Button variant="primary" className='w-50'>buy</Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default MyCard;