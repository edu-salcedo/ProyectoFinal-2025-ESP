
import Header from './components/header/Header'
import Products from './pages/product/Products'
import Home from './pages/home/Home'
import Footer from './components/Footer'
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile'
import Cart from './pages/cart/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import DetailsProduct from './pages/product/DetailsProduct'
import ProductList from './pages/admin/manageProduct/ProductList'


import { ToastContainer } from 'react-toastify';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'


function App() {
  return (
    <>
      <Helmet>
        <title>Mi Tienda Online</title>
        <meta name="description" content="Compra los mejores productos al mejor precio" />
      </Helmet>
      <CartProvider>
        <AuthProvider className='app-cont'>
          <Router>
            <div className='app-cont'>
              <div className='app-container'>
                <Header />
                <Routes>
                  <Route path='/' element={<Home />} />

                  <Route path='/productos' element={<Products />} />
                  <Route path='/productos/categoria' element={<Products />} />
                  <Route path='/producto/:id' element={<DetailsProduct />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/carrito' element={<Cart />} />



                  <Route path='/perfil' element={

                    <ProtectedRoute> <Profile /></ProtectedRoute>
                  }>
                  </Route>
                  <Route path='/lista-productos' element={

                    <ProtectedRoute> <ProductList /></ProtectedRoute>
                  }>
                  </Route>

                </Routes>
                <Footer></Footer>

              </div>
            </div>
          </Router>
        </AuthProvider>
      </CartProvider >
      <ToastContainer />
    </>
  )
}

export default App
