import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';

const Header = () => {
  const promos = [
  {
    code: "WELCOME10",
    discount: "10% OFF",
    text: "Welcome! Enjoy 10% off your first purchase as a new customer.",
    shortText: "10% off on first order",
    icon: "🎁",
    bgColor: "from-teal-600 to-teal-800"
  },
  {
    code: "LEARN20",
    discount: "20% OFF",
    text: "Boost your child’s learning with 20% off on all educational toys.",
    shortText: "Educational toys: 20% off",
    icon: "📚",
    bgColor: "from-teal-500 to-teal-700"
  },
  {
    code: "WEEKEND15",
    discount: "15% OFF",
    text: "Weekend Special Offer: Save 15% on our exclusive premium toy range.",
    shortText: "15% off on premium toys",
    icon: "⭐",
    bgColor: "from-teal-800 to-teal-400"
  },
  {
    code: "TOYFEST30",
    discount: "30% OFF",
    text: "Celebrate Toy Festival with 30% off storewide. Limited time only!",
    shortText: "Toy Fest: 30% OFF",
    icon: "🎉",
    bgColor: "from-teal-400 to-teal-800"
  }
];

  const [currentPromo, setCurrentPromo] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentPromo((prev) => (prev + 1) % promos.length);
        setIsVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Promo Banner */}
      <div className={`bg-gradient-to-r ${promos[currentPromo].bgColor} text-white py-2 sm:py-3 px-2 sm:px-4 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className={`transition-all duration-300 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'}`}>
            <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm md:text-base">
              <span className="text-sm sm:text-lg md:text-2xl animate-bounce flex-shrink-0">{promos[currentPromo].icon}</span>
              <span className="font-medium truncate">
                <span className="block sm:hidden">{promos[currentPromo].shortText}</span>
                <span className="hidden sm:block">{promos[currentPromo].text}</span>
              </span>
              <span className="bg-white/20 px-1 sm:px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm flex-shrink-0">
                {promos[currentPromo].code}
              </span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white/20">
          <div
            className="h-full bg-white/60 transition-all duration-4000 ease-linear"
            style={{
              width: isVisible ? '100%' : '0%',
              transition: isVisible ? 'width 4s linear' : 'width 0.3s ease'
            }}
          ></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">

        <div className="min-h-screen w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-teal-25 to-teal-100"></div>

          {/* Background elements  */}
          <div className="absolute top-10 left-4 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-teal-200/30 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-4 sm:right-16 w-10 sm:w-16 h-10 sm:h-16 bg-teal-300/30 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 left-4 sm:left-20 w-8 sm:w-12 h-8 sm:h-12 bg-teal-200/30 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-32 right-4 sm:right-32 w-16 sm:w-24 h-16 sm:h-24 bg-teal-300/30 rounded-full animate-bounce delay-500"></div>

          {/* Content  */}
          <div className="relative min-h-screen flex items-center py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                <div className="w-full text-center lg:text-left space-y-6 lg:space-y-8 order-2 lg:order-1">
                  <div className="space-y-4 lg:space-y-6">
                    <div className="inline-flex items-center bg-teal-100 text-teal-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
                      🏆 Pakistan's #1 Premium Toy Store
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                      Ignite Wonder,
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
                        Inspire Dreams
                      </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                      Discover premium educational toys, creative playsets, and innovative games
                      that spark imagination while ensuring safety and quality for your little ones.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full">
                    <NavLink
                      to='/toys'
                      className="group bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <span>Explore Collection</span>
                      <svg className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </NavLink>

                    <button className="bg-white hover:bg-gray-50 text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold border-2 border-gray-200 hover:border-teal-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                      View Categories
                    </button>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6 text-xs sm:text-sm text-gray-500 pt-6 lg:pt-8">
                    <div className="flex items-center gap-2">
                      <div className="w-6 sm:w-8 h-6 sm:h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 sm:w-4 h-3 sm:h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>Safe & Certified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 sm:w-8 h-6 sm:h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 sm:w-4 h-3 sm:h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                      <span>Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 sm:w-8 h-6 sm:h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 sm:w-4 h-3 sm:h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>

                {/* Image section */}
                <div className="relative w-full order-1 lg:order-2">
                  <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[470px]">

                    <div className="absolute inset-0 bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transform rotate-1 sm:rotate-3 hover:rotate-0 transition-transform duration-500">
                      <div className="w-full h-full relative">

                        <img
                          src="/images/toys-banner2.png"
                          alt="Premium Toys Collection"
                          className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                        <div className="absolute top-3 sm:top-6 left-3 sm:left-6 text-xl sm:text-3xl animate-spin-slow bg-white/90 rounded-full w-8 sm:w-12 h-8 sm:h-12 flex items-center justify-center shadow-lg">🎨</div>
                        <div className="absolute bottom-12 sm:bottom-16 left-4 sm:left-8 text-lg sm:text-2xl animate-pulse delay-700 bg-white/90 rounded-full w-7 sm:w-10 h-7 sm:h-10 flex items-center justify-center shadow-lg">🎲</div>
                        <div className="absolute bottom-4 sm:bottom-8 right-3 sm:right-6 text-xl sm:text-3xl animate-bounce delay-500 bg-white/90 rounded-full w-8 sm:w-12 h-8 sm:h-12 flex items-center justify-center shadow-lg">🪀</div>

                      </div>
                    </div>

                    {/* Stats */}
                    <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-white rounded-lg sm:rounded-xl shadow-lg p-2 sm:p-4 border-t-4 border-teal-500">
                      <div className="text-lg sm:text-2xl font-bold text-teal-600">1000+</div>
                      <div className="text-xs sm:text-sm text-gray-600">Happy Kids</div>
                    </div>

                    <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-white rounded-lg sm:rounded-xl shadow-lg p-2 sm:p-4 border-t-4 border-teal-600">
                      <div className="text-lg sm:text-2xl font-bold text-teal-600">500+</div>
                      <div className="text-xs sm:text-sm text-gray-600">Premium Toys</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Header;