import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='min-h-[70vh] flex flex-col items-center justify-center text-center px-4'>
      <h1 className='text-8xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>404</h1>
      <p className='text-2xl font-semibold text-gray-800 mt-4'>Page Not Found</p>
      <p className='text-gray-500 mt-2 max-w-md'>The page you're looking for doesn't exist or has been moved.</p>
      <button onClick={() => navigate('/')} className='mt-6 bg-gradient-to-r from-primary to-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-100 active:scale-[0.98] transition-all duration-300'>
        Go Back Home
      </button>
    </div>
  )
}

export default NotFound
