
import Products from './pages/product/Products'
import Header from './components/header/Header'
import Contact from './pages/contact/Contact'
import Home from './pages/home/Home'
import Footer from './components/Footer'
import Login from './pages/login/Login';
import Admin from './pages/admin/Admin'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Profile from './pages/profile/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import DetailsProduct from './pages/product/DetailsProduct'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Cart from './pages/cart/Cart'
import ProductList from './pages/admin/manageProduct/ProductList'



function App() {
  return (
    <>
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
                  <Route path='/lista-productos' element={<ProductList />} />

                  <Route path='/perfil' element={

                    <ProtectedRoute> <Profile /></ProtectedRoute>
                  }>
                  </Route>
                  <Route path='/admin' element={

                    <ProtectedRoute> <Admin /></ProtectedRoute>
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
