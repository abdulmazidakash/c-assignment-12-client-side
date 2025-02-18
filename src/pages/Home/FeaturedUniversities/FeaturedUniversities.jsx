import { FaUniversity } from 'react-icons/fa';

const FeaturedUniversities = () => {
  return (
    <section className="container mx-auto my-8 rounded-lg py-16 bg-base-200 dark:bg-base-800">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Featured Universities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Repeat this for each featured university */}
          <div className="p-6 bg-white dark:bg-base-700 rounded-lg shadow-lg">
            <FaUniversity className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold">University A</h3>
            <p className="text-gray-600 dark:text-gray-300">Top-rated institution offering amazing scholarship programs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;
