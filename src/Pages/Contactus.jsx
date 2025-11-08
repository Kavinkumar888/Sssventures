// src/pages/Contact.jsx
import React, { useState, useRef, useEffect } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import emailjs from 'emailjs-com'
import gsap from 'gsap'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSending, setIsSending] = useState(false)
  const [sendStatus, setSendStatus] = useState('')
  const formRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(contactRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSending(true)
    setSendStatus('')

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        formData,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      )
      setSendStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSendStatus('error')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div ref={contactRef} className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">Get in touch with us for any inquiries</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Get in Touch</h2>
              <div className="space-y-6">
                {[
                  { icon: <Mail />, title: 'Email', content: 'info@textilehub.com' },
                  { icon: <Phone />, title: 'Phone', content: '+91 98765 43210' },
                  { icon: <MapPin />, title: 'Address', content: 'SSS VENTURES,D.No:257/3, Navakadu,Mampalayam Road,Agraharam Post, Near Matheswaran Kovil us Stop, Pallipalayam,Erode - 638008' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                <p className="text-gray-600">Map will be embedded here</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSending ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {sendStatus === 'success' && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    Message sent successfully!
                  </div>
                )}

                {sendStatus === 'error' && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Failed to send message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact