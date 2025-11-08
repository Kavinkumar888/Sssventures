import React from "react";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    addToCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 border-b">
        <h2 className="text-xl font-bold text-pink-600">Your Cart</h2>
        <button onClick={() => setIsCartOpen(false)}>
          <X size={22} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-5 overflow-y-auto h-[70%]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your cart is empty 🛍️</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4 border-b pb-2"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  <Minus size={14} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-green-500 text-white p-1 rounded"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t p-5">
        <div className="flex justify-between mb-4 font-semibold">
          <span>Total:</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={clearCart}
          className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
