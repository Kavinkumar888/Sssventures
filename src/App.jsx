// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header"; // ✅
import Footer from "./components/Footer";
import Cart from "./components/Cart";

// Pages  ✅ Fix casing here
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Dyed from "./Pages/Dyed";
import Contact from "./Pages/Contactus";

// Context
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col">
          <Header />
          <main className="flex-grow pt-20 pb-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/dyed" element={<Dyed />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <Cart />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
