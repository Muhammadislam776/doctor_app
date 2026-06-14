import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  // Calculate percentages for status chart
  const total = dashData ? (dashData.completedCount + dashData.cancelledCount + dashData.pendingCount) || 1 : 1
  const completedPct = dashData ? Math.round((dashData.completedCount / total) * 100) : 0
  const cancelledPct = dashData ? Math.round((dashData.cancelledCount / total) * 100) : 0
  const pendingPct = dashData ? Math.round((dashData.pendingCount / total) * 100) : 0

  return dashData && (
    <div className='m-5'>

      {/* Stats Cards */}
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
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
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{currency} {dashData.revenue || 0}</p>
            <p className='text-gray-400'>Revenue</p>
          </div>
        </div>
      </div>

      {/* Appointment Status Breakdown */}
      <div className='flex flex-wrap gap-5 mt-8'>
        <div className='bg-white p-6 rounded border flex-1 min-w-[280px]'>
          <p className='font-semibold text-gray-700 mb-4'>Appointment Status</p>
          <div className='space-y-4'>
            <div>
              <div className='flex justify-between text-sm mb-1'>
                <span className='text-gray-600'>Completed</span>
                <span className='font-medium text-green-600'>{dashData.completedCount || 0} ({completedPct}%)</span>
              </div>
              <div className='w-full bg-gray-100 rounded-full h-3'>
                <div className='bg-green-500 h-3 rounded-full transition-all duration-500' style={{width: `${completedPct}%`}}></div>
              </div>
            </div>
            <div>
              <div className='flex justify-between text-sm mb-1'>
                <span className='text-gray-600'>Pending</span>
                <span className='font-medium text-yellow-600'>{dashData.pendingCount || 0} ({pendingPct}%)</span>
              </div>
              <div className='w-full bg-gray-100 rounded-full h-3'>
                <div className='bg-yellow-400 h-3 rounded-full transition-all duration-500' style={{width: `${pendingPct}%`}}></div>
              </div>
            </div>
            <div>
              <div className='flex justify-between text-sm mb-1'>
                <span className='text-gray-600'>Cancelled</span>
                <span className='font-medium text-red-500'>{dashData.cancelledCount || 0} ({cancelledPct}%)</span>
              </div>
              <div className='w-full bg-gray-100 rounded-full h-3'>
                <div className='bg-red-400 h-3 rounded-full transition-all duration-500' style={{width: `${cancelledPct}%`}}></div>
              </div>
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
              <img className='rounded-full w-10' src={item.docData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard