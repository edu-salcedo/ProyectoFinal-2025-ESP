import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './Mycard.css'

function MyCard({ title, image, description }) {

    return (
        <>

            <Card style={{ width: '16rem', height: '20rem' }} className='card'>
                <Card.Img src={image} className='cardimg' />
                <Card.Body className='text-center '>
                    <div>
                        <Card.Title className='cardtitle'>{title}</Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </div>
                    <Button variant="primary" className='w-50'>buy</Button>
                </Card.Body>
            </Card>


        </>
    );
}

export default MyCard;