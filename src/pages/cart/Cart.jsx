import React from 'react'
import { UseCart } from '../../hooks/useCart'
import './cart.css'
export default function Cart() {
    const { cart, clearCart } = UseCart()
    return (
        <div className='container mt-5 text-center'>
            {cart.length > 0 ? (
                <div className='d-flex justify-content-between align-items-center mb-3 flex-column'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product) => (
                                <tr key={product.id}>
                                    <th scope="row"><img src={product.image} className='cart-img' alt="" /></th>
                                    <td>{product.title}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>{product.quantity}</td>
                                    <td>${(product.price * product.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className='btn btn-danger' onClick={() => { clearCart() }}>vaciar carrito</button>
                </div>


            ) : (
                <h3 className='text-center'>el carrito esta vacío</h3>
            )}
        </div>
    )
}


