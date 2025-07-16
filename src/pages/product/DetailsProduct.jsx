
import { useEffect, useState } from "react"
import { Spinner } from 'react-bootstrap';
import { UseCart } from '../../hooks/UseCart';
import { useApi } from '../../hooks/useApi';
import { useParams } from 'react-router-dom';
import ConfirmModal from '../../components/modal/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from "../../hooks/UseAuth";
import "./productStyle.css"
import styled from "styled-components";

const API_URL = 'https://6855d6011789e182b37c719b.mockapi.io/api/v1/products';

export default function DetailsProduct() {

    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const { user } = UseAuth()


    const { id } = useParams();
    const { data: product, loading, error } = useApi(`${API_URL}/${id}`);

    const { addToCart } = UseCart();

    const handleAddToCart = () => {

        addToCart(product);
        setModalShow(true);

    }

    const handleGoToCart = () => {
        user ? navigate("/carrito") : navigate("/login");
    }


    if (loading) return <div className='text-center pt-5'><Spinner animation="border" variant="primary" /></div>;
    if (error) return <p className=' container text-center my-5 fs-5'>{error}</p>;
    if (!product) return <p>No se encontró el producto</p>;

    return (
        <>
            <StyledDiv>
                <div className="row row-cols-1 row-cols-sm-2 ">
                    <div className="col  text-center ">
                        <StyledImage src={product.image} alt={product.name} />
                    </div>
                    <div className="col details-content  text-center">
                        <h4>{product.name}</h4>
                        <p className='price-product'> $ {product.price}</p>
                        <p>{product.description}</p>
                        <button className="btn btn-primary w-50 m-auto" onClick={handleAddToCart}>agregar al carrito</button>
                    </div>

                </div>
            </StyledDiv>

            <ConfirmModal
                show={modalShow}
                tittle="Producto agregado"
                message={user ? `Agregaste  ${product.name}  al carrito.` : "Inicia sesión para ver los productos que agregaste al carrito  "}
                confirmText={user ? "ir al carrito" : "iniciar secion"}
                onConfirm={handleGoToCart}
                onHide={() => setModalShow(false)}
                color={"green"}
            />

        </>
    )
}

const StyledDiv = styled.div`
    width: 100%;
    padding: 2rem; 
        
              
`;

const StyledImage = styled.img`
    width: 20rem; 
    margin: auto;
`;
