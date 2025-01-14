import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div>
            <h1 className="text-2xl font-bold text-primary">ScholarShipHub</h1>
            <p className="mt-4 text-gray-300">
              Empowering education through opportunities. Find scholarships and achieve your academic dreams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold text-white">Quick Links</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/" className="hover:underline text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/scholarships" className="hover:underline text-gray-300">
                  All Scholarships
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:underline text-gray-300">
                  User Dashboard
                </a>
              </li>
              <li>
                <a href="/admin-dashboard" className="hover:underline text-gray-300">
                  Admin Dashboard
                </a>
              </li>
              <li>
                <a href="/login" className="hover:underline text-gray-300">
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Contact and Social Links */}
          <div>
            <h2 className="text-lg font-bold text-white">Contact Us</h2>
            <p className="mt-4 text-gray-300">
              123 Scholar Street, Dhaka, Bangladesh
            </p>
            <p className="text-gray-300">Email: support@scholarshiphub.com</p>
            <p className="text-gray-300">Phone: +880 123-456-7890</p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-white"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-white"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-white"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-white"
              >
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; 2025 ScholarShipHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
