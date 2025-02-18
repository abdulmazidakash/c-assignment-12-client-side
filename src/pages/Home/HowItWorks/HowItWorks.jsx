// HowItWorks.js
import { FaChalkboardTeacher, FaSearch, FaRegHandshake } from 'react-icons/fa';

const HowItWorks = () => {
  return (
    <section className="py-16 bg-base-200 dark:bg-base-800">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-base-700 rounded-lg shadow-lg">
            <FaSearch className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold">Search Scholarships</h3>
            <p className="text-gray-600 dark:text-gray-300">Browse through thousands of available scholarships based on your qualifications.</p>
          </div>
          <div className="p-6 bg-white dark:bg-base-700 rounded-lg shadow-lg">
            <FaChalkboardTeacher className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold">Learn & Apply</h3>
            <p className="text-gray-600 dark:text-gray-300">Read the scholarship details and apply directly through our platform.</p>
          </div>
          <div className="p-6 bg-white dark:bg-base-700 rounded-lg shadow-lg">
            <FaRegHandshake className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold">Get Rewarded</h3>
            <p className="text-gray-600 dark:text-gray-300">Receive the scholarship and take your academic journey to the next level.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
