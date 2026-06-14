import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message sent successfully! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div>
      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px] rounded-lg' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>Islamabad, Pakistan <br /> Blue Area, F-6</p>
          <p className='text-gray-500'>Tel: +92-300-1234567 <br /> Email: support@medicare.com</p>
          <p className='font-semibold text-lg text-gray-600'>CAREERS AT MEDICARE</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className='max-w-2xl mx-auto mb-20'>
        <p className='text-center text-2xl text-[#707070] mb-8'>SEND US A <span className='text-gray-700 font-semibold'>MESSAGE</span></p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <input
              type='text'
              placeholder='Your Name'
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
              required
            />
            <input
              type='email'
              placeholder='Your Email'
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
              required
            />
          </div>
          <input
            type='text'
            placeholder='Subject'
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
            required
          />
          <textarea
            placeholder='Your Message'
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={6}
            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none'
            required
          />
          <button type='submit' className='bg-gradient-to-r from-primary to-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-100 active:scale-[0.98] transition-all duration-300 self-start'>
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
