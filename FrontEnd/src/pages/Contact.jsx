import React from 'react';
import { RiCustomerService2Fill, RiMapPin2Fill, RiPhoneFill, RiMailFill, RiSendPlane2Fill } from 'react-icons/ri';

const Contact = () => {
  return (
    <section id="contact" className="py-12 md:py-16 bg-teal-50">
      <div className="w-[90%] lg:w-[85%] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-800 mb-3">
            Let's <span className="text-teal-600">Connect!</span> 🧸
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our toys? Our team is here to help you find the perfect playthings for your little champs!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {/* Contact Info */}
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-lg border border-teal-100">
            <h3 className="text-xl sm:text-2xl font-semibold text-teal-800 mb-4 md:mb-6 flex items-center">
              <RiCustomerService2Fill className="mr-2 text-teal-600 text-lg sm:text-xl" />
              Our Information
            </h3>

            <div className="space-y-4 sm:space-y-6">
              {/* Address */}
              <div className="flex items-start">
                <div className="bg-teal-100 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full mr-3 sm:mr-4 flex-shrink-0">
                  <RiMapPin2Fill className="text-teal-700 text-sm sm:text-base md:text-lg" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm sm:text-base">Visit Us</h4>
                  <p className="text-gray-600 mt-1 text-xs sm:text-sm">
                    Shop 2, Serena Market, Karachi, Pakistan
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <div className="bg-teal-100 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full mr-3 sm:mr-4 flex-shrink-0">
                  <RiPhoneFill className="text-teal-700 text-sm sm:text-base md:text-lg" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm sm:text-base">Call Us</h4>
                  <p className="text-gray-600 mt-1 text-xs sm:text-sm">
                    +92 315 2714464 (10AM - 8PM)
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="bg-teal-100 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full mr-3 sm:mr-4 flex-shrink-0">
                  <RiMailFill className="text-teal-700 text-sm sm:text-base md:text-lg" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm sm:text-base">Email Us</h4>
                  <p className="text-gray-600 mt-1 text-xs sm:text-sm break-all">
                    qadrihassan25@gmail.com
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-3 sm:pt-4">
                <h4 className="font-medium text-gray-800 text-sm sm:text-base mb-2 sm:mb-3">Follow Us</h4>
                <div className="flex space-x-3 sm:space-x-4">
                  <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 hover:bg-teal-200 transition text-sm sm:text-base md:text-lg">
                    <i className="ri-facebook-fill"></i>
                  </a>
                  <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 hover:bg-teal-200 transition text-sm sm:text-base md:text-lg">
                    <i className="ri-instagram-line"></i>
                  </a>
                  <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 hover:bg-teal-200 transition text-sm sm:text-base md:text-lg">
                    <i className="ri-whatsapp-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-lg border border-teal-100">
            <h3 className="text-xl sm:text-2xl font-semibold text-teal-800 mb-4 md:mb-6 flex items-center">
              <RiSendPlane2Fill className="mr-2 text-teal-600 text-lg sm:text-xl" />
              Send Us a Message
            </h3>

            <form className="space-y-3 sm:space-y-4 md:space-y-5">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition text-sm sm:text-base"
                  placeholder="e.g. Ali Ahmed"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition text-sm sm:text-base"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Subject</label>
                <select 
                  id="subject" 
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition text-sm sm:text-base"
                >
                  <option value="">Select an option</option>
                  <option value="order">Order Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Your Message</label>
                <textarea 
                  id="message" 
                  rows="3"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition text-sm sm:text-base"
                  placeholder="Tell us about your toy needs..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-300 flex items-center justify-center text-sm sm:text-base"
              >
                Send Message
                <RiSendPlane2Fill className="ml-2 text-sm sm:text-base" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;