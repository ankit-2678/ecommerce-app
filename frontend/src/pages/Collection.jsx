import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import useScrollReveal from '../hooks/useScrollReveal';

function Collection() {
  const { products,search,showSearch } = useContext(ShopContext);
  const [showFilter, setshowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType,setSortType]=useState('relavent')
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [gridRef, isGridRevealed] = useScrollReveal();

  useEffect(() => {
    setIsPageLoaded(true)
    window.scrollTo(0, 0)
  }, [])

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

 useEffect(() => {
  let productsCopy = products.slice();

  if(showSearch && search){
    productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
  }

  // FILTER
  if (category.length > 0) {
    productsCopy = productsCopy.filter(item =>
      category.includes(item.category)
    );
  }

  if (subCategory.length > 0) {
    productsCopy = productsCopy.filter(item =>
      subCategory.includes(item.subCategory)
    );
  }

  // SORT
  if (sortType === 'low-high') {
    productsCopy = [...productsCopy].sort((a, b) => a.price - b.price);
  } else if (sortType === 'high-low') {
    productsCopy = [...productsCopy].sort((a, b) => b.price - a.price);
  }

  setFilterProducts(productsCopy);

}, [category, subCategory, sortType, products,search,showSearch]);

  

  return (
    <div className={`page-transition ${isPageLoaded ? 'fade-in' : 'opacity-0'} flex flex-col sm:flex-row gap-1 sm:gap-10 mt-5 border-t`}>
      {/* filter option*/}
      <div className='min-w-60'>
        <p onClick={() => (setshowFilter(!showFilter))} className='my-2 text-xl flex items-center cursor-pointer gap-2 text-(--text) hover:text-(--neon-accent) transition-colors duration-200'>
          FILTERS
          <img className={`h-3 sm:hidden transition-transform duration-300 ${showFilter ? 'rotate-90' : ' '}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/*cateogry filter*/}
        <div className={`backdrop-blur-md bg-(--surface)/80 dark:bg-(--surface-elevated)/90 border border-(--border) rounded-2xl p-6 mt-6 shadow-glass-sm ${showFilter ? '' : 'hidden'} sm:block transition-all duration-300`}>
          <p className='mb-4 text-sm font-semibold text-(--text) uppercase tracking-wide'>Categories</p>
          <div className='flex flex-col gap-3 text-sm font-light'>
            <label className='flex items-center gap-3 cursor-pointer group'>
              <input
                className='w-4 h-4 accent-(--neon-accent) rounded border-(--border) transition-all duration-200 cursor-pointer hover:scale-110'
                type="checkbox"
                value={'Men'}
                onChange={toggleCategory}
              />
              <span className='text-(--text) group-hover:text-(--neon-accent) transition-colors duration-200'>Men</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer group'>
              <input
                className='w-4 h-4 accent-(--neon-accent) rounded border-(--border) transition-all duration-200 cursor-pointer hover:scale-110'
                type="checkbox"
                value={'Women'}
                onChange={toggleCategory}
              />
              <span className='text-(--text) group-hover:text-(--neon-accent) transition-colors duration-200'>Women</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer group'>
              <input
                className='w-4 h-4 accent-(--neon-accent) rounded border-(--border) transition-all duration-200 cursor-pointer hover:scale-110'
                type="checkbox"
                value={'Kids'}
                onChange={toggleCategory}
              />
              <span className='text-(--text) group-hover:text-(--neon-accent) transition-colors duration-200'>Kids</span>
            </label>
          </div>
        </div>

        {/*subcateogry Filter*/}
        <div className={`backdrop-blur-md bg-(--surface)/80 dark:bg-(--surface-elevated)/90 border border-(--border) rounded-2xl p-6 my-6 shadow-glass-sm ${showFilter ? '' : 'hidden'} sm:block transition-all duration-300`}>
          <p className='mb-4 text-sm font-semibold text-(--text) uppercase tracking-wide'>Type</p>
          <div className='flex flex-col gap-3 text-sm font-light'>
            <label className='flex items-center gap-3 cursor-pointer group'>
              <input
                className='w-4 h-4 accent-(--neon-accent) rounded border-(--border) transition-all duration-200 cursor-pointer hover:scale-110'
                type="checkbox"
                value={'Topwear'}
                onChange={toggleSubCategory}
              />
              <span className='text-(--text) group-hover:text-(--neon-accent) transition-colors duration-200'>Topwear</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer group'>
              <input
                className='w-4 h-4 accent-(--neon-accent) rounded border-(--border) transition-all duration-200 cursor-pointer hover:scale-110'
                type="checkbox"
                value={'Bottomwear'}
                onChange={toggleSubCategory}
              />
              <span className='text-(--text) group-hover:text-(--neon-accent) transition-colors duration-200'>Bottomwear</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer group'>
              <input
                className='w-4 h-4 accent-(--neon-accent) rounded border-(--border) transition-all duration-200 cursor-pointer hover:scale-110'
                type="checkbox"
                value={'Winterwear'}
                onChange={toggleSubCategory}
              />
              <span className='text-(--text) group-hover:text-(--neon-accent) transition-colors duration-200'>Winterwear</span>
            </label>
          </div>
        </div>
      </div>

      {/*right side */}

      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}

          <select onChange={(e)=>(setSortType(e.target.value))} className='backdrop-blur-md bg-(--surface)/80 dark:bg-(--surface-elevated)/90 border border-(--border) rounded-xl px-4 py-2 text-sm text-(--text) shadow-glass-sm hover:shadow-glass-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-(--neon-accent)/50 focus:border-(--neon-accent)' >
            <option value="relavent">Sort by : Relavent</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>

        </div>

        {/* map products */}
        <div ref={gridRef} className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-8 reveal-fade-up ${isGridRevealed ? 'revealed' : ''}`}>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} index={index} />
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default Collection
