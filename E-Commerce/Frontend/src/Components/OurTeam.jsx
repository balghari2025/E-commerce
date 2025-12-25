import React from 'react';
import CEO from '../img/CEO.png';
import img from '../img/img.jpg';
import lead from '../img/lead.jpg';
import slide3 from '../img/slide3.webp';

const OurTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Shoaib Ahmed",
      role: "CEO & Founder",
      image: CEO,
      quote: "Driving innovation and customer satisfaction."
    },
    {
      id: 2,
      name: "Shehbaz Saleem",
      role: "Head of Marketing",
      image: img,
      quote: "Building brands that customers love."
    },
    {
      id: 3,
      name: "Susan Lee",
      role: "Lead Developer",
      image: lead,
      quote: "Creating seamless digital experiences."
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Customer Success Manager",
      image: slide3,
      quote: "Ensuring every customer feels valued."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Meet Our Team</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're a passionate team dedicated to delivering exceptional eCommerce experiences. 
            Our collaborative approach ensures we provide the best products and service to our valued customers.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Team Member Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              {/* Team Member Info */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm italic">"{member.quote}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Commitment</h2>
            <p className="text-gray-600">
              Every team member plays a vital role in our mission to provide outstanding 
              eCommerce solutions. We work together to ensure your shopping experience 
              is smooth, secure, and satisfying.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;