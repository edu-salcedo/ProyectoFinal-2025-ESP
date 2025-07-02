

import { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import ProductModalForm from './ProductModalForm'
import ConfirmModal from '../../../components/modal/ConfirmModal';
import { useApi } from '../../../hooks/useApi';
const API_URL = 'https://6855d6011789e182b37c719b.mockapi.io/api/v1/products';

export default function ProductList() {

  const [updateProduct, setUpdateProduct] = useState(null);
  const [showModalForm, setShowModalForm] = useState(false);
  const [ShowModalConfirm, setShowModalConfirm] = useState(false);
  const [idItem, setIdItem] = useState();

  const { data: productList, loading, error, remove, refetch } = useApi(API_URL);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!productList) return <p>No se encontró el producto</p>;


  const handleCreate = () => {
    setUpdateProduct(null);
    setShowModalForm(true);
  };

  const handleUpdate = (product) => {
    setUpdateProduct(product);
    setShowModalForm(true);
  };

  const handleDelete = async () => {
    try {
      await remove(idItem);

    } catch (err) {
      console.error('Error al eliminar producto:', err.message);
    }
    refetch();
    setShowModalConfirm(false)
  };

  const hadleSave = () => {
    refetch();
    setShowModalForm(false);
    setUpdateProduct(null);
  }
  const handleFormClose = () => {
    setUpdateProduct(null);
    setShowModalForm(false);

  };

  return (
    <div>
      <h2>Productos</h2>
      <Button variant="primary" className="mb-3" onClick={handleCreate}>
        Agregar Producto
      </Button>
      <ProductModalForm product={updateProduct} show={showModalForm} onHide={handleFormClose} onSave={hadleSave} />

      <Table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Id</th>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col"></th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id} className=''>
              <td>{product.id}</td>
              <th scope=""><img src={product.image} className='cart-img' alt="" /></th>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td className='text-center'>
                <Button variant='info' className='btn-quantity ' onClick={() => { handleUpdate(product) }}  ><i className="bi bi-pencil"></i></Button>
                <Button variant='danger' className='btn-quantity ' onClick={() => { setShowModalConfirm(true); setIdItem(product.id) }}  ><i className="bi bi-trash3"></i></Button>
              </td>
              <td>${(product.price * product.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmModal
        show={ShowModalConfirm}
        tittle="cuidado!!!"
        message="estas seguro que quieres eliminar el producto"
        confirmText="eliminar"
        onConfirm={handleDelete}
        onHide={() => setShowModalConfirm(false)}

      />
    </div>
  )
}



