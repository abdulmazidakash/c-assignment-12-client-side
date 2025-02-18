import React, { useState, useContext } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ThemeContext } from "../../../context/ThemeContext";

const FAQsAndHelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { darkMode } = useContext(ThemeContext); // Get darkMode from context

  const faqs = [
    {
      question: "How can I apply for a scholarship?",
      answer:
        "To apply, browse our scholarship categories, choose a scholarship that suits your needs, and follow the application instructions on the details page.",
    },
    {
      question: "What are the eligibility criteria?",
      answer:
        "Eligibility criteria vary for each scholarship. Check the scholarship details page to learn more about specific requirements.",
    },
    {
      question: "Can I apply for multiple scholarships?",
      answer:
        "Yes, you can apply for multiple scholarships as long as you meet their individual criteria.",
    },
    {
      question: "How will I know if I am selected?",
      answer:
        "You will receive an email notification if you are selected. Make sure to provide a valid email address during the application process.",
    },
    {
      question: "Is there any application fee?",
      answer:
        "Most scholarships listed here are free to apply for. Always verify the details on the official scholarship page.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div
      className={`container mx-auto rounded-lg ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      } py-16 my-8`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className={`text-4xl font-bold text-center ${
            darkMode ? "text-white" : "text-gray-800"
          } mb-12`}
        >
          FAQs & Help Center
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              } shadow-md rounded-lg overflow-hidden`}
            >
              <div
                className="flex justify-between items-center px-6 py-4 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {faq.question}
                </h3>
                <div>
                  {openIndex === index ? (
                    <FaChevronUp
                      className={`${
                        darkMode ? "text-white" : "text-gray-600"
                      } text-xl`}
                    />
                  ) : (
                    <FaChevronDown
                      className={`${
                        darkMode ? "text-white" : "text-gray-600"
                      } text-xl`}
                    />
                  )}
                </div>
              </div>
              {openIndex === index && (
                <div
                  className={`${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  } px-6 py-4`}
                >
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQsAndHelpCenter;
