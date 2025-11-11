import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart, Menu, X, Search, User, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import Login from "./Login";

const Header = () => {
  const { cartItems, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const headerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
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

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 transition-all duration-300 border-b border-gray-100"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">SSS Ventures</h1>
              <p className="text-xs text-gray-500">Textile Solutions</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-semibold transition-all duration-300 relative py-2 ${
                  location.pathname === item.path
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Search & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="flex items-center border border-gray-200 rounded-full px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-pink-500 transition-all duration-300"
            >
              <input
                type="text"
                placeholder="Search fabrics..."
                className="px-2 py-1 text-sm w-48 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="text-gray-400 hover:text-pink-600 transition-colors duration-300"
              >
                <Search size={18} />
              </button>
            </form>

            {/* User Auth Section */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-4 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-800">Hi, {user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300 bg-white rounded-full shadow-sm hover:shadow-md"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <User size={18} />
                <span>Login</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 text-gray-600 hover:text-gray-900 transition-all duration-300 bg-white rounded-full shadow-sm hover:shadow-md group"
            >
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center animate-bounce shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Login Button - Mobile */}
            {!user && (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors bg-white rounded-full shadow-sm"
              >
                <User size={20} />
              </button>
            )}

            {/* Cart Button - Mobile */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="p-2 text-gray-600 hover:text-gray-900 transition-transform duration-300 bg-white rounded-full shadow-sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-xl overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-[600px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="p-6 space-y-6">
            {/* User Info */}
            {user && (
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <User size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-pink-600 font-medium">Verified</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors duration-300 bg-white rounded-full shadow-sm"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}

            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-pink-500 transition-all duration-300"
            >
              <Search size={18} className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search fabrics, dyes, finishes..."
                className="flex-grow bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* Navigation Links */}
            <div className="grid grid-cols-1 gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-4 rounded-xl font-semibold transition-all duration-300 group ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-gray-100"
                  }`}
                >
                  <span>{item.label}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    location.pathname === item.path ? "bg-white" : "bg-pink-500"
                  }`}></div>
                </Link>
              ))}
            </div>

            {/* Login Prompt for Mobile */}
            {!user && (
              <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl text-center">
                <p className="text-white text-sm mb-3">Get personalized recommendations</p>
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-white text-pink-600 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Login / Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Header;