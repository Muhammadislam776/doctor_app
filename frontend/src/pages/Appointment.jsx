import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {

        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {

            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];


            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {

                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))

        }

    }

    const bookAppointment = async () => {

        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className='py-6'>

            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col sm:flex-row gap-6 items-start'>
                <div className='w-full sm:w-72 rounded-2xl bg-gradient-to-b from-indigo-50 to-[#EAEFFF] p-3 shadow-md border border-indigo-100/30 flex-shrink-0'>
                    <img className='w-full rounded-xl object-cover' src={docInfo.image} alt={docInfo.name} />
                </div>

                <div className='flex-1 border border-indigo-50 rounded-2xl p-8 py-8 bg-white shadow-xl shadow-indigo-100/20 relative mx-2 sm:mx-0 mt-[-60px] sm:mt-0'>
                    {/* ----- Doc Info : name, degree, experience ----- */}
                    <div className='flex items-center gap-3'>
                        <p className='text-3xl font-bold text-gray-900 leading-none'>{docInfo.name}</p>
                        <img className='w-5 h-5 object-contain' src={assets.verified_icon} alt="Verified" />
                    </div>
                    <div className='flex items-center gap-3 mt-3 text-sm text-gray-600 font-medium'>
                        <p className='bg-indigo-50/70 text-indigo-700 px-3 py-1 rounded-lg border border-indigo-100/40'>{docInfo.degree} - {docInfo.speciality}</p>
                        <span className='py-1 px-3 border border-gray-200 text-xs font-bold rounded-full bg-slate-50'>{docInfo.experience}</span>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div className='mt-6'>
                        <p className='flex items-center gap-1.5 text-sm font-bold text-gray-900'>
                            About 
                            <img className='w-3.5 h-3.5' src={assets.info_icon} alt="" />
                        </p>
                        <p className='text-sm text-gray-500 leading-relaxed max-w-[700px] mt-2 font-light'>{docInfo.about}</p>
                    </div>

                    <div className='border-t border-gray-100 mt-6 pt-5 flex items-center justify-between'>
                        <p className='text-gray-500 font-semibold'>Appointment fee</p>
                        <p className='text-2xl font-bold text-gray-900'>{currencySymbol}{docInfo.fees}</p>
                    </div>
                </div>
            </div>

            {/* Booking slots */}
            <div className='sm:ml-78 mt-10 font-medium text-gray-800 sm:pl-6'>
                <p className='text-lg font-bold text-gray-900'>Select Booking Slot</p>
                
                {/* Day picker */}
                <div className='flex gap-3 items-center w-full overflow-x-scroll scrollbar-none mt-5 pb-1'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-5 min-w-16 rounded-2xl cursor-pointer transition-all duration-300 ${slotIndex === index ? 'bg-primary text-white shadow-lg shadow-indigo-100' : 'border border-gray-200 bg-white hover:bg-slate-50'}`}>
                            <p className='text-xs font-bold tracking-wider opacity-85'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p className='text-lg font-extrabold mt-1'>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                {/* Time picker */}
                <div className='flex items-center gap-3 w-full overflow-x-scroll scrollbar-none mt-6 pb-2'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-semibold flex-shrink-0 px-6 py-2.5 rounded-full cursor-pointer transition-all duration-300 ${item.time === slotTime ? 'bg-primary text-white shadow-md shadow-indigo-100' : 'text-gray-500 bg-white border border-gray-200 hover:bg-slate-50'}`}>{item.time.toLowerCase()}</p>
                    ))}
                </div>

                <button onClick={bookAppointment} className='bg-gradient-to-r from-primary to-indigo-600 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.98] text-white text-base font-bold px-20 py-4 rounded-full my-8 transition-all duration-300 shadow-md'>Book an appointment</button>
            </div>

            {/* Listing Releated Doctors */}
            <div className='border-t border-gray-100 mt-8 pt-8'>
                <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
            </div>
        </div>
    ) : null
}

export default Appointment