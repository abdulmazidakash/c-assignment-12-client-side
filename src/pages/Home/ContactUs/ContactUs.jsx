import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="container mx-auto my-8 rounded-lg py-12 px-4 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Contact Us
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Have questions? Get in touch with us.
        </p>

        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <FaPhone className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Call Us</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">+123 456 7890</p>
          </div>

          {/* Email */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <FaEnvelope className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Email Us</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">info@scholarship.com</p>
          </div>

          {/* Address */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <FaMapMarkerAlt className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Visit Us</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">123 Scholarship Lane, City</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
