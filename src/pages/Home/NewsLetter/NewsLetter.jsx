import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react";

const Newsletter = () => {
  
    const { darkMode } = useContext(ThemeContext); // Get darkMode from context
  return (
    <section className="container mx-auto my-8 rounded-lg py-12 px-4 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Stay Updated!
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Subscribe to our newsletter and never miss a scholarship opportunity.
        </p>

        {/* Newsletter Form */}
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <form className="flex flex-col md:flex-row items-center gap-4">
            {/* Email Input Box */}
            <div className="flex items-center w-full bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600">
              <FaEnvelope className="text-gray-500 dark:text-gray-300 text-xl mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-white"
              />
            </div>

            {/* Subscribe Button */}
            <button 
            className={`bg-gradient-to-tr btn  w-full md:w-auto flex items-center justify-center px-6 py-3 ${darkMode ? 'from-sky-700 to-slate-800' : 'from-sky-900 to-slate-800'} text-white font-semibold btn w-full`}
            >
              Subscribe <FaPaperPlane className="ml-2" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
