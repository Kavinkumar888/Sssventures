import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories, subCategories, dyedProducts } from "../data/fabricsdata";
import { useCart } from "../context/CartContext";

// ✅ Register GSAP plugin safely
gsap.registerPlugin(ScrollTrigger);

const fabrics = () => {
  const [filteredProducts, setFilteredProducts] = useState(dyedProducts);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const sectionRef = useRef(null);
  const location = useLocation();
  const { addToCart } = useCart();

  // ✅ Get search term from URL (like /dyed?search=saree)
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search")?.toLowerCase() || "";

  // ✅ Filter logic (search + category + subcategory)
  useEffect(() => {
    let filtered = dyedProducts;

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
    console.log(`${product.name} added to cart!`);
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-gray-50 py-4 sm:py-10">
      <div className="container mx-auto px-3 sm:px-4">
        {/* ✅ MOBILE FILTER BUTTON */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {searchTerm
              ? `"${searchTerm}"`
              : activeCategory
              ? `${categories.find((c) => c.id === activeCategory)?.name}`
              : "Dyed Products"}
          </h1>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm"
          >
            <span>Filters</span>
            <svg 
              className={`w-4 h-4 transition-transform ${showSidebar ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
          {/* ✅ MOBILE SIDEBAR OVERLAY */}
          {showSidebar && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setShowSidebar(false)}
            />
          )}

          {/* ✅ SIDEBAR - Mobile & Desktop */}
          <aside className={`
            w-full md:w-64 bg-white shadow-lg rounded-xl p-4 h-fit
            md:sticky md:top-24
            ${showSidebar 
              ? 'fixed left-0 top-0 h-full z-50 w-80 overflow-y-auto transform translate-x-0 transition-transform duration-300' 
              : 'fixed -left-full top-0 h-full z-50 w-80 overflow-y-auto transform -translate-x-full transition-transform duration-300 md:relative md:translate-x-0 md:left-0'
            }
          `}>
            {/* Mobile Close Button */}
            <div className="flex justify-between items-center mb-4 md:hidden">
              <h2 className="text-xl font-bold text-gray-800">Filters</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 hidden md:block">
              Categories
            </h2>
            
            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat.id}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setActiveSubCategory(null);
                      setShowSidebar(false); // Close sidebar on mobile when category is selected
                    }}
                    className={`w-full text-left font-semibold py-3 px-3 rounded-lg transition ${
                      activeCategory === cat.id
                        ? "bg-pink-600 text-white"
                        : "text-gray-700 hover:bg-pink-50"
                    }`}
                  >
                    {cat.name}
                  </button>

                  {activeCategory === cat.id && (
                    <div className="ml-3 mt-2 space-y-2">
                      {subCategories[cat.id]?.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => {
                            setActiveSubCategory(sub);
                            setShowSidebar(false); // Close sidebar on mobile when subcategory is selected
                          }}
                          className={`block text-left w-full text-sm px-3 py-2 rounded-md transition ${
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

              {(activeCategory || searchTerm) && (
                <button
                  onClick={() => {
                    setActiveCategory(null);
                    setActiveSubCategory(null);
                    setShowSidebar(false);
                  }}
                  className="w-full mt-4 py-3 text-sm font-semibold bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 transition"
                >
                  Clear Filters ✖
                </button>
              )}
            </div>
          </aside>

          {/* ✅ RIGHT SIDE PRODUCTS */}
          <main className="flex-1">
            {/* Desktop Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center md:text-left hidden md:block">
              {searchTerm
                ? `Search Results for "${searchTerm}"`
                : activeCategory
                ? `${categories.find((c) => c.id === activeCategory)?.name}`
                : "All Dyed Products"}
            </h1>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                    />
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                        {product.name}
                      </h3>
                      <p className="text-pink-600 font-bold mb-1 text-sm sm:text-base">
                        ₹{product.price.toLocaleString()}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mb-3">
                        {product.description.slice(0, 40)}...
                      </p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-pink-600 text-white py-2 sm:py-2 rounded-lg hover:bg-pink-700 transition text-sm sm:text-base"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 sm:py-20">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                  No products found
                </h2>
                <p className="text-gray-500 text-sm sm:text-base">
                  Try searching with a different name or clear filters.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default fabrics;