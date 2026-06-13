import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-800'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Find by Speciality</h1>
            <p className='sm:w-1/2 text-center text-sm text-gray-500 leading-relaxed'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            <div className='flex sm:justify-center gap-6 pt-8 w-full overflow-x-scroll scrollbar-none pb-2'>
                {specialityData.map((item, index) => (
                    <Link to={`/doctors/${item.speciality}`} onClick={() => scrollTo(0, 0)} className='flex flex-col items-center text-xs font-semibold cursor-pointer flex-shrink-0 hover:translate-y-[-6px] transition-all duration-300 group' key={index}>
                        <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-indigo-50/50 flex items-center justify-center p-3 mb-3 hover:bg-indigo-50 border border-indigo-100/30 group-hover:border-primary/30 group-hover:shadow-md transition-all duration-300'>
                            <img className='w-14 sm:w-16 h-auto object-contain transition-transform duration-300 group-hover:scale-110' src={item.image} alt="" />
                        </div>
                        <p className='text-gray-700 group-hover:text-primary transition-colors duration-300'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu