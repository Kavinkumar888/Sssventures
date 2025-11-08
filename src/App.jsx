// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import Dyed from "./Pages/Dyed"; // ✅ consistent casing (Productss → Dyed)
import Contact from "./pages/ContactUs";
// Context
import { CartProvider } from "./context/CartContext";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col">
          {/* ✅ Header (fixed) */}
          <Header />

          {/* ✅ Main Content */}
          <main className="flex-grow pt-20 pb-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/dyed" element={<Dyed />} /> {/* renamed route */}
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          {/* ✅ Footer + Cart */}
          <Footer />
          <Cart />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
