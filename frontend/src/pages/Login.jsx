import React, { useContext, useEffect, useState, useRef } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Sign Up')
  const [role, setRole] = useState('Patient')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken, userData } = useContext(AppContext)
  const isFirstRender = useRef(true)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (role === 'Admin') {
        // Admin login
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          toast.success('Admin logged in successfully!')
          // Open admin panel in new tab or redirect
          const newWindow = window.open('/admin', '_blank');

          if (!newWindow) {
            window.location.href = '/admin';
          }
        } else {
          toast.error(data.message)
        }
      } else if (role === 'Doctor') {
        // Doctor login
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem('dToken', data.token)
          toast.success('Doctor logged in successfully!')
          const newWindow = window.open('/admin', '_blank');

          if (!newWindow) {
            window.location.href = '/admin';
          }
        } else {
          toast.error(data.message)
        }

      } else {
        // Patient login/signup
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
    if (token && token !== 'undefined' && token !== 'null' && token !== 'false' && userData) {
      navigate('/', { replace: true })
    }
  }, [token, userData, navigate])

  // Reset form when role changes
  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');

    // Only Patient has Sign Up
    if (role === 'Patient') {
      setState('Sign Up');
    } else {
      setState('Login');
    }
  }, [role]);

  const roleIcons = {
    Patient: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' /></svg>
    ),
    Admin: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' /></svg>
    ),
    Doctor: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' /></svg>
    )
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center px-4'>
      <div className='flex flex-col gap-4 m-auto items-start p-8 sm:p-10 min-w-[340px] sm:min-w-[460px] bg-white border border-indigo-50 rounded-2xl text-gray-600 text-sm shadow-xl shadow-indigo-100/30'>

        {/* Role Selector Tabs */}
        <div className='w-full flex rounded-xl bg-gray-100 p-1 gap-1'>
          {['Patient', 'Admin', 'Doctor'].map((r) => (
            <button
              key={r}
              type='button'
              onClick={() => setRole(r)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${role === r
                ? 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
              {roleIcons[r]}
              {r}
            </button>
          ))}
        </div>

        <div className='w-full'>
          <p className='text-2xl font-bold text-gray-900'>
            {role === 'Patient'
              ? (state === 'Sign Up' ? 'Create Account' : 'Welcome Back')
              : `${role} Login`
            }
          </p>
          <p className='text-gray-400 text-xs mt-1'>
            {role === 'Patient'
              ? `Please ${state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment`
              : `Sign in to access ${role.toLowerCase()} dashboard`
            }
          </p>
        </div>

        {role === 'Patient' && state === 'Sign Up' && (
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
        <button className='bg-gradient-to-r from-primary to-indigo-600 hover:shadow-lg hover:shadow-indigo-100 active:scale-[0.98] text-white w-full py-3 mt-4 rounded-xl text-base font-bold transition-all duration-300'>
          {role === 'Patient' ? (state === 'Sign Up' ? 'Create Account' : 'Login') : `Login as ${role}`}
        </button>
        {role === 'Patient' && (
          state === 'Sign Up'
            ? <p className='text-xs text-gray-400 mt-2 w-full text-center'>Already have an account? <span onClick={(e) => { e.preventDefault(); setName(''); setEmail(''); setPassword(''); setState('Login'); }} className='text-primary font-bold hover:underline cursor-pointer transition-all'>Login here</span></p>
            : <p className='text-xs text-gray-400 mt-2 w-full text-center'>Don't have an account? <span onClick={(e) => { e.preventDefault(); setName(''); setEmail(''); setPassword(''); setState('Sign Up'); }} className='text-primary font-bold hover:underline cursor-pointer transition-all'>Create one</span></p>
        )}
      </div>
    </form>
  )
}

export default Login