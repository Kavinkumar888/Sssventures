// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";

// Pages
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Dyed from "./Pages/Dyed";
import Contact from "./Pages/Contactus";
import Fabrics from "./Pages/fabrics"; // Make sure filename is correct (capital F)

// Context
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
            {/* Header always at top */}
            <Header />

            {/* Page content */}
            <main className="flex-grow pt-20 pb-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/dyed" element={<Dyed />} />
                <Route path="/fabrics" element={<Fabrics />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>

            {/* Footer always at bottom */}
            <Footer />

            {/* Global Cart Component */}
            <Cart />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
