import { FaQuoteLeft, FaQuoteRight, FaUserCircle } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alice Johnson",
      review:
        "This platform helped me secure a full scholarship! Highly recommend it to every student.",
      role: "Scholarship Recipient",
      image: "",
    },
    {
      id: 2,
      name: "Michael Lee",
      review:
        "A fantastic resource for students looking for funding. The process was smooth and easy!",
      role: "Graduate Student",
      image: "",
    },
    {
      id: 3,
      name: "Sophia Martinez",
      review:
        "Thanks to this website, I found the perfect scholarship for my studies abroad!",
      role: "International Student",
      image: "",
    },
  ];

  return (
    <section className="container mx-auto my-8 rounded-lg py-16 bg-base-100 dark:bg-gray-900">
      <div className="container mx-auto text-center px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
          What Students Say
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
          Hear from students who benefited from our scholarship platform.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              {/* Profile Picture */}
              <div className="flex justify-center">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mb-4 border-2 border-primary dark:border-gray-300"
                  />
                ) : (
                  <FaUserCircle className="text-6xl text-gray-400 dark:text-gray-300 mb-4" />
                )}
              </div>

              {/* Quote Icons */}
              <FaQuoteLeft className="text-xl text-gray-500 dark:text-gray-400 mb-2 inline-block" />
              <p className="text-gray-800 dark:text-gray-300 italic px-4">
                "{testimonial.review}"
              </p>
              <FaQuoteRight className="text-xl text-gray-500 dark:text-gray-400 mt-2 inline-block" />

              {/* Name & Role */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
                {testimonial.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
