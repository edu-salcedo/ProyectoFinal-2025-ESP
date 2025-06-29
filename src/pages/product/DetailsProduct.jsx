
import { useEffect, useState } from "react"
import { Card, Spinner } from 'react-bootstrap';
import { useApi } from '../../hooks/useApi';
import { useParams } from 'react-router-dom';
import "./productStyle.css"

const API_URL = 'https://6855d6011789e182b37c719b.mockapi.io/api/v1/products';

function DetailsProduct() {
    const { id } = useParams();
    const { data: product, loading, error } = useApi(`${API_URL}/${id}`);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>No se encontró el producto</p>;

    return (
        <><div className="container-fluid p-4">
            <div className="row row-cols-1 row-cols-sm-2 ">
                <div className="col img-container">
                    <img src={product.image} className='product-img'></img>
                </div>
                <div className="col details-content">
                    <h4>{product.name}</h4>
                    <p className='price-product'> $ {product.price}</p>
                    <p>{product.description}</p>
                </div>

            </div>
        </div>

        </>
    )
}

export default DetailsProduct