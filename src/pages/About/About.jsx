import React from "react";
import { FaUsers, FaLaptopCode, FaRocket, FaHandshake } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="container mx-auto my-8 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6 md:p-12">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-black dark:text-white">About Us</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Empowering students worldwide by connecting them with the best scholarship opportunities.
        </p>
      </div>

      {/* Core Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div className="card bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center">
          <FaUsers className="text-5xl text-blue-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Our Community</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            We strive to build a strong network of students and educators globally.
          </p>
        </div>

        <div className="card bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center">
          <FaLaptopCode className="text-5xl text-blue-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Technology Driven</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Leveraging the latest technologies to provide a seamless scholarship application experience.
          </p>
        </div>

        <div className="card bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center">
          <FaRocket className="text-5xl text-blue-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            To make higher education accessible to students regardless of their background.
          </p>
        </div>

        <div className="card bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center">
          <FaHandshake className="text-5xl text-blue-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Collaboration</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Partnering with universities and organizations to maximize opportunities.
          </p>
        </div>
      </div>


    </div>
  );
};

export default AboutUs;
