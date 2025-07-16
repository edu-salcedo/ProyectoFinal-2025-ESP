
import { UseCart } from '../../hooks/UseCart'
import Button from 'react-bootstrap/Button'
import './cart.css'

export default function Cart() {
    const { cart, clearCart, addProductQuantity, restProductQuantity, removeProduct, sumTotal } = UseCart()

    const handleAddQuantity = (idProduct) => {
        addProductQuantity(idProduct)
    }
    const handleRestQuantity = (idProduct) => {
        restProductQuantity(idProduct)
    }

    const handleRemoveProduct = (idProduct) => {
        removeProduct(idProduct)
    }
    return (
        <div className='container mt-5 text-center'>
            {cart.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 ">

                    <div className='col-md-8 d-flex justify-content-between align-items-center mb-3 flex-column'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">cantidad</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((product) => (


                                    <tr key={product.id} className=''>
                                        <th scope=""><img src={product.image} className='cart-img' alt="" /></th>
                                        <td>{product.name}</td>
                                        <td>${product.price.toFixed(2)}</td>
                                        <td>{product.quantity}</td>
                                        <td className='text-center'>
                                            <Button variant='secondary' className='btn-quantity' onClick={() => { handleRestQuantity(product.id) }}  ><i className="bi bi-dash-lg"></i></Button>
                                            <Button variant='secondary' className='btn-quantity mx-2' onClick={() => { handleAddQuantity(product.id) }} ><i className="bi bi-plus-lg"></i></Button>
                                            <Button variant='danger' className='btn-quantity ' onClick={() => { handleRemoveProduct(product.id) }}  ><i className="bi bi-trash3"></i></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className='btn btn-danger' onClick={() => { clearCart() }}>vaciar carrito</button>
                    </div>
                    <div className='col-md-4  p-4 border border-secondary  rounded mt-3'>
                        <h4>Resumen del pedido</h4>
                        <hr />
                        <p className='fs-5 my-4'>Total a pagar: <strong>${sumTotal().toFixed(2)}</strong></p>
                        <Button variant='success'>Finalizar compra</Button>
                    </div>
                </div>
            ) : (
                <h3 className='text-center'>el carrito esta vacío</h3>
            )}
        </div>
    )
}


