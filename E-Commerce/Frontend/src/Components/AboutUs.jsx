import React from 'react';
import teamImage from '../img/about.jpg';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Store Description */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About Our Store</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Welcome to our eCommerce store! Our mission is to provide high-quality products 
          at affordable prices while delivering exceptional customer service. We carefully 
          curate our collection to bring you the latest trends and timeless classics that 
          you'll love. Trust and satisfaction are our top priorities - we stand behind 
          every product we sell.
        </p>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Team</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img 
              src={teamImage} 
              alt="Our dedicated team" 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          
          <div className="md:w-1/2">
            <p className="text-gray-600 leading-relaxed">
              Behind our store is a passionate team of professionals dedicated to making 
              your shopping experience seamless and enjoyable. From our customer service 
              experts to our logistics coordinators, every team member works together to 
              ensure you receive the best products and service possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;