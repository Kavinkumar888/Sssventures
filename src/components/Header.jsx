import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart, Menu, X, Search, LogIn } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const Header = () => {
  const { cartItems, setIsCartOpen } = useCart();
  const headerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const cartCount = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Dyeable[RFD]" },
    { path: "/Dyed", label: "Dyed" },
    { path: "/contact", label: "Contact Us" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-md z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* 🏵️ Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-pink-600 cursor-pointer select-none"
        >
          🏵️ TextileHub
        </Link>

        {/* 🔍 Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center border border-gray-300 rounded-full px-3 py-1 bg-white shadow-sm focus-within:ring-2 focus-within:ring-pink-500 transition-all"
        >
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 text-sm w-40 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="text-gray-500 hover:text-pink-600">
            <Search size={18} />
          </button>
        </form>

        {/* 🛒 Icons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors duration-300"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* 👤 Login Button */}
          <Link
            to="/login"
            className="hidden md:flex items-center gap-1 text-gray-700 hover:text-pink-600 font-medium transition-all"
          >
            <LogIn size={20} />
            <span>Login</span>
          </Link>

          {/* ☰ Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-pink-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Navigation */}
      <div
        className={`md:hidden bg-white border-t shadow-inner transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="p-4 space-y-3">
          {/* 🔍 Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-300 rounded-full px-3 py-2 bg-white shadow-sm"
          >
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 text-sm flex-grow focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="text-gray-500 hover:text-pink-600"
            >
              <Search size={18} />
            </button>
          </form>

          {/* 📁 Mobile Nav Links */}
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-md font-medium text-center transition-all ${
                location.pathname === item.path
                  ? "bg-pink-600 text-white shadow"
                  : "text-gray-700 hover:bg-pink-50"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* 👤 Login Button for Mobile */}
          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-center px-4 py-2 bg-pink-600 text-white font-semibold rounded-md shadow hover:bg-pink-700 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
