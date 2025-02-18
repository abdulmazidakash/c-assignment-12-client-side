import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaGoogleScholar } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full dark:bg-gray-900 dark:text-gray-300 bg-gray-200 text-gray-800 py-10">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo and About */}
          <div>
            <h1 className="text-2xl font-bold flex gap-2 items-center">
              <FaGoogleScholar className='text-blue-500' /> ScholarShipHub
            </h1>
            <p className="mt-4 dark:text-gray-400 text-gray-600">
              Empowering education through opportunities. Find scholarships and achieve your academic dreams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold">Quick Links</h2>
            <ul className="mt-4 space-y-2">
              <li><a href="/" className="hover:underline dark:text-gray-400 text-gray-600">Home</a></li>
              <li><a href="/scholarships" className="hover:underline dark:text-gray-400 text-gray-600">All Scholarships</a></li>
              <li><a href="/dashboard" className="hover:underline dark:text-gray-400 text-gray-600">User Dashboard</a></li>
              <li><a href="/admin-dashboard" className="hover:underline dark:text-gray-400 text-gray-600">Admin Dashboard</a></li>
              <li><a href="/login" className="hover:underline dark:text-gray-400 text-gray-600">Login</a></li>
            </ul>
          </div>

          {/* Contact and Social Links */}
          <div>
            <h2 className="text-lg font-bold">Contact Us</h2>
            <p className="mt-4 dark:text-gray-400 text-gray-600">123 Scholar Street, Dhaka, Bangladesh</p>
            <p className="dark:text-gray-400 text-gray-600">Email: support@scholarshiphub.com</p>
            <p className="dark:text-gray-400 text-gray-600">Phone: +880 123-456-7890</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400"><FaFacebookF size={24} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300"><FaTwitter size={24} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400"><FaInstagram size={24} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-600"><FaLinkedinIn size={24} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t dark:border-gray-700 border-gray-400 pt-6 text-center dark:text-gray-500 text-gray-600">
          <p>&copy; 2025 ScholarShipHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
