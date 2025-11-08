// src/components/Footer.jsx
import React from 'react'
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">🏵️ TextileHub</div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for premium quality textiles and traditional wear since 1970.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Mail].map((Icon, index) => (
                <button
                  key={index}
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Products', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Sarees', 'Dresses', 'Kurtis', "Men's Wear", 'Accessories'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe for updates and offers</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
              />
              <button className="bg-secondary px-4 py-2 rounded-r-lg font-semibold hover:bg-primary transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 TextileHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer