// src/components/Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
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
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  const cartCount = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Dyeable[RFD]" },
    { path: "/Dyed",label: "Dyed"},
    { path: "/contact", label: "Contact Us" },
  ];

  // 🔍 Handle Search
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
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-pink-600 cursor-pointer select-none"
        >
          🏵️ TextileHub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-semibold transition-all duration-300 ${
                location.pathname === item.path
                  ? "text-pink-600 border-b-2 border-pink-600"
                  : "text-gray-700 hover:text-pink-500"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center border border-gray-300 rounded-full px-3 py-1 bg-white shadow-sm focus-within:ring-2 focus-within:ring-pink-500 transition-all"
        >
          <input
            type="text"
            placeholder="Search products..."
            className="px-2 py-1 text-sm w-40 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="text-gray-500 hover:text-pink-600">
            <Search size={18} />
          </button>
        </form>

        {/* Cart + Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-pink-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-inner">
          <div className="p-4">
            {/* 🔍 Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="flex items-center border border-gray-300 rounded-full px-3 py-1 mb-4 bg-white shadow-sm"
            >
              <input
                type="text"
                placeholder="Search products..."
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

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 font-semibold transition-all ${
                  location.pathname === item.path
                    ? "bg-pink-600 text-white"
                    : "text-gray-700 hover:bg-pink-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
