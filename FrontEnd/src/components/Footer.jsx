import React from "react";
import { RiCustomerService2Line, RiMapPinLine, RiMailLine, RiPhoneLine } from "react-icons/ri";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-teal-900 text-white pt-12 pb-6">
      <div className="w-[90%] lg:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Little <span className="text-teal-300">Champs</span>
          </h2>
          <p className="text-teal-100 text-sm">
            Where imagination comes to play! Premium quality toys for your little champions.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="text-teal-200 hover:text-white text-xl transition">
              <FaFacebook />
            </a>
            <a href="#" className="text-teal-200 hover:text-white text-xl transition">
              <FaInstagram />
            </a>
            <a href="#" className="text-teal-200 hover:text-white text-xl transition">
              <FaTwitter />
            </a>
            <a href="#" className="text-teal-200 hover:text-white text-xl transition">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <RiCustomerService2Line className="mr-2" /> Quick Links
          </h3>
          <ul className="space-y-2 text-teal-100">
            <li className="hover:text-white transition cursor-pointer flex items-center">
              Home
            </li>
            <li className="hover:text-white transition cursor-pointer flex items-center">
               Toys
            </li>
            <li className="hover:text-white transition cursor-pointer flex items-center">
               New Arrivals
            </li>
            <li className="hover:text-white transition cursor-pointer flex items-center">
               Best Sellers
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <RiMapPinLine className="mr-2" /> Shop By Age
          </h3>
          <ul className="space-y-2 text-teal-100">
            <li className="hover:text-white transition cursor-pointer flex items-center">
              <span className="mr-1">👶</span> 0-2 Years
            </li>
            <li className="hover:text-white transition cursor-pointer flex items-center">
              <span className="mr-1">🧒</span> 3-5 Years
            </li>
            <li className="hover:text-white transition cursor-pointer flex items-center">
              <span className="mr-1">👦</span> 6-8 Years
            </li>
            <li className="hover:text-white transition cursor-pointer flex items-center">
              <span className="mr-1">🧑</span> 9+ Years
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <RiPhoneLine className="mr-2" /> Contact Us
          </h3>
          <div className="space-y-2 text-teal-100">
            <p className="flex items-center">
              <RiMailLine className="mr-2" /> qadrihassan25@gmail.com
            </p>
            <p className="flex items-center">
              <RiPhoneLine className="mr-2" /> 0315-2714464
            </p>
            <p className="flex items-center">
              <RiMapPinLine className="mr-2" /> Karachi, Pakistan
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-teal-300 mt-12 pt-4 border-t border-teal-800">
        <p>© {new Date().getFullYear()} Little Champs. All rights reserved.</p>
        <p className="mt-1 text-xs text-teal-400">
          Made with ❤️ for happy childhoods
        </p>
      </div>
    </footer>
  );
};

export default Footer;