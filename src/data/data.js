// src/data/products.js
export const categories = [
  {
    id: 'Mill Dyed',
    name: 'Mill Dyed',
    image: 'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
    description: 'Traditional and contemporary sarees'
  },
  {
    id: 'yarnDyed',
    name: 'yarnDyed',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    description: 'Western and ethnic dresses'
  },
  {
    id: 'Denim',
    name: 'Denim',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400',
    description: 'Casual and designer kurtis'
  },
];
export const subCategories = {
  MillDyed: ["coton", "Vescose", "Linezing", "Linen"],
  yarnDyed: ["Explore Fabrics","Buy sample yardage"],
  Denim: ["Explore Fabrics"," Buy sample yardage"]
};

// Dyed Products Data
export const dyedProducts = [
  {
    id: "dyed-1",
    name: "Red Dyed Cotton Saree",
    price: 2500,
    description: "Beautiful red dyed cotton saree with traditional patterns",
    image: "https://images.unsplash.com/photo-1585487000116-76588d8d61e6?w=400",
    category: "Milldyed",
    subCategory: "coton",
    tags: ["red", "cotton", "saree", "dyed", "traditional"]
  },
  {
    id: "dyed-2",
    name: "Blue Silk Dyed Saree",
    price: 4500,
    description: "Elegant blue dyed silk saree with zari border",
    image: "https://images.unsplash.com/photo-1566479177266-95eed06db6dd?w=400",
    category: "Vescose",
    subCategory: "Silk Dyed",
    tags: ["blue", "silk", "saree", "dyed", "zari"]
  },
  {
    id: "dyed-3",
    name: "Green Art Silk Dyed Dress",
    price: 3200,
    description: "Green art silk dyed dress material with matching blouse",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400",
    category: "Milldyed",
    subCategory: "Art Silk Dyed",
    tags: ["green", "art silk", "dress", "dyed", "blouse"]
  },
  {
    id: "dyed-4",
    name: "Yellow Dyed Kurti",
    price: 1800,
    description: "Bright yellow dyed cotton kurti with embroidery work",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    category: "Milldyed",
    subCategory: "Linezing",
    tags: ["yellow", "cotton", "kurti", "dyed", "embroidery"]
  },
  {
    id: "dyed-5",
    name: "Purple Dyed Lehenga",
    price: 6800,
    description: "Royal purple dyed lehenga with heavy embroidery",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
    category: "Milldyed",
    subCategory: "Linezing",
    tags: ["purple", "silk", "lehenga", "dyed", "embroidery"]
  },
  {
    id: "dyed-6",
    name: "Orange Dyed Dupatta",
    price: 1200,
    description: "Vibrant orange dyed dupatta with print work",
    image: "https://images.unsplash.com/photo-1581138180111-3415c14d7c6c?w=400",
    category: "dyed",
    subCategory: "Linezing",
    tags: ["orange", "art silk", "dupatta", "dyed", "print"]
  },
  {
    id: "dyed-7",
    name: "Pink Dyed Salwar Suit",
    price: 3500,
    description: "Pretty pink dyed salwar suit with stone work",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400",
    category: "Milldyed",
    subCategory: "Linen",
    tags: ["pink", "cotton", "salwar", "dyed", "stone work"]
  },
  {
    id: "dyed-8",
    name: "Multi-color Dyed Saree",
    price: 5200,
    description: "Multi-color dyed silk saree with contrast border",
    image: "https://images.unsplash.com/photo-1566479177266-95eed06db6dd?w=400",
    category: "Milldyed",
    subCategory: "Linen",
    tags: ["multicolor", "silk", "saree", "dyed", "contrast"]
  }
];

// Original RFD Products (Dyeable)
export const products = [
  {
    id: "1",
    name: "Cotton Saree RFD",
    price: 1200,
    description: "Pure cotton ready for dyeing saree",
    image: "https://images.unsplash.com/photo-1585487000116-76588d8d61e6?w=400",
    category: "yarnDyed",
    subCategory: "Explore Fabrics",
    tags: ["cotton", "saree", "rfd", "dyeable"]
  },
  {
    id: "2",
    name: "Silk Dress Material RFD",
    price: 3500,
    description: "Pure silk dress material ready for dyeing",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400",
    category: "yarnDyed",
    subCategory: "Explore Fabrics",
    tags: ["silk", "dress", "rfd", "dyeable"]
  },
  {
    id: "3",
    name: "Cotton Kurti RFD",
    price: 800,
    description: "Cotton kurti ready for dyeing",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    category: "yarnDyed",
    subCategory: "Explore Fabrics",
    tags: ["cotton", "kurti", "rfd", "dyeable"]
  },
  {
    id: "4",
    name: "Lehenga Fabric RFD",
    price: 4500,
    description: "Lehenga fabric ready for dyeing",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
    category: "Denim",
    subCategory: "Explore Fabrics",
    tags: ["lehenga", "fabric", "rfd", "dyeable"]
  }
];

// Export all products combined
export const allProducts = [...products, ...dyedProducts];