import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './productStyle.css'
function ProductCard({ id, name, price, image, handleAdd, handleDetail, category }) {

    return (
        <>
            <Card style={{ width: '16rem', height: '24rem' }} className='bg-succcess'>
                <Card.Img src={image} className='cardimg' onClick={handleDetail} />
                <Card.Body className='CardBody'>
                    <Card.Title className='cardtitle '>{name}</Card.Title>
                    <Card.Text className='cardtext'>{category}</Card.Text>
                    <Card.Subtitle> $ {price}</Card.Subtitle>
                    <Button variant="primary" onClick={handleAdd} className='w-75 mt-2'>Agregar al carrito</Button>
                </Card.Body>
            </Card >
        </>
    );
}

export default ProductCard;