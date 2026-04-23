import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom'
import { Home, About, Collection, Cart, Contact, Product, Orders, Login, PlaceOrder, Verify,Profile } from './pages'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false
    const savedTheme = window.localStorage.getItem('theme')
    if (savedTheme) return savedTheme === 'dark'
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleToggleTheme = () => setDarkMode(prev => !prev)

  return (
    <div className='app-shell min-h-screen bg-(--bg) text-(--text) px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] transition-colors duration-500'>
      <ToastContainer />
      <Navbar darkMode={darkMode} onThemeToggle={handleToggleTheme} />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/profile' element={<Profile />} />

      </Routes>

      <Footer />


    </div>
  )
}

export default App
