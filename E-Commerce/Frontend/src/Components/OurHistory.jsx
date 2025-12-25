import React from 'react';
import historyImage from '../img/slide5.webp';

const OurHistory = () => {
  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description: "Started from a small garage with a vision to revolutionize eCommerce."
    },
    {
      year: "2019",
      title: "First 10,000 Customers",
      description: "Reached our first major milestone of serving 10,000 happy customers."
    },
    {
      year: "2020",
      title: "Mobile App Launch",
      description: "Launched our mobile app, making shopping easier on the go."
    },
    {
      year: "2021",
      title: "1 Million Customers",
      description: "Celebrated serving over 1 million customers worldwide."
    },
    {
      year: "2022",
      title: "International Expansion",
      description: "Expanded our services to 5 new countries across Europe and Asia."
    },
    {
      year: "2023",
      title: "Award Winning Service",
      description: "Received 'Best eCommerce Platform' award for exceptional customer service."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Our Journey</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            From humble beginnings to becoming a trusted eCommerce destination, 
            our story is one of passion, innovation, and dedication to our customers.
          </p>
          
          {/* History Image */}
          <div className="mb-12">
            <img 
              src={historyImage} 
              alt="Our company history" 
              className="w-full max-w-2xl mx-auto rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200"></div>
          
          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Year Bubble */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-blue-600 font-bold text-lg mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Message */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
            <p className="text-gray-600 italic text-lg mb-4">
              "Our story continues — thank you for being part of it."
            </p>
            <p className="text-gray-500">
              We're excited for what the future holds and grateful for every customer 
              who has been with us on this incredible journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurHistory;