import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorsList = () => {

  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)
  const [searchQuery, setSearchQuery] = useState('')
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  const deleteDoctor = async (docId) => {
    if (!window.confirm('Are you sure you want to delete this doctor? This action cannot be undone.')) return
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/delete-doctor', { docId }, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        getAllDoctors()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.speciality.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      
      {/* Search */}
      <div className='my-4 max-w-md'>
        <input
          type='text'
          placeholder='Search by name or speciality...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm'
        />
      </div>

      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {filteredDoctors.length > 0 ? filteredDoctors.map((item, index) => (
          <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group relative' key={index}>
            <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
              <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
              <button
                onClick={() => deleteDoctor(item._id)}
                className='mt-2 w-full text-xs text-red-500 border border-red-200 rounded py-1 hover:bg-red-50 transition-all'
              >
                Delete Doctor
              </button>
            </div>
          </div>
        )) : (
          <div className='text-center py-10 text-gray-400 w-full'>No doctors found</div>
        )}
      </div>
    </div>
  )
}

export default DoctorsList