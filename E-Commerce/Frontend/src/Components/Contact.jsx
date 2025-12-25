import React from 'react';
import contactImage from '../img/CEO.png';
import contactImage2 from '../img/img.jpg'

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div>
        <h1 className='text-3xl font-bold text-center p-2'>Get In Touch</h1>
        <p className="text-gray-600 text-center mb-8">
          We're here to help! Reach out to us with any questions, feedback, or concerns. 
          Our team is always ready to assist you.
        </p>
      </div>
      {/* Header with Image */}
      <div className='flex'>
        <div className="text-center mb-8">
        <img 
          src={contactImage} 
          alt="Contact Us" 
          className="w-32 h-32 mx-auto mb-6 rounded-full object-cover shadow-md"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Shoaib Ahmed</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're here to help! Reach out to us with any questions, feedback, or concerns. 
          Our team is always ready to assist you.
        </p>
      </div>
           <div className="text-center mb-8">
        <img 
          src={contactImage2} 
          alt="Contact Us" 
          className="w-32 h-32 mx-auto mb-6 rounded-full object-cover shadow-md"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Shehbaz Saleem</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're here to help! Reach out to us with any questions, feedback, or concerns. 
          Our team is always ready to assist you.
        </p>
      </div>

      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contact Form */}
        <div className="lg:w-1/2">
          <form className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your full name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="lg:w-1/2">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md h-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Store Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">shoaibbalghari@gmail.com</p>
                  <p className="text-gray-600">shehbazsaleem@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">+923555711812</p>
                  <p className="text-gray-600">+923555974138</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-600">
                    Sooq Balgahr <br />
                    District: Ghanche<br />
                    Country: Pakistan
                    Gilgit Baltistan
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Business Hours:</strong><br />
                Monday - Friday: 9AM - 6PM EST<br />
                Saturday: 10AM - 4PM EST<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;