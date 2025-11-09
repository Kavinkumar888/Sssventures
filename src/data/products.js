// src/data/products.js
export const categories = [
  {
    id: 'WovenFabric',
    name: 'WovenFabric',
    image: 'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
    description: 'Traditional and contemporary sarees'
  },
  {
    id: 'SustainableFabric',
    name: 'SustainableFabric',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    description: 'Western and ethnic dresses'
  },
  {
    id: 'GreigeFabric',
    name: 'GreigeFabric',
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400',
    description: 'Children clothing'
  },
  {
    id: 'Buy Swatches',
    name: 'Buy Swatches',
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400',
    description: 'Jewelry and fashion accessories'
  }
];

export const subCategories = {
  WovenFabric: ['Silk', 'Cotton', 'Viscose', 'Model', 'Linen','Bambo','Banana','Hemb'],
  SustainableFabric: ['LENZING Fabric', 'LIVA Fabric', 'BEMBERG CUPRO', 'Organic Cotton'],
  GreigeFabric: ['Boys', 'Girls', 'Infants', 'Party', 'Casual'],
  BuySwatches: ['Jewelry', 'Bags', 'Footwear', 'Belts', 'Scarves']
};

export const products = [
  // Sarees - Silk
  {
    id: 'saree-silk-1',
    name: 'Kanjivaram Silk',
    price: 12500,
    originalPrice: 15000,
    category: 'WovenFabric',
    subCategory: 'Silk',
    image: 'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
    images: [
      'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
      'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400'
    ],
    rating: 4.8,
    reviews: 124,
    description: 'Pure Kanjivaram silk saree with golden zari work',
    features: ['Pure Silk', 'Zari Work', 'Traditional', 'Premium'],
    inStock: true,
    tags: ['silk', 'kanjivaram', 'traditional', 'premium']
  },
  {
    id: 'saree-silk-2',
    name: 'Banarasi Silk',
    price: 8900,
    originalPrice: 11000,
    category: 'WovenFabric',
    subCategory: 'Silk',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400',
    rating: 4.7,
    reviews: 89,
    description: 'Authentic Banarasi silk with intricate brocade work',
    features: ['Banarasi', 'Brocade', 'Elegant', 'Festive'],
    inStock: true,
    tags: ['banarasi', 'silk', 'brocade', 'festive']
  },

  // Sarees - Cotton
  {
    id: 'saree-cotton-1',
    name: 'Cotton Printed',
    price: 2500,
    originalPrice: 3200,
    category: 'WovenFabric',
    subCategory: 'Cotton',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    rating: 4.5,
    reviews: 67,
    description: 'Comfortable cotton saree with block print',
    features: ['Pure Cotton', 'Hand Block', 'Comfort', 'Daily Wear'],
    inStock: true,
    tags: ['cotton', 'printed', 'comfort', 'dailywear']
  },
  {
    id: 'saree-cotton-2',
    name: 'Cotton Kanchi',
    price: 3200,
    originalPrice: 4000,
    category: 'WovenFabric',
    subCategory: 'Cotton',
    image: 'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
    rating: 4.3,
    reviews: 45,
    description: 'Traditional Kanchi cotton saree with border',
    features: ['Kanchi', 'Cotton', 'Border', 'Traditional'],
    inStock: true,
    tags: ['cotton', 'kanchi', 'traditional', 'border']
  },

  // Sarees - Viscose
  {
    id: 'saree-georgette-1',
    name: 'Georgette Party',
    price: 4500,
    originalPrice: 5500,
    category: 'WovenFabric',
    subCategory: 'Viscose',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400',
    rating: 4.6,
    reviews: 78,
    description: 'Elegant georgette saree for party wear',
    features: ['Georgette', 'Party Wear', 'Sequins', 'Elegant'],
    inStock: true,
    tags: ['georgette', 'party', 'sequins', 'elegant']
  },

  // Dresses - Casual
  {
    id: 'dress-casual-1',
    name: 'Casual Maxi',
    price: 1800,
    originalPrice: 2200,
    category: 'SustainableFabric',
    subCategory: 'Casual',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    rating: 4.4,
    reviews: 56,
    description: 'Comfortable casual maxi dress for daily wear',
    features: ['Cotton', 'Comfort', 'Daily Wear', 'Relaxed Fit'],
    inStock: true,
    tags: ['casual', 'maxi', 'cotton', 'comfort']
  },
  {
    id: 'dress-casual-2',
    name: 'Summer Dress',
    price: 1500,
    originalPrice: 1900,
    category: 'SustainableFabric',
    subCategory: 'Casual',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400',
    rating: 4.2,
    reviews: 34,
    description: 'Light summer dress with floral print',
    features: ['Summer', 'Floral', 'Light', 'Breathable'],
    inStock: true,
    tags: ['summer', 'floral', 'light', 'casual']
  },

  // Dresses - Party
  {
    id: 'dress-party-1',
    name: 'Evening Gown',
    price: 6500,
    originalPrice: 8000,
    category: 'SustainableFabric',
    subCategory: 'Party',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    rating: 4.7,
    reviews: 92,
    description: 'Elegant evening gown for special occasions',
    features: ['Evening', 'Elegant', 'Sequins', 'Party Wear'],
    inStock: true,
    tags: ['evening', 'gown', 'party', 'elegant']
  },

  // Dresses - Traditional
  {
    id: 'dress-traditional-1',
    name: 'Lehenga Dress',
    price: 5500,
    originalPrice: 6800,
    category: 'SustainableFabric',
    subCategory: 'Traditional',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400',
    rating: 4.5,
    reviews: 67,
    description: 'Traditional lehenga style dress with embroidery',
    features: ['Lehenga', 'Embroidery', 'Traditional', 'Festive'],
    inStock: true,
    tags: ['lehenga', 'traditional', 'embroidery', 'festive']
  },

  // Kurtis - Anarkali
  {
    id: 'kurti-anarkali-1',
    name: 'Anarkali Kurti',
    price: 2200,
    originalPrice: 2800,
    category: 'Schiffli',
    subCategory: 'Anarkali',
    image: 'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
    rating: 4.6,
    reviews: 89,
    description: 'Flowy Anarkali kurti with chikan work',
    features: ['Anarkali', 'Flowy', 'Chikan', 'Elegant'],
    inStock: true,
    tags: ['anarkali', 'floral', 'chikan', 'elegant']
  },
  {
    id: 'kurti-anarkali-2',
    name: 'Designer Anarkali',
    price: 3200,
    originalPrice: 4000,
    category: 'Schiffli',
    subCategory: 'Anarkali',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400',
    rating: 4.8,
    reviews: 112,
    description: 'Designer Anarkali with stone and sequin work',
    features: ['Designer', 'Stone Work', 'Sequin', 'Party Wear'],
    inStock: true,
    tags: ['designer', 'anarkali', 'stonework', 'party']
  },

  // Kurtis - Straight
  {
    id: 'kurti-straight-1',
    name: 'Straight Cut',
    price: 1200,
    originalPrice: 1500,
    category: 'Schiffli',
    subCategory: 'Straight',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    rating: 4.3,
    reviews: 45,
    description: 'Comfortable straight cut kurti for daily wear',
    features: ['Straight', 'Comfort', 'Daily Wear', 'Cotton'],
    inStock: true,
    tags: ['straight', 'cotton', 'comfort', 'dailywear']
  },

  // Kurtis - Printed
  {
    id: 'kurti-printed-1',
    name: 'Printed Kurti',
    price: 1400,
    originalPrice: 1800,
    category: 'Schiffli',
    subCategory: 'Printed',
    image: 'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
    rating: 4.4,
    reviews: 78,
    description: 'Trendy printed kurti with contemporary design',
    features: ['Printed', 'Trendy', 'Contemporary', 'Fashion'],
    inStock: true,
    tags: ['printed', 'trendy', 'contemporary', 'fashion']
  },

  // Mens - Kurtas
  {
    id: 'mens-kurta-1',
    name: 'Cotton Kurta',
    price: 1800,
    originalPrice: 2200,
    category: 'KnittedFabric',
    subCategory: 'Kurtas',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    rating: 4.5,
    reviews: 67,
    description: 'Comfortable cotton kurta for daily wear',
    features: ['Cotton', 'Comfort', 'Traditional', 'Daily Wear'],
    inStock: true,
    tags: ['kurta', 'cotton', 'traditional', 'comfort']
  },
  {
    id: 'mens-kurta-2',
    name: 'Designer Kurta',
    price: 3500,
    originalPrice: 4200,
    category: 'KnittedFabric',
    subCategory: 'Kurtas',
    image: 'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
    rating: 4.7,
    reviews: 89,
    description: 'Designer kurta with embroidery for festive occasions',
    features: ['Designer', 'Embroidery', 'Festive', 'Premium'],
    inStock: true,
    tags: ['designer', 'kurta', 'embroidery', 'festive']
  },

  // Mens - Shirts
  {
    id: 'mens-shirt-1',
    name: 'Formal Shirt',
    price: 1600,
    originalPrice: 2000,
    category: 'KnittedFabric',
    subCategory: 'Shirts',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    rating: 4.4,
    reviews: 56,
    description: 'Classic formal shirt for office wear',
    features: ['Formal', 'Office', 'Classic', 'Cotton'],
    inStock: true,
    tags: ['formal', 'shirt', 'office', 'cotton']
  },

  // Kids - Boys
  {
    id: 'kids-boys-1',
    name: 'Boys Kurta Set',
    price: 1200,
    originalPrice: 1500,
    category: 'GreigeFabric',
    subCategory: 'Boys',
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400',
    rating: 4.6,
    reviews: 34,
    description: 'Traditional kurta set for boys',
    features: ['Traditional', 'Comfort', 'Kids', 'Festive'],
    inStock: true,
    tags: ['boys', 'kurta', 'traditional', 'kids']
  },

  // Kids - Girls
  {
    id: 'kids-girls-1',
    name: 'Girls Frock',
    price: 1000,
    originalPrice: 1300,
    category: 'GreigeFabric',
    subCategory: 'Girls',
    image: 'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
    rating: 4.5,
    reviews: 29,
    description: 'Beautiful frock for little girls',
    features: ['Frock', 'Girls', 'Comfort', 'Colorful'],
    inStock: true,
    tags: ['girls', 'frock', 'colorful', 'kids']
  },

  // Accessories - Jewelry
  {
    id: 'accessory-jewelry-1',
    name: 'Necklace Set',
    price: 2500,
    originalPrice: 3200,
    category: 'BuySwatches',
    subCategory: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400',
    rating: 4.7,
    reviews: 123,
    description: 'Traditional necklace set with matching earrings',
    features: ['Necklace', 'Traditional', 'Set', 'Earrings'],
    inStock: true,
    tags: ['jewelry', 'necklace', 'traditional', 'set']
  },
  {
    id: 'accessory-jewelry-2',
    name: 'Bangle Set',
    price: 800,
    originalPrice: 1200,
    category: 'BuySwatches',
    subCategory: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400',
    rating: 4.3,
    reviews: 67,
    description: 'Beautiful bangle set for traditional wear',
    features: ['Bangles', 'Traditional', 'Set', 'Colorful'],
    inStock: true,
    tags: ['bangles', 'traditional', 'colorful', 'jewelry']
  },

  // Accessories - Bags
  {
    id: 'accessory-bag-1',
    name: 'Clutch Bag',
    price: 1500,
    originalPrice: 2000,
    category: 'BuySwatches',
    subCategory: 'Bags',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    rating: 4.4,
    reviews: 89,
    description: 'Elegant clutch bag for party wear',
    features: ['Clutch', 'Party', 'Elegant', 'Designer'],
    inStock: true,
    tags: ['clutch', 'bag', 'party', 'elegant']
  },

  // Accessories - Footwear
  {
    id: 'accessory-footwear-1',
    name: 'Traditional Sandals',
    price: 1800,
    originalPrice: 2200,
    category: 'BuySwatches',
    subCategory: 'Footwear',
    image: 'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
    rating: 4.5,
    reviews: 78,
    description: 'Comfortable traditional sandals',
    features: ['Sandals', 'Traditional', 'Comfort', 'Leather'],
    inStock: true,
    tags: ['sandals', 'traditional', 'comfort', 'footwear']
  }
];

// Helper functions
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const getProductsBySubCategory = (category, subCategory) => {
  return products.filter(product => 
    product.category === category && product.subCategory === subCategory
  );
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.rating >= 4.5).slice(0, 6);
};

export const getProductsByTags = (tags) => {
  return products.filter(product => 
    tags.some(tag => product.tags.includes(tag))
  );
};

export const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    product.category.toLowerCase().includes(lowerQuery) ||
    product.subCategory.toLowerCase().includes(lowerQuery)
  );
};

export const getRelatedProducts = (currentProduct, limit = 4) => {
  return products
    .filter(product => 
      product.id !== currentProduct.id && 
      (product.category === currentProduct.category || 
       product.tags.some(tag => currentProduct.tags.includes(tag)))
    )
    .slice(0, limit);
};