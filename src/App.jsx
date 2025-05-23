
import Products from './pages/product/Products'
import Header from './components/Header'
import Contact from './pages/contact/Contact'
import Home from './pages/home/Home'
import Footer from './components/Footer'
import Login from './pages/login/Login';
import Admin from './pages/admin/Admin'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Profile from './pages/profile/Profile'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return (
    <>
      <Router>
        <div className='app-container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/products' element={<Products />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />

            <Route path='/profile/:id' element={

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
      </Router>
    </>
  )
}

export default App
