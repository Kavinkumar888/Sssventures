import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [
    {
      url: "https://images.unsplash.com/photo-1558769132-cb25c5d11e85?auto=format&fit=crop&w=2070&q=80",
      title: "Design, develop and source",
      highlight: "customized fabrics",
      subtitle: "for your brand",
    },
    {
      url: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=2070&q=80",
      title: "Premium Quality",
      highlight: "Textile Solutions",
      subtitle: "for modern fashion brands",
    },
    {
      url: "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?auto=format&fit=crop&w=2070&q=80",
      title: "Sustainable &",
      highlight: "Eco-Friendly Fabrics",
      subtitle: "for a better tomorrow",
    },
    {
      url: "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=2064&q=80",
      title: "Global Delivery",
      highlight: "Worldwide Service",
      subtitle: "right to your doorstep",
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

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
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const goToSlide = (i) => setCurrentSlide(i);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
    );

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-[85vh] sm:h-screen overflow-hidden">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('${image.url}')`,
              }}
            />
            {index === currentSlide && (
              <div className="relative flex flex-col justify-center items-center h-full text-center text-white px-5">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-3">
                  {image.title}
                  <span className="block text-pink-400">{image.highlight}</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6">
                  {image.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
                  <Link
                    to="/products"
                    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 w-full sm:w-auto shadow-md"
                  >
                    Explore Fabrics
                  </Link>
                  <Link
                    to="/dyed"
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 w-full sm:w-auto"
                  >
                    View Dyed Collection
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {bannerImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? "bg-pink-500 w-6 h-2"
                  : "bg-white/60 hover:bg-white w-2 h-2"
              }`}
            />
          ))}
        </div>
      </section>

      {/* INFO SECTION */}
      <section
        ref={sectionRef}
        className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-white text-center sm:text-left"
      >
        <div className="container mx-auto px-5 sm:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
              We help brands turn{" "}
              <span className="text-pink-600 block mt-2">
                ideas into beautiful textiles
              </span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
              With a wide network of mills and artisans, we offer customized
              fabrics, prints, textures, and finishes — all produced in small or
              bulk quantities and delivered globally.
            </p>
            <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
              <li className="flex justify-center sm:justify-start items-center gap-2">
                <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                Custom fabric manufacturing
              </li>
              <li className="flex justify-center sm:justify-start items-center gap-2">
                <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                Global delivery network
              </li>
              <li className="flex justify-center sm:justify-start items-center gap-2">
                <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                Small & bulk production
              </li>
            </ul>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=2070&q=80"
              alt="Textile Manufacturing"
              className="w-full rounded-xl shadow-lg object-cover h-64 sm:h-80 md:h-96"
            />
            <div className="absolute -bottom-5 -left-4 bg-white shadow-md rounded-lg px-5 py-3">
              <p className="text-pink-600 font-bold text-xl">500+</p>
              <p className="text-gray-600 text-sm">Happy Brands</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600 text-center text-white">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Ready to Create Something Amazing?
        </h2>
        <p className="text-pink-100 text-base sm:text-lg max-w-2xl mx-auto mb-8">
          Join hundreds of brands that trust us for their fabric needs. Start
          your journey with custom textiles today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-white text-pink-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all w-full sm:w-auto"
          >
            Get Started
          </Link>
          <Link
            to="/products"
            className="border-2 border-white hover:bg-white hover:text-pink-600 px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all w-full sm:w-auto"
          >
            Browse Collections
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
