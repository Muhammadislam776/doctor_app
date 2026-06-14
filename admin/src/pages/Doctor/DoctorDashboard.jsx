import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  // Calculate appointment stats
  const completedCount = dashData ? dashData.latestAppointments?.filter(a => a.isCompleted).length || 0 : 0
  const cancelledCount = dashData ? dashData.latestAppointments?.filter(a => a.cancelled).length || 0 : 0
  const pendingCount = dashData ? dashData.latestAppointments?.filter(a => !a.cancelled && !a.isCompleted).length || 0 : 0
  const total = completedCount + cancelledCount + pendingCount || 1

  return dashData && (
    <div className='m-5'>

      {/* Stats Cards */}
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{currency} {dashData.earnings}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      {/* Appointment Status */}
      <div className='bg-white p-6 rounded border mt-8 max-w-lg'>
        <p className='font-semibold text-gray-700 mb-4'>My Appointment Status</p>
        <div className='space-y-3'>
          <div>
            <div className='flex justify-between text-sm mb-1'>
              <span className='text-gray-600'>✅ Completed</span>
              <span className='font-medium text-green-600'>{completedCount} ({Math.round((completedCount/total)*100)}%)</span>
            </div>
            <div className='w-full bg-gray-100 rounded-full h-2.5'>
              <div className='bg-green-500 h-2.5 rounded-full transition-all duration-500' style={{width: `${(completedCount/total)*100}%`}}></div>
            </div>
          </div>
          <div>
            <div className='flex justify-between text-sm mb-1'>
              <span className='text-gray-600'>⏳ Pending</span>
              <span className='font-medium text-yellow-600'>{pendingCount} ({Math.round((pendingCount/total)*100)}%)</span>
            </div>
            <div className='w-full bg-gray-100 rounded-full h-2.5'>
              <div className='bg-yellow-400 h-2.5 rounded-full transition-all duration-500' style={{width: `${(pendingCount/total)*100}%`}}></div>
            </div>
          </div>
          <div>
            <div className='flex justify-between text-sm mb-1'>
              <span className='text-gray-600'>❌ Cancelled</span>
              <span className='font-medium text-red-500'>{cancelledCount} ({Math.round((cancelledCount/total)*100)}%)</span>
            </div>
            <div className='w-full bg-gray-100 rounded-full h-2.5'>
              <div className='bg-red-400 h-2.5 rounded-full transition-all duration-500' style={{width: `${(cancelledCount/total)*100}%`}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className='bg-white mt-8'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='rounded-full w-10' src={item.userData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <div className='flex'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                  </div>
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard