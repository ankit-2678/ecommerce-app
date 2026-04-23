import React, { useContext, useState ,useRef,useEffect} from 'react'
import { assets } from "../assets/assets"
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';



function Navbar({ darkMode, onThemeToggle }) {

    const [visible, setVisible] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)
    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        navigate('/login')
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex items-center justify-between py-5'>
            <Link to={`/`}><img src={assets.logo} className='w-36' alt="" /></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className={({ isActive }) => `nav-link flex flex-col items-center gap-1 text-(--text) ${isActive ? 'active' : ''}`}>
                    <p>HOME</p>
                </NavLink>

                <NavLink to='/collection' className={({ isActive }) => `nav-link flex flex-col items-center gap-1 text-(--text) ${isActive ? 'active' : ''}`}>
                    <p>COLLECTION</p>
                </NavLink>

                <NavLink to='/about' className={({ isActive }) => `nav-link flex flex-col items-center gap-1 text-(--text) ${isActive ? 'active' : ''}`}>
                    <p>ABOUT</p>
                </NavLink>

                <NavLink to='/contact' className={({ isActive }) => `nav-link flex flex-col items-center gap-1 text-(--text) ${isActive ? 'active' : ''}`}>
                    <p>CONTACT</p>
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                <button
                    onClick={onThemeToggle}
                    className='p-2 rounded-full border border-(--border) bg-(--surface) transition-all duration-300 hover:scale-110'
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >

                    {/* Sun Icon (for LIGHT mode display) */}
                    <svg
                        className={`w-6 h-6 ${darkMode ? 'hidden' : 'text-yellow-500'}`}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <circle cx='12' cy='12' r='5' strokeWidth='2' />
                        <line x1='12' y1='1' x2='12' y2='3' strokeWidth='2' />
                        <line x1='12' y1='21' x2='12' y2='23' strokeWidth='2' />
                        <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' strokeWidth='2' />
                        <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' strokeWidth='2' />
                        <line x1='1' y1='12' x2='3' y2='12' strokeWidth='2' />
                        <line x1='21' y1='12' x2='23' y2='12' strokeWidth='2' />
                        <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' strokeWidth='2' />
                        <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' strokeWidth='2' />
                    </svg>

                    {/* Moon Icon (for DARK mode display) */}
                    <svg
                        className={`w-6 h-6 ${darkMode ? 'text-white' : 'hidden'}`}
                        fill='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
                    </svg>

                </button>
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer hover:scale-110 transition-all duration-200 hover:text-(--neon-accent)' alt="" />

                <div className='group relative'>
                    <img
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!token) navigate('/login');
                            else setShowDropdown(prev => !prev);
                        }}
                        className='w-5 cursor-pointer'
                        src={assets.profile_icon}
                        alt=""
                    />
                    {/** dropdown menu */}
                    {
                        token && showDropdown && 
                        <div ref={dropdownRef} className='absolute dropdown-menu right-0 pt-4 z-50'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-(--surface) text-(--text) rounded-lg shadow-soft-md depth-2 border border-(--border)'>
                                <p onClick={() => {navigate('/profile'); setShowDropdown(false)}} className='cursor-pointer hover:text-(--muted) transition-colors'>My Profile</p>
                                <p onClick={() => {navigate('/orders'); setShowDropdown(false)}} className='cursor-pointer hover:text-(--muted) transition-colors'>Orders</p>
                                <p onClick={() => {logout(); setShowDropdown(false)}} className='cursor-pointer hover:text-(--muted) transition-colors'>Logout</p>
                            </div>
                        </div>
                    }
                </div>



                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspects-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            {/* sidebar menu for small screen*/}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-(--surface) depth-2 shadow-soft-lg transition-all z-50 ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-(--text)'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>
                        Collection
                    </NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>
                        Contact
                    </NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>
                        About
                    </NavLink>
                </div>
            </div>

        </div>
    )
}

export default Navbar
