import { Table, Button, Spinner, Form, Row } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';


import { useApi } from '../../../hooks/useApi';

import ProductModalForm from './ProductModalForm'
import ConfirmModal from '../../../components/modal/ConfirmModal';
import DropdownCategory from '../../../components/Dropdown';
import PaginationIU from '../../../components/Pagination';



const API_URL = 'https://6855d6011789e182b37c719b.mockapi.io/api/v1/products';

export default function ProductList() {

  const [updateProduct, setUpdateProduct] = useState(null);
  const [showModalForm, setShowModalForm] = useState(false);
  const [ShowModalConfirm, setShowModalConfirm] = useState(false);
  const [idItem, setIdItem] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //contante para definir la cantidad de productos por página
  const productsPerPage = 8;



  const { data: productList, loading, error, remove, refetch } = useApi(API_URL);

  useEffect(() => {
    if (productList) {
      setProducts(productList);
      setFilteredProducts(productList);
    }
  }, [productList]);


  //
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
      toast.info("se elimino el producto")

    } catch (err) {
      console.error('Error al eliminar producto:', err.message);
    }
    refetch();
    setShowModalConfirm(false)
  };

  const handleSave = (action) => {
    refetch();
    setShowModalForm(false);
    setUpdateProduct(null);
    if (action === "create") {
      toast.success("se guardo  el nuevo producto")
    }
    else {
      toast.success("se actualizo el producto")
    }
  }
  const handleFormClose = () => {
    setUpdateProduct(null);
    setShowModalForm(false);

  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  }

  const handleSelectCategory = (selectedCategory) => {
    setSearchTerm('');
    const filtered = products.filter(product =>
      product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
    setFilteredProducts(filtered);

  }

  // Calculamos los índices de los productos a mostrar en la página actual
  // se multiplica la página actual por la cantidad de productos por página
  const indexOfLastProduct = currentPage * productsPerPage;
  // se resta la cantidad de productos por página al índice del último producto
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // se obtiene el array de productos filtrados y se le aplica el método slice para obtener los productos de la página actual
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  if (loading) return <div className='text-center pt-5'><Spinner animation="border" variant="primary" /></div>;
  if (error) return <p>{error}</p>;
  if (!productList) return <p>No se encontró el producto</p>;


  return (
    <>
      <div className='container d-flex justify-content-around flex-wrap my-4 '>
        <Button variant="primary" onClick={handleCreate}>
          Agregar Producto
        </Button>

        <Form className="">
          <Form.Control
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleInputChange}
          />
        </Form >
        {filteredProducts.length < productList.length && (
          <Button variant='info' onClick={() => refetch()} >Todos los productos</Button>
        )}

        <DropdownCategory onSelectCategory={handleSelectCategory} />
      </div >

      <ProductModalForm product={updateProduct} show={showModalForm} onHide={handleFormClose} onSave={handleSave} />

      <div className='mh-100 px-4' style={{ height: '750px' }}>
        <Table >
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col"></th>
              <th scope="col">Producto</th>
              <th scope="col">Precio</th>
              <th scope="col">cantidad</th>
              <th scope="col">categoria</th>
              <th scope="col"></th>

            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className='text-center py-4 fs-3'>No se encontraron productos</td>
              </tr>
            ) : (
              currentProducts.map((product) => (
                <tr key={product.id} className=''>
                  <td>{product.id}</td>
                  <th scope=""><img src={product.image} className='cart-img' alt="" /></th>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                  <td className='text-center'>
                    <Button variant='info' className='btn-quantity ' onClick={() => { handleUpdate(product) }}  ><i className="bi bi-pencil"></i></Button>
                    <Button variant='danger' className='btn-quantity ' onClick={() => { setShowModalConfirm(true); setIdItem(product.id) }}  ><i className="bi bi-trash3"></i></Button>
                  </td>
                </tr>
              ))
            )
            }
          </tbody>
        </Table >
        {totalPages > 1 && (
          <PaginationIU
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <ConfirmModal
        show={ShowModalConfirm}
        tittle="cuidado!!!"
        message="estas seguro que quieres eliminar el producto"
        confirmText="eliminar"
        onConfirm={handleDelete}
        onHide={() => setShowModalConfirm(false)}
        color={"#dc3545"}  //color danger de bootstrap
      />
    </>
  )
}



