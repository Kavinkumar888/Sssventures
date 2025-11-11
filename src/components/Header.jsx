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
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const cartCount = cartItems?.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Dye" },
    { path: "/Dyed", label: "Fabric Structure" },
    { path: "/fabrics", label: "Fabrics Finish" },
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
      className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 cursor-pointer select-none"
        >
          ⚪ SSS Ventures
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-semibold transition-all duration-300 ${
                location.pathname === item.path
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center border border-gray-300 rounded-full px-3 py-1 bg-gray-50 shadow-sm focus-within:ring-2 focus-within:ring-gray-400 transition-all"
        >
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 text-sm w-40 bg-transparent focus:outline-none text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="text-gray-500 hover:text-black">
            <Search size={18} />
          </button>
        </form>

        {/* Cart + Mobile Menu */}
        <div className="flex items-center space-x-3">
          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-700 hover:text-black transition-colors duration-300"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gray-800 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-black transition-transform duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-[480px] opacity-100"
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
              className="px-2 py-1 text-sm flex-grow bg-transparent focus:outline-none text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="text-gray-500 hover:text-black transition-colors"
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
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
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
