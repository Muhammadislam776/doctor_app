import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PatientsList = () => {

  const { aToken } = useContext(AdminContext)
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [patients, setPatients] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const getPatients = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/patients', { headers: { aToken } })
      if (data.success) {
        setPatients(data.patients)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (aToken) {
      getPatients()
    }
  }, [aToken])

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Patients</p>

      {/* Search */}
      <div className='mb-4 max-w-md'>
        <input
          type='text'
          placeholder='Search by name or email...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm'
        />
      </div>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr] py-3 px-6 border-b font-medium'>
          <p>#</p>
          <p>Name</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Gender</p>
          <p>Appointments</p>
        </div>
        {filteredPatients.length > 0 ? filteredPatients.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img src={item.image} className='w-8 h-8 rounded-full object-cover' alt="" />
              <p className='font-medium text-gray-700'>{item.name}</p>
            </div>
            <p>{item.email}</p>
            <p>{item.phone}</p>
            <p>{item.gender}</p>
            <div className='flex items-center gap-2'>
              <span className='bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium'>{item.totalAppointments} total</span>
              <span className='bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-xs font-medium'>{item.completedAppointments} done</span>
            </div>
          </div>
        )) : (
          <div className='text-center py-10 text-gray-400'>No patients found</div>
        )}
      </div>
    </div>
  )
}

export default PatientsList
