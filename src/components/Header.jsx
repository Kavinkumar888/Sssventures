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
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const cartCount = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Dye" },
    { path: "/Dyed", label: "Fabric Structure" },
    { path: "/fabrics", label: "Fabrics Finish" },
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
      className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-md z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-pink-600 cursor-pointer select-none"
        >
          🏵️ SSS Ventures
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

        {/* Desktop Search */}
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

        {/* Cart + Mobile Menu Button */}
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
            className="md:hidden p-2 text-gray-700 hover:text-pink-600 transition-transform duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-5 space-y-5">
          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-300 rounded-full px-3 py-2 bg-gray-50 shadow-sm"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="px-2 py-1 text-sm flex-grow bg-transparent focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="text-gray-500 hover:text-pink-600 transition-colors"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-semibold text-center transition-all ${
                  location.pathname === item.path
                    ? "bg-pink-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
