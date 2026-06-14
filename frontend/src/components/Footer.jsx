import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>MediCare is your trusted platform for booking doctor appointments online. We connect patients with qualified healthcare professionals, making healthcare accessible and convenient for everyone.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li onClick={() => navigate('/')} className='hover:text-primary cursor-pointer transition-colors'>Home</li>
            <li onClick={() => navigate('/about')} className='hover:text-primary cursor-pointer transition-colors'>About Us</li>
            <li onClick={() => navigate('/contact')} className='hover:text-primary cursor-pointer transition-colors'>Contact Us</li>
            <li onClick={() => navigate('/doctors')} className='hover:text-primary cursor-pointer transition-colors'>All Doctors</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+92-300-1234567</li>
            <li>support@medicare.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024 @ MediCare - All Rights Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
