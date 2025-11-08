// src/pages/Home.jsx
import React, { useEffect, useRef } from 'react'
import { ArrowRight, Star, Truck, Shield, Award } from 'lucide-react'
import gsap from 'gsap'

const Home = () => {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const aboutRef = useRef(null)

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    )

    // Features animation
    gsap.fromTo(featuresRef.current.children,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.2,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%"
        }
      }
    )

    // About animation
    gsap.fromTo(aboutRef.current,
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%"
        }
      }
    )
  }, [])

  const featuredProducts = [
    {
      id: 1,
      name: "Silk Saree",
      price: 2999,
      image: "https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400",
      rating: 4.8
    },
    {
      id: 2,
      name: "Cotton Kurti",
      price: 1299,
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400",
      rating: 4.6
    },
    {
      id: 3,
      name: "Designer Dress",
      price: 4599,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
      rating: 4.9
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-amber-200 to-orange-300">
        <div ref={heroRef} className="text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800">
            Premium Textiles
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-2xl mx-auto">
            Discover the finest collection of traditional and modern textiles
          </p>
          <button className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-secondary transition-all duration-300 flex items-center gap-2 mx-auto group">
            Shop Now 
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose Us</h2>
          <div ref={featuresRef} className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Award />, title: "Premium Quality", desc: "100% authentic materials" },
              { icon: <Truck />, title: "Free Shipping", desc: "On orders above ₹1999" },
              { icon: <Shield />, title: "Secure Payment", desc: "Safe & encrypted transactions" }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-amber-50 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-orange-100 to-amber-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={aboutRef}>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">About Our Company</h2>
              <p className="text-lg text-gray-700 mb-6">
                With over 50 years of experience in the textile industry, we bring you the finest 
                collection of fabrics, clothing, and traditional wear. Our commitment to quality 
                and customer satisfaction makes us the preferred choice for textile lovers.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "50+", label: "Years Experience" },
                  { value: "10K+", label: "Happy Customers" },
                  { value: "500+", label: "Products" },
                  { value: "50+", label: "Awards" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400" 
                alt="Store" 
                className="rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400" 
                alt="Products" 
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-amber-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">₹{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home