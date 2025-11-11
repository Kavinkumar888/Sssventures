import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-200">
      <div className="container mx-auto px-5 py-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4 text-white">⚪ SSS Ventures</div>
            <p className="text-gray-400 mb-5 leading-relaxed">
              Your trusted partner for premium quality textiles and modern
              fabric solutions since 1970.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Mail].map((Icon, index) => (
                <button
                  key={index}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Products", "About Us", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              {[
                "Sarees",
                "Dresses",
                "Kurtis",
                "Men's Wear",
                "Accessories",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 SSS Ventures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
