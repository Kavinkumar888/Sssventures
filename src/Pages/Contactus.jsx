// src/pages/Contact.jsx
import React, { useState, useRef, useEffect } from 'react'
import { Mail, Phone, MapPin, Send, Navigation, Clock } from 'lucide-react'
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
  const [userLocation, setUserLocation] = useState(null)
  const [distance, setDistance] = useState(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [travelTime, setTravelTime] = useState(null)
  const formRef = useRef(null)
  const contactRef = useRef(null)
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  // Company location coordinates (SSS Ventures, Pallipalayam, Erode)
  const companyLocation = {
    lat: 11.3410,
    lng: 77.7172,
    address: 'SSS VENTURES, D.No:257/3, Navakadu, Mampalayam Road, Agraharam Post, Near Matheswaran Kovil Bus Stop, Pallipalayam, Erode - 638008'
  }

  useEffect(() => {
    gsap.fromTo(contactRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )

    // Initialize Google Map
    if (window.google) {
      initializeMap()
    } else {
      loadGoogleMapsScript()
    }
  }, [])

  const loadGoogleMapsScript = () => {
    if (document.querySelector('script[src*="googleapis.com/maps"]')) return

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places,geometry`
    script.async = true
    script.defer = true
    script.onload = initializeMap
    document.head.appendChild(script)
  }

  const initializeMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: companyLocation.lat, lng: companyLocation.lng },
      zoom: 16,
      styles: [
        {
          "featureType": "all",
          "elementType": "geometry",
          "stylers": [{ "color": "#f5f5f5" }]
        },
        {
          "featureType": "poi",
          "elementType": "labels",
          "stylers": [{ "visibility": "off" }]
        }
      ],
      mapTypeControl: false,
      streetViewControl: true,
      fullscreenControl: true
    })

    mapInstance.current = map

    // Add custom marker for company location
    const marker = new window.google.maps.Marker({
      position: { lat: companyLocation.lat, lng: companyLocation.lng },
      map: map,
      title: "SSS Ventures",
      animation: window.google.maps.Animation.DROP,
      icon: {
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#EC4899" stroke="white" stroke-width="3"/>
            <circle cx="20" cy="20" r="8" fill="white"/>
            <path d="M20 12L26 20L20 28L14 20L20 12Z" fill="#EC4899"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 40)
      }
    })

    // Add info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 12px; max-width: 250px;">
          <h3 style="margin: 0 0 8px 0; color: #EC4899; font-size: 16px; font-weight: bold;">SSS Ventures</h3>
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">Textile Manufacturing</p>
          <p style="margin: 0; font-size: 12px; color: #888;">${companyLocation.address}</p>
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee;">
            <p style="margin: 0; font-size: 11px; color: #EC4899;">📍 Click for directions</p>
          </div>
        </div>
      `
    })

    marker.addListener('click', () => {
      infoWindow.open(map, marker)
    })

    // Auto open info window
    setTimeout(() => {
      infoWindow.open(map, marker)
    }, 1000)
  }

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    setIsLoadingLocation(true)
    setDistance(null)
    setTravelTime(null)
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude
        
        setUserLocation({ lat: userLat, lng: userLng })
        await calculateDistanceAndTime(userLat, userLng)
        addUserLocationToMap(userLat, userLng)
        setIsLoadingLocation(false)
      },
      (error) => {
        console.error('Error getting location:', error)
        alert('Unable to get your location. Please ensure location services are enabled and try again.')
        setIsLoadingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  }

  const calculateDistanceAndTime = async (userLat, userLng) => {
    if (!window.google) return

    try {
      const userLocation = new window.google.maps.LatLng(userLat, userLng)
      const companyLoc = new window.google.maps.LatLng(companyLocation.lat, companyLocation.lng)
      
      // Calculate straight line distance
      const distanceInMeters = window.google.maps.geometry.spherical.computeDistanceBetween(
        userLocation,
        companyLoc
      )
      
      const distanceInKm = (distanceInMeters / 1000).toFixed(1)
      setDistance(distanceInKm)

      // Calculate travel time using Directions Service
      const directionsService = new window.google.maps.DirectionsService()
      
      directionsService.route(
        {
          origin: { lat: userLat, lng: userLng },
          destination: { lat: companyLocation.lat, lng: companyLocation.lng },
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK && result.routes[0]) {
            const route = result.routes[0]
            const duration = route.legs[0].duration.text
            setTravelTime(duration)
            
            // Draw route on map
            const directionsRenderer = new window.google.maps.DirectionsRenderer({
              map: mapInstance.current,
              directions: result,
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: '#EC4899',
                strokeOpacity: 0.8,
                strokeWeight: 5
              }
            })
          }
        }
      )
    } catch (error) {
      console.error('Error calculating distance/time:', error)
    }
  }

  const addUserLocationToMap = (userLat, userLng) => {
    if (!mapInstance.current || !window.google) return

    // Add user location marker
    new window.google.maps.Marker({
      position: { lat: userLat, lng: userLng },
      map: mapInstance.current,
      title: "Your Current Location",
      animation: window.google.maps.Animation.BOUNCE,
      icon: {
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="#3B82F6" stroke="white" stroke-width="3"/>
            <circle cx="16" cy="16" r="6" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32),
        anchor: new window.google.maps.Point(16, 32)
      }
    })

    // Fit map to show both locations
    const bounds = new window.google.maps.LatLngBounds()
    bounds.extend(new window.google.maps.LatLng(userLat, userLng))
    bounds.extend(new window.google.maps.LatLng(companyLocation.lat, companyLocation.lng))
    mapInstance.current.fitBounds(bounds, { padding: 50 })
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
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formData,
        'YOUR_PUBLIC_KEY'
      )
      setSendStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSendStatus('error')
    } finally {
      setIsSending(false)
    }
  }

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${companyLocation.lat},${companyLocation.lng}&travelmode=driving`
    window.open(url, '_blank')
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get in touch with SSS Ventures for premium textile solutions and customized fabric manufacturing
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information & Map */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Get in Touch</h2>
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
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 text-gray-800">{item.title}</h3>
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
                    <h3 className="font-semibold text-lg text-gray-800">Business Hours</h3>
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

              {/* Distance Calculator */}
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Navigation className="w-6 h-6" />
                  Find Your Way Here
                </h3>
                <p className="mb-6 opacity-90">
                  Check your distance and get directions to our location
                </p>
                
                {(distance || travelTime) && (
                  <div className="bg-white/20 rounded-xl p-4 mb-6 backdrop-blur-sm">
                    {distance && (
                      <div className="text-center mb-3">
                        <p className="text-sm opacity-90">Distance</p>
                        <p className="text-2xl font-bold">{distance} km</p>
                      </div>
                    )}
                    {travelTime && (
                      <div className="text-center">
                        <p className="text-sm opacity-90">Estimated Travel Time</p>
                        <p className="text-2xl font-bold">{travelTime}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={getUserLocation}
                    disabled={isLoadingLocation}
                    className="bg-white text-pink-600 py-3 px-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoadingLocation ? (
                      <>
                        <div className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                        Locating...
                      </>
                    ) : (
                      <>
                        <Navigation size={18} />
                        Calculate
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={openInGoogleMaps}
                    className="bg-transparent border-2 border-white text-white py-3 px-4 rounded-xl font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MapPin size={18} />
                    Directions
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form and Map */}
            <div className="space-y-8">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Send us a Message</h2>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-gray-700">Name *</label>
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
                      <label className="block text-sm font-semibold mb-3 text-gray-700">Email *</label>
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
                    <label className="block text-sm font-semibold mb-3 text-gray-700">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="What is this regarding?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700">Message *</label>
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
                      ❌ Failed to send message. Please try again or contact us directly.
                    </div>
                  )}
                </form>
              </div>

              {/* Google Map */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-pink-600" />
                      Our Location
                    </h3>
                    <button
                      onClick={openLocationInMaps}
                      className="text-sm bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-300"
                    >
                      Open in Maps
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    📍 {companyLocation.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact