import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='flex bg-gradient-to-r from-primary to-indigo-700 rounded-3xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 relative overflow-hidden shadow-xl shadow-indigo-100/40'>
            {/* Accent light circles */}
            <div className='absolute right-[-10%] top-[-20%] w-[50%] h-[140%] rounded-full bg-white/5 blur-2xl pointer-events-none'></div>

            {/* ------- Left Side ------- */}
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 relative z-10'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight'>
                    <p>Book Appointment</p>
                    <p className='mt-2 text-indigo-100'>With 100+ Trusted Doctors</p>
                </div>
                <button onClick={() => { navigate('/login'); }} className='bg-white text-sm sm:text-base text-primary font-bold px-8 py-3.5 rounded-full mt-8 hover:bg-slate-50 hover:shadow-lg active:scale-95 transition-all duration-300 shadow-md'>Create Account</button>
            </div>

            {/* ------- Right Side ------- */}
            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                <img className='w-full absolute bottom-0 right-0 max-w-md object-contain transition-transform duration-500 hover:scale-[1.02]' src={assets.appointment_img} alt="Appointment Call to Action" />
            </div>
        </div>
    )
}

export default Banner