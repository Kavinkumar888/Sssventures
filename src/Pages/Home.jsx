// src/Pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Banner images array
  const bannerImages = [
    {
      url: "https://images.unsplash.com/photo-1558769132-cb25c5d11e85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Design, develop and source",
      highlight: "customized fabrics",
      subtitle: "for your brand"
    },
    {
      url: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Premium Quality",
      highlight: "Textile Solutions",
      subtitle: "for modern fashion brands"
    },
    {
      url: "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Sustainable &",
      highlight: "Eco-Friendly Fabrics",
      subtitle: "for a better tomorrow"
    },
    {
      url: "https://images.unsplash.com/photo-1566206091558-7f218b696731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
      title: "Global Delivery",
      highlight: "Worldwide Service",
      subtitle: "right to your doorstep"
    }
  ];

  // Auto slide effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [bannerImages.length]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Next and previous slides
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  useEffect(() => {
    // Hero section animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );

    // Section animations
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Slider */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden"
      >
        {/* Slides Container */}
        <div className="relative w-full h-full">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${image.url}')`,
                }}
              />
              
              {/* Content - Only show for active slide */}
              {index === currentSlide && (
                <div className="relative h-full flex items-center justify-center">
                  <div className="text-center text-white px-4 max-w-4xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                      {image.title}{" "}
                      <span className="text-pink-300 block md:inline mt-2">
                        {image.highlight}
                      </span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 text-gray-200">
                      {image.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                      <Link
                        to="/products"
                        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto text-center"
                      >
                        Explore Fabrics
                      </Link>
                      <Link
                        to="/dyed"
                        className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center"
                      >
                        View Dyed Collection
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        <button
          onClick={prevSlide}
          className="hidden sm:block absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-10"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="hidden sm:block absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-10"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators - Smaller on mobile */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-pink-500 w-6 sm:w-8 h-2 sm:h-3" 
                  : "bg-white/50 hover:bg-white/80 w-2 sm:w-3 h-2 sm:h-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Short Cotton Section */}
      <section
        ref={sectionRef}
        className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Text Content */}
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                  We help fashion brands turn{" "}
                  <span className="text-pink-600 block mt-2">ideas into beautiful textiles</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  With a wide network of mills and artisans, we offer customized fabrics, 
                  prints, textures, and finishes all produced in small or bulk quantities 
                  and delivered globally.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-500 rounded-full mr-3 sm:mr-4"></div>
                    <span className="text-gray-700 text-sm sm:text-base">Custom fabric manufacturing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-500 rounded-full mr-3 sm:mr-4"></div>
                    <span className="text-gray-700 text-sm sm:text-base">Global delivery network</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-500 rounded-full mr-3 sm:mr-4"></div>
                    <span className="text-gray-700 text-sm sm:text-base">Small & bulk production</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative order-1 lg:order-2">
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Textile Manufacturing"
                    className="w-full h-64 sm:h-80 md:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Floating stats - Adjusted for mobile */}
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-3 sm:p-6">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-pink-600">500+</div>
                    <div className="text-xs sm:text-sm text-gray-600">Happy Brands</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Services Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              What We Do
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Comprehensive textile solutions for modern fashion brands
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Service 1 */}
            <div className="group bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-pink-50 transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-pink-200 transition-colors">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Custom Fabric Manufacturing</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Create unique fabrics tailored to your brand's vision with our custom manufacturing services.
              </p>
            </div>

            {/* Service 2 */}
            <div className="group bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-pink-50 transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-pink-200 transition-colors">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Digital & Screen Printing</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                High-quality printing services with vibrant colors and precise patterns for your designs.
              </p>
            </div>

            {/* Service 3 */}
            <div className="group bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-pink-50 transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-pink-200 transition-colors">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Natural & Sustainable Fabrics</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Eco-friendly organic fabrics that are good for your brand and the planet.
              </p>
            </div>

            {/* Service 4 */}
            <div className="group bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-pink-50 transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-pink-200 transition-colors">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Small & More Production</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Flexible production quantities from small batches to large volumes to suit your needs.
              </p>
            </div>

            {/* Service 5 */}
            <div className="group bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-pink-50 transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-pink-200 transition-colors">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Global Sourcing Network</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Access to a worldwide network of mills and artisans for the best materials.
              </p>
            </div>

            {/* Service 6 */}
            <div className="group bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-pink-50 transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-pink-200 transition-colors">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Doorstep Delivery Worldwide</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Reliable global shipping with doorstep delivery to any location worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-pink-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join hundreds of brands that trust us for their fabric needs. Start your journey with custom textiles today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-pink-600 hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center"
            >
              Get Started
            </Link>
            <Link
              to="/products"
              className="border-2 border-white text-white hover:bg-white hover:text-pink-600 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center"
            >
              Browse Collections
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;