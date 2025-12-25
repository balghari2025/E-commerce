import React from 'react';
import { useCart } from "./CartProvider";

const HerbalHealth = () => {
  const { addToCart } = useCart();

  const herbalProducts = [
    {
      id: 1,
      name: "Herbal Tea",
      price: 12.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQagMr5MEQweBLzWf7wbhnBQydkkKkSjkimJQ&s"
    },
    {
      id: 2,
      name: "Dry Ginger Powder",
      price: 8.99,
      image: "https://nasiriqbalpansar.com/wp-content/uploads/2025/07/GINGERPOWDER.jpg"
    },
    {
      id: 3,
      name: "Tulsi Leaves",
      price: 6.99,
      image: "https://kirtankar.com/wp-content/uploads/2025/09/Tulsi-Plant.jpg"
    },
    {
      id: 4,
      name: "Pure Honey",
      price: 15.99,
      image: "https://theorganic.pk/cdn/shop/files/Organic-Honey-Pakistan-Forest-_8.png?v=1763413864&width=1946"
    },
    {
      id: 5,
      name: "Aloe Vera Gel",
      price: 9.99,
      image: "https://m.media-amazon.com/images/I/819Sw-LZKxL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 6,
      name: "Herbal Oil",
      price: 18.99,
      image: "https://pk.herbion.com/cdn/shop/files/coconut-hair-oil.jpg?v=1696936435"
    },
    {
      id: 7,
      name: "Moringa Powder",
      price: 11.99,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 8,
      name: "Neem Capsules",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1559054663-e8d23213f55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 9,
      name: "Amla Juice",
      price: 10.99,
      image: "https://www.daburshop.com/cdn/shop/files/amla_combo_e2b6dbad-1185-4a10-bd0c-f0ebc16cda6e_600x600.jpg?v=1747037758"
    },
    {
      id: 10,
      name: "Herbal Soap",
      price: 5.99,
      image: "https://static-01.daraz.pk/p/3b235317e6576a63d23b73b856fed002.jpg"
    }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const handleShowMore = (product) => {
    alert(`Showing details for ${product.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          🌿 Herbal & Health Products
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our premium collection of natural herbal products and health supplements for your wellness journey.
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {herbalProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-green-600 font-bold text-xl mb-4">
                  ${product.price}
                </p>
                
                {/* Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 font-medium"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleShowMore(product)}
                    className="flex-1 border border-green-600 text-green-600 py-2 px-4 rounded-lg hover:bg-green-50 transition duration-300 font-medium"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HerbalHealth;