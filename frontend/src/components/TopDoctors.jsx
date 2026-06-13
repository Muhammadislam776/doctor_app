import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const TopDoctors = () => {

    const navigate = useNavigate()

    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-800 md:mx-10'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Top Doctors to Book</h1>
            <p className='sm:w-1/2 text-center text-sm text-gray-500 leading-relaxed'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-auto gap-6 pt-8 gap-y-8 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='group border border-indigo-50 rounded-2xl overflow-hidden cursor-pointer bg-white hover:shadow-xl hover:shadow-indigo-100/30 hover:-translate-y-2 transition-all duration-300' key={index}>
                        <div className='relative overflow-hidden bg-gradient-to-b from-slate-50 to-[#EAEFFF]'>
                            <img className='w-full object-cover transition-transform duration-500 group-hover:scale-105' src={item.image} alt={item.name} />
                            {item.available ? (
                                <span className='absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider scale-90 origin-top-left'>
                                    Available
                                </span>
                            ) : (
                                <span className='absolute top-3 left-3 bg-gray-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider scale-90 origin-top-left'>
                                    Busy
                                </span>
                            )}
                        </div>
                        <div className='p-5'>
                            <div className='flex items-center gap-2 text-xs font-semibold mb-2'>
                                <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : "bg-gray-400"}`}></p>
                                <p className={item.available ? 'text-green-600' : 'text-gray-500'}>{item.available ? 'Available' : "Not Available"}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-bold group-hover:text-primary transition-colors duration-300 line-clamp-1'>{item.name}</p>
                            <p className='text-gray-500 text-xs mt-1 font-medium'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-indigo-50/70 text-indigo-600 hover:bg-indigo-100/80 hover:shadow-md hover:shadow-indigo-100/50 active:scale-95 px-12 py-3.5 rounded-full mt-10 font-bold transition-all duration-300'>View More Doctors</button>
        </div>

    )
}

export default TopDoctors