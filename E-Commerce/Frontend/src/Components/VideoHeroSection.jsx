import React, { useState, useEffect } from "react";
import slide1 from "../img/slide1.webp";
import slide2 from "../img/slide2.jpg";
import slide3 from "../img/slide3.jpg";
import slide4 from "../img/slide4.jpg";
import slide5 from "../img/slide5.webp";
import slide6 from "../img/slide6.jpg";
function HeroSlider() {
  const images = [
    { src: slide1, text: "Fresh Natural Apple " },
    { src: slide2, text: "Sweet Skardu DryFruit" },
    { src: slide3, text: "Pure Natural Dry Fruit" },
    { src: slide4, text: "Pure Himalayan Shilajit" },
    { src: slide5, text: "Natural Dry Fruits Akhroot" },
    { src: slide6, text: "Natural Dry Fruits Center" }
  ];

  const [current, setCurrent] = useState(0);

  function changeSlide() {
    let next = current + 1;
    if (next >= images.length) {
      next = 0;
    }
    setCurrent(next);
  }

  useEffect(() => {
    const timer = setInterval(changeSlide, 4000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px] overflow-hidden rounded-lg shadow-xl">
      {/* Background Image */}
      <img
        src={images[current].src}
        alt="slider"
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
      />
      {/* Overlay with Content */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
        {/* Main Heading */}
        <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 lg:mb-8 
                       drop-shadow-lg max-w-4xl leading-tight">
          {images[current].text}
        </h2>
        
        {/* Subtitle (Optional) */}
        <p className="text-sm md:text-lg lg:text-xl mb-4 md:mb-6 lg:mb-8 
                     drop-shadow-md max-w-2xl opacity-95">
          Premium Quality • 100% Natural • Freshly Packed
        </p>
        
        {/* Shop Now Button */}
        <button className="mt-2 px-6 py-2 md:px-8 md:py-3 lg:px-10 lg:py-4 
                          bg-stone-600 hover:bg-stone-700 
                          rounded-lg md:rounded-xl lg:rounded-2xl 
                          text-sm md:text-base lg:text-lg font-semibold
                          transition-all duration-300 transform hover:scale-105
                          shadow-lg hover:shadow-xl
                          border-2 border-blue-400"
                          onClick={() => window.location.href = "/products"}
                          >
          Shop Now
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              index === current 
                ? "bg-blue-600 w-8 md:w-10 lg:w-12" 
                : "bg-gray-300/80 hover:bg-gray-200 w-3 md:w-4 lg:w-5"
            } h-3 md:h-4 lg:h-5`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Optional: Navigation Arrows */}
      <button
        onClick={() => setCurrent(current === 0 ? images.length - 1 : current - 1)}
        className="absolute left-2 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 
                   bg-black/30 hover:bg-black/50 text-white 
                   w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 
                   rounded-full flex items-center justify-center
                   transition-all duration-300 backdrop-blur-sm
                   border border-white/20"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrent(current === images.length - 1 ? 0 : current + 1)}
        className="absolute right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 
                   bg-black/30 hover:bg-black/50 text-white 
                   w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 
                   rounded-full flex items-center justify-center
                   transition-all duration-300 backdrop-blur-sm
                   border border-white/20"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black/40 text-white 
                     px-3 py-1 rounded-full text-xs md:text-sm lg:text-base
                     backdrop-blur-sm border border-white/20">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}

export default HeroSlider;