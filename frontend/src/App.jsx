import React from 'react'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom'
import { Home, About, Collection,Cart, Contact, Product, Orders, Login, PlaceOrder,Verify } from './pages'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart/> } />
        <Route path='/collection' element={ <Collection/>} />
        <Route path='/about' element={ <About/>} />
        <Route path='/contact' element={<Contact/> } />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/orders' element={<Orders/> } />
        <Route path='/login' element={ <Login/>} />
        <Route path='/place-order' element={ <PlaceOrder/>} />
        <Route path='/verify' element={ <Verify/>} />

      </Routes>

      <Footer/>


    </div>
  )
}

export default App
