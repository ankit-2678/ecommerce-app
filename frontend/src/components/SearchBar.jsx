import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from "../context/ShopContext"
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'
function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible,setVisible] = useState(false);
  const location = useLocation();
  useEffect(()=>{
    if(location.pathname.includes('collection')){
      setVisible(true)
    }else{
      setVisible(false)
    }
  },[location])

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 dark:bg-(--surface) dark:border-subtle text-center'>
      <div className='search-container inline-flex items-center justify-center border border-gray-400 dark:border-(--border) dark:bg-(--surface-elevated) dark:shadow-soft-sm px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 group'>
        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className='search-input flex-1 outline-none bg-inherit dark:bg-(--surface-elevated) dark:text-(--text) text-sm placeholder-gray-500 dark:placeholder-(--muted) transition-all duration-300 focus:placeholder-(--neon-accent)/70'
          type="text"
          placeholder='Search products...'
        />
        <img className='search-icon w-4 ml-2 transition-transform duration-200 group-hover:scale-110 group-focus-within:scale-110' src={assets.search_icon} alt="" />

      </div>
      <img onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer hover:scale-110 transition-transform duration-200 ml-2' src={assets.cross_icon} alt="" />

    </div>
  ) : null
}

export default SearchBar
