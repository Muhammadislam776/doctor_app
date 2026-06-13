import React, { useContext, useEffect, useState, useRef } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken, userData } = useContext(AppContext)
  const isFirstRender = useRef(true)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Account created successfully!')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Logged in successfully!')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    isFirstRender.current = false
  }, [])

  useEffect(() => {
    // Only redirect if already logged in (token exists and userData is loaded)
    if (token && token !== 'undefined' && token !== 'null' && token !== 'false' && userData) {
      navigate('/', { replace: true })
    }
  }, [token, userData, navigate])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center px-4'>
      <div className='flex flex-col gap-4 m-auto items-start p-8 sm:p-10 min-w-[340px] sm:min-w-[420px] bg-white border border-indigo-50 rounded-2xl text-gray-600 text-sm shadow-xl shadow-indigo-100/30'>
        <div className='w-full'>
          <p className='text-2xl font-bold text-gray-900'>{state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}</p>
          <p className='text-gray-400 text-xs mt-1'>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment</p>
        </div>
        {state === 'Sign Up' && (
          <div className='w-full'>
            <p className='font-semibold text-gray-700 mb-1'>Full Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-lg w-full p-2.5 transition-all duration-200' type="text" placeholder="John Doe" required />
          </div>
        )}
        <div className='w-full'>
          <p className='font-semibold text-gray-700 mb-1'>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-lg w-full p-2.5 transition-all duration-200' type="email" placeholder="example@email.com" required />
        </div>
        <div className='w-full'>
          <p className='font-semibold text-gray-700 mb-1'>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-lg w-full p-2.5 transition-all duration-200' type="password" placeholder="••••••••" required />
        </div>
        <button className='bg-gradient-to-r from-primary to-indigo-600 hover:shadow-lg hover:shadow-indigo-100 active:scale-[0.98] text-white w-full py-3 mt-4 rounded-xl text-base font-bold transition-all duration-300'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
        {state === 'Sign Up'
          ? <p className='text-xs text-gray-400 mt-2 w-full text-center'>Already have an account? <span onClick={(e) => { e.preventDefault(); setName(''); setEmail(''); setPassword(''); setState('Login'); }} className='text-primary font-bold hover:underline cursor-pointer transition-all'>Login here</span></p>
          : <p className='text-xs text-gray-400 mt-2 w-full text-center'>Don't have an account? <span onClick={(e) => { e.preventDefault(); setName(''); setEmail(''); setPassword(''); setState('Sign Up'); }} className='text-primary font-bold hover:underline cursor-pointer transition-all'>Create one</span></p>
        }
      </div>
    </form>
  )
}

export default Login