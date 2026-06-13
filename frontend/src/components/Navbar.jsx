import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-100 sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 -mx-4 sm:px-[10%] sm:-mx-[10%] transition-all duration-300'>
      <img onClick={() => { navigate('/'); scrollTo(0,0) }} className='w-40 cursor-pointer active:scale-95 transition-all' src={assets.logo} alt="MediCare Logo" />
      <ul className='md:flex items-start gap-6 font-medium hidden text-gray-700'>
        <NavLink to='/' className='hover:text-primary transition-colors duration-200'>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors' className='hover:text-primary transition-colors duration-200'>
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about' className='hover:text-primary transition-colors duration-200'>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact' className='hover:text-primary transition-colors duration-200'>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-4 '>
        {
          token && userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 h-8 rounded-full object-cover ring-2 ring-indigo-50 group-hover:ring-primary/40 transition-all' src={userData.image} alt="" />
              <img className='w-2.5 transition-transform duration-300 group-hover:rotate-180' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-sm font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col gap-2 p-3 transition-all duration-300'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-primary hover:bg-indigo-50/50 p-2 rounded-lg transition-all cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-primary hover:bg-indigo-50/50 p-2 rounded-lg transition-all cursor-pointer'>My Appointments</p>
                  <hr className='border-gray-100 my-1' />
                  <p onClick={logout} className='hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/95 hover:shadow-md hover:shadow-indigo-100 hover:scale-[1.03] active:scale-95 transition-all duration-300 hidden md:block'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-50 overflow-hidden bg-white transition-all duration-300`}>
          <div className='flex items-center justify-between px-5 py-6 border-b border-gray-50'>
            <img src={assets.logo} className='w-36' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 cursor-pointer' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
            <hr className='w-full border-gray-100 my-4' />
            {token && userData ? (
              <>
                <NavLink onClick={() => setShowMenu(false)} to='/my-profile'><p className='px-4 py-2 text-gray-700 hover:text-primary transition-all'>My Profile</p></NavLink>
                <NavLink onClick={() => setShowMenu(false)} to='/my-appointments'><p className='px-4 py-2 text-gray-700 hover:text-primary transition-all'>My Appointments</p></NavLink>
                <button onClick={() => { setShowMenu(false); logout(); }} className='px-8 py-2.5 mt-4 text-sm font-bold text-red-500 bg-red-50 rounded-full hover:bg-red-100/70 transition-all'>Logout</button>
              </>
            ) : (
              <NavLink onClick={() => setShowMenu(false)} to='/login' className='w-full text-center mt-2'>
                <p className='px-8 py-3 rounded-full bg-primary text-white inline-block text-sm font-bold shadow-md active:scale-95 transition-all'>Create Account / Login</p>
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar