import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-br from-indigo-600 via-primary to-blue-500 rounded-3xl px-6 md:px-10 lg:px-20 relative overflow-hidden shadow-xl shadow-indigo-100/40 transition-all duration-300 group'>
            {/* Ambient Background Glows */}
            <div className='absolute top-[-20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-white/10 blur-3xl pointer-events-none'></div>
            <div className='absolute bottom-[-20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-indigo-400/20 blur-3xl pointer-events-none'></div>

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-5 py-12 m-auto md:py-[8vw] md:mb-[-30px] relative z-10'>
                <p className='text-3.5xl md:text-4xl lg:text-5.5xl text-white font-extrabold leading-tight md:leading-tight lg:leading-tight tracking-tight drop-shadow-sm'>
                    Book Appointment <br /> With Trusted Doctors
                </p>
                <div className='flex flex-col sm:flex-row items-center gap-4 text-white text-sm font-light leading-relaxed bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10'>
                    <img className='w-24' src={assets.group_profiles} alt="" />
                    <p className='text-indigo-50'>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
                </div>
                <a href='#speciality' className='flex items-center gap-3 bg-white px-8 py-3.5 rounded-full text-primary font-bold text-sm m-auto md:m-0 hover:bg-slate-50 hover:shadow-lg hover:shadow-white/10 active:scale-95 transition-all duration-300 group/btn'>
                    Book appointment 
                    <img className='w-3 group-hover/btn:translate-x-1.5 transition-transform duration-300' src={assets.arrow_icon} alt="" />
                </a>
            </div>

            {/* --------- Header Right --------- */}
            <div className='md:w-1/2 relative flex items-end'>
                <img className='w-full md:absolute bottom-0 h-auto rounded-b-lg object-contain transition-transform duration-500 group-hover:scale-[1.01]' src={assets.header_img} alt="Doctor Header Illustration" />
            </div>
        </div>
    )
}

export default Header