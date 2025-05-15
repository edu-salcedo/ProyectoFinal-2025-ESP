import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

function MyCard({ title, image, description }) {

    return (
        <>

            <Card style={{ width: '18rem' }}>
                <Card.Img src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Button variant="primary">buy</Button>
                </Card.Body>
            </Card>


        </>
    );
}

export default MyCard;