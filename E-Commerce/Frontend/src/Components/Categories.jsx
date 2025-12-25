import React, { useState, useEffect } from "react";

const Categories = ({ darkMode = false }) => {
  // Products data - easy to modify
  const products = [
    {
      id: 1,
      title: "Dried Apricots",
      desc: "Sun-dried and packed to preserve freshness.",
      price: "$12.99",
      oldPrice: "$15.99",
      rating: "4.8",
      img: "https://dailysuccessfulliving.com/wp-content/uploads/2020/08/Sugar-Free-Dehydrated-Apricots.jpg"
    },
    {
      id: 2,
      title: "Dried Walnuts",
      desc: "Rich in antioxidants and omega-3 fatty acids.",
      price: "$10.99",
      oldPrice: "$11.99",
      rating: "4.8",
      img: "https://exotikalhub.com/wp-content/uploads/2021/02/walnut.jpg"
    },
    {
      id: 3,
      title: "Pure Shilajit",
      desc: "Natural supplement for energy and vitality.",
      price: "$24.99",
      oldPrice: "$29.99",
      rating: "4.9",
      img: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/f0a2c141-9f43-4ec2-bc96-e13b54871269.__CR0,0,970,600_PT0_SX970_V1___.jpg"
    },
    {
      id: 4,
      title: "Dried Almonds",
      desc: "Premium almonds with vitamin E and healthy fats.",
      price: "$14.99",
      oldPrice: "$17.99",
      rating: "4.7",
      img: "https://cdn.britannica.com/04/194904-050-1B92812A/Raw-Food-Almond-food-Nut-Snack.jpg"
    },
    {
      id: 5,
      title: "Golden Raisins",
      desc: "Sweet golden raisins for snacks and cooking.",
      price: "$8.99",
      oldPrice: "$10.99",
      rating: "4.6",
      img: "https://attarayurveda.com/wp-content/uploads/2017/11/81quI-W0UJL._SL1500_-compressor.jpg"
    },
    {
      id: 6,
      title: "Black Raisins",
      desc: "Dark raisins rich in iron and energy.",
      price: "$9.99",
      oldPrice: "$12.99",
      rating: "4.5",
      img: "https://thumbs.dreamstime.com/z/black-raisin-kali-kishmish-wooden-surface-zante-currant-white-plate-dark-gothic-colors-to-decreases-chance-113151164.jpg"
    },
    {
      id: 7,
      title: "Cashew Nuts",
      desc: "Creamy cashews for snacking and recipes.",
      price: "$16.99",
      oldPrice: "$19.99",
      rating: "4.7",
      img: "http://pngimg.com/uploads/cashew/cashew_PNG11.png"
    },
    {
      id: 8,
      title: "Pistachios",
      desc: "Roasted pistachios with satisfying crunch.",
      price: "$18.99",
      oldPrice: "$22.99",
      rating: "4.8",
      img: "https://www.nutsinbulk.co.uk/files/items/nuts/pistachios_roasted_salted.jpg"
    }
  ];

  // State variables
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);

  // CSS Classes for dark mode - Easy to understand
  const styles = {
    // Background colors
    sectionBg: darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100',
    cardBg: darkMode ? 'bg-gray-800' : 'bg-white',
    arrowBg: darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50',
    
    // Text colors
    headingText: darkMode ? 'text-white' : 'text-gray-900',
    paragraphText: darkMode ? 'text-gray-300' : 'text-gray-600',
    cardTitle: darkMode ? 'text-white' : 'text-gray-900',
    cardDesc: darkMode ? 'text-gray-300' : 'text-gray-600',
    cardPrice: darkMode ? 'text-white' : 'text-gray-900',
    oldPrice: darkMode ? 'text-gray-400' : 'text-gray-500',
    
    // Border colors
    cardBorder: darkMode ? 'border-gray-700' : 'border-gray-100',
    arrowBorder: darkMode ? 'border-gray-600' : 'border-gray-200',
    
    // Dot colors
    activeDot: darkMode ? 'bg-amber-400' : 'bg-amber-500',
    inactiveDot: darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
  };

  // Update cards to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2); // Tablet
      } else {
        setCardsToShow(4); // Desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev >= products.length - cardsToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? products.length - cardsToShow : prev - 1
    );
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, cardsToShow]);

  return (
    <section className={`py-12 ${styles.sectionBg} transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-bold mb-3 ${styles.headingText}`}>
            Featured Products
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${styles.paragraphText}`}>
            Discover our premium selection of natural and healthy products
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 ${styles.arrowBg} text-gray-800 w-10 h-10 rounded-full shadow-lg border ${styles.arrowBorder} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl`}
            aria-label="Previous products"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 ${styles.arrowBg} text-gray-800 w-10 h-10 rounded-full shadow-lg border ${styles.arrowBorder} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl`}
            aria-label="Next products"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * (100 / cardsToShow)}%)` 
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / cardsToShow}%` }}
                >
                  <ProductCard product={product} darkMode={darkMode} styles={styles} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: products.length - cardsToShow + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? `${styles.activeDot} w-6` 
                    : `${styles.inactiveDot}`
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product, darkMode, styles }) => {
  return (
    <div className={`rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border ${styles.cardBorder} h-full flex flex-col group ${styles.cardBg}`}>
      
      {/* Product Image */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={product.img}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-2 right-2">
          <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            NEW
          </span>
        </div>
        
        <div className="absolute top-2 left-2">
          <span className={`${darkMode ? 'bg-gray-700 text-amber-400' : 'bg-white text-amber-600'} bg-opacity-95 text-xs font-semibold px-2 py-1 rounded-md flex items-center shadow-sm`}>
            ⭐ {product.rating}
          </span>
        </div>
        
        {/* Discount Badge */}
        <div className="absolute bottom-2 left-2">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {calculateDiscount(product.oldPrice, product.price)}
          </span>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className={`text-base font-bold mb-1 line-clamp-1 ${styles.cardTitle}`}>
          {product.title}
        </h3>
        
        <p className={`text-xs mb-3 line-clamp-2 flex-grow ${styles.cardDesc}`}>
          {product.desc}
        </p>
        
        {/* Price Section */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline space-x-1">
            <span className={`text-lg font-bold ${styles.cardPrice}`}>
              {product.price}
            </span>
            <span className={`text-sm line-through ${styles.oldPrice}`}>
              {product.oldPrice}
            </span>
          </div>
        </div>

        {/* Shop Now Button */}
        <button className={`w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center text-sm`}>
          <span>Shop Now</span>
          <svg 
            className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Helper function to calculate discount
const calculateDiscount = (oldPrice, newPrice) => {
  const old = parseFloat(oldPrice.replace('$', ''));
  const current = parseFloat(newPrice.replace('$', ''));
  const discount = ((old - current) / old) * 100;
  return `Save ${Math.round(discount)}%`;
};

export default Categories;