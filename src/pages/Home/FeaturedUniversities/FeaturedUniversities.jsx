import { FaUniversity } from "react-icons/fa";

const FeaturedUniversities = () => {
  // Sample university data (you can replace this with dynamic data)
  const universities = [
    {
      id: 1,
      name: "Harvard University",
      description: "A world-renowned university offering diverse scholarships.",
      image: "https://via.placeholder.com/150", // Replace with actual image URLs
    },
    {
      id: 2,
      name: "Stanford University",
      description: "Top-tier institution with generous scholarship programs.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "MIT",
      description: "Excellence in technology and research with scholarships.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Oxford University",
      description: "Home to prestigious international scholarship programs.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Cambridge University",
      description: "Historical institution with multiple financial aid options.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Yale University",
      description: "Committed to making education accessible to all.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section className="py-16 bg-base-200 dark:bg-base-900">
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Featured Universities
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
          Discover top universities offering exclusive scholarships.
        </p>

        {/* University Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-4">
          {universities.map((university) => (
            <div
              key={university.id}
              className="p-6 bg-white dark:bg-base-800 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              {/* University Logo or Icon */}
              <div className="flex justify-center">
                <img
                  src={university.image}
                  alt={university.name}
                  className="w-20 h-20 rounded-full mb-4"
                />
              </div>

              {/* University Name */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {university.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {university.description}
              </p>

              {/* Icon */}
              <FaUniversity className="text-4xl text-primary mt-4 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;
