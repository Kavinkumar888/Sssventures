// src/pages/Contact.jsx
import React, { useState, useRef, useEffect } from 'react'
import { Mail, Phone, MapPin, Send, Navigation, Clock } from 'lucide-react'
import emailjs from 'emailjs-com'
import gsap from 'gsap'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSending, setIsSending] = useState(false)
  const [sendStatus, setSendStatus] = useState('')
  const formRef = useRef(null)
  const contactRef = useRef(null)
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  const companyLocation = {
    lat: 11.3410,
    lng: 77.7172,
    address:
      'SSS VENTURES, D.No:257/3, Navakadu, Mampalayam Road, Agraharam Post, Near Matheswaran Kovil Bus Stop, Pallipalayam, Erode - 638008'
  }

  useEffect(() => {
    gsap.fromTo(
      contactRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )

    if (window.google) initializeMap()
    else loadGoogleMapsScript()
  }, [])

  const loadGoogleMapsScript = () => {
    if (document.querySelector('script[src*="googleapis.com/maps"]')) return

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`
    script.async = true
    script.defer = true
    script.onload = initializeMap
    document.head.appendChild(script)
  }

  const initializeMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: companyLocation.lat, lng: companyLocation.lng },
      zoom: 16,
      mapTypeControl: false,
      streetViewControl: true,
      fullscreenControl: true
    })
    mapInstance.current = map
  }

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
        'service_lypeaj9',
        'template_y5y0sjo',
        formData,
        'HHSIIqPbIn0pja9HG'
      )
      setSendStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSendStatus('error')
    } finally {
      setIsSending(false)
    }
  }

  const openLocationInMaps = () => {
    const url = `https://www.google.com/maps?q=${companyLocation.lat},${companyLocation.lng}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <div ref={contactRef} className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get in touch with SSS Ventures for premium textile solutions and customized fabric manufacturing
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail className="w-5 h-5" />,
                      title: 'Email',
                      content: 'sssventures6@gmail.com',
                      link: 'mailto:sssventures6@gmail.com'
                    },
                    {
                      icon: <Phone className="w-5 h-5" />,
                      title: 'Phone',
                      content: '+91 95855 19593',
                      link: 'tel:+919585519593'
                    },
                    {
                      icon: <MapPin className="w-5 h-5" />,
                      title: 'Address',
                      content: companyLocation.address,
                      link: null
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 text-gray-800">
                          {item.title}
                        </h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-gray-600 hover:text-pink-600 transition-colors duration-300"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-gray-600">{item.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Business Hours */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-pink-600" />
                    <h3 className="font-semibold text-lg text-gray-800">
                      Business Hours
                    </h3>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday - Saturday</span>
                      <span className="font-semibold">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-semibold">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Send us a Message
              </h2>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your fabric requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg hover:shadow-xl"
                >
                  {isSending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {sendStatus === 'success' && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl text-center">
                    ✅ Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                {sendStatus === 'error' && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-center">
                    ❌ Failed to send message. Please try again.
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
