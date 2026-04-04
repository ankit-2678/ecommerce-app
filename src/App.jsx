import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, About, Collection,Cart, Contact, Product, Orders, Login, PlaceOrder } from './pages'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
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
      </Routes>

      <Footer/>


    </div>
  )
}

export default App
