import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { categories, subCategories, products } from "../data/products";
import { useCart } from "../context/CartContext"; // ✅ Import useCart

const Product = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const sectionRef = useRef(null);
  const location = useLocation();
  const { addToCart } = useCart(); // ✅ Get addToCart function

  // ✅ Get search term from URL (like /products?search=saree)
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search")?.toLowerCase() || "";

  // ✅ Filter logic (search + category + subcategory)
  useEffect(() => {
    let filtered = products;

    if (activeCategory) {
      filtered = filtered.filter(
        (product) => product.category === activeCategory
      );
    }

    if (activeSubCategory) {
      filtered = filtered.filter(
        (product) => product.subCategory === activeSubCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );

      // ✅ Sort so that exact/close matches come first
      filtered.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        const aExact = aName === searchTerm;
        const bExact = bName === searchTerm;
        const aStarts = aName.startsWith(searchTerm);
        const bStarts = bName.startsWith(searchTerm);

        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return aName.localeCompare(bName);
      });
    }

    setFilteredProducts(filtered);

    // ✅ GSAP animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [activeCategory, activeSubCategory, searchTerm]);

  // ✅ Handle Add to Cart
  const handleAddToCart = (product) => {
    addToCart(product);
    // Optional: Show success message or animation
    console.log(`${product.name} added to cart!`);
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* ✅ LEFT SIDEBAR */}
        <aside className="w-full md:w-64 bg-white shadow-md rounded-xl p-4 h-fit sticky top-24">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            Categories
          </h2>
          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.id}>
                <button
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveSubCategory(null);
                  }}
                  className={`w-full text-left font-semibold py-2 px-3 rounded-lg transition ${
                    activeCategory === cat.id
                      ? "bg-pink-600 text-white"
                      : "text-gray-700 hover:bg-pink-50"
                  }`}
                >
                  {cat.name}
                </button>

                {/* ✅ Show subcategories when category active */}
                {activeCategory === cat.id && (
                  <div className="ml-3 mt-2 space-y-2">
                    {subCategories[cat.id].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setActiveSubCategory(sub)}
                        className={`block text-left w-full text-sm px-3 py-1 rounded-md transition ${
                          activeSubCategory === sub
                            ? "bg-pink-500 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* ✅ Reset Filters */}
            {(activeCategory || searchTerm) && (
              <button
                onClick={() => {
                  setActiveCategory(null);
                  setActiveSubCategory(null);
                }}
                className="w-full mt-4 py-2 text-sm font-semibold bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 transition"
              >
                Clear Filters ✖
              </button>
            )}
          </div>
        </aside>

        {/* ✅ RIGHT SIDE PRODUCTS */}
        <main className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">
            {searchTerm
              ? `Search Results for "${searchTerm}"`
              : activeCategory
              ? `${categories.find((c) => c.id === activeCategory)?.name}`
              : "All Products"}
          </h1>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-pink-600 font-bold mb-1">
                      ₹{product.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      {product.description.slice(0, 50)}...
                    </p>
                    <button 
                      onClick={() => handleAddToCart(product)} // ✅ Add to Cart function
                      className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No products found
              </h2>
              <p className="text-gray-500">
                Try searching with a different name or clear filters.
              </p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default Product;