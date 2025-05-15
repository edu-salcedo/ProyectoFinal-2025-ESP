import { useState } from 'react'

import './App.css'
import Products from './pages/Products'
import Navibar from './components/Navibar'
import Contact from './pages/Contact'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <div>
          <Navibar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/products' element={<Products />} />
          </Routes>

        </div>
      </Router>
    </>
  )
}

export default App
