import React from "react";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import Marquee from "react-fast-marquee"; // Ensure you install this package

const UpcomingScholarships = () => {
  const scholarships = [
    {
      id: 1,
      name: "National STEM Scholarship",
      date: "March 15, 2025",
      description: "Support for students excelling in science and technology.",
    },
    {
      id: 2,
      name: "Arts & Creativity Grant",
      date: "April 10, 2025",
      description: "Funding for students pursuing careers in arts and design.",
    },
    {
      id: 3,
      name: "Global Study Abroad Program",
      date: "May 1, 2025",
      description: "Opportunities for students to study at top universities worldwide.",
    },
    {
      id: 4,
      name: "Undergraduate Excellence Award",
      date: "June 20, 2025",
      description: "Rewarding academic excellence at the undergraduate level.",
    },
  ];

  const marquee = [
	"🎓 National STEM Scholarship - March 15, 2025",
    "🎨 Arts & Creativity Grant - April 10, 2025",
    "🌍 Global Study Abroad Program - May 1, 2025",
    "🏅 Undergraduate Excellence Award - June 20, 2025",
  ];


  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          🚀 Upcoming Scholarships
        </h2>

        {/* Marquee Section */}
        <Marquee
          speed={40}
          pauseOnHover={true}
          gradient={true}
          gradientColor={[255, 255, 255]}
          className="text-lg text-gray-800 font-medium"
        >
          {marquee.map((scholarship, index) => (
            <span key={index} className="mx-6">
              {scholarship}
            </span>
          ))}
        </Marquee>

        {/* Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  <FaCalendarAlt size={24} />
                </div>
                <div>
                  <p className="text-sm text-blue-500">{scholarship.date}</p>
                  <h3 className="text-lg font-bold text-gray-800">
                    {scholarship.name}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{scholarship.description}</p>
              <button className="btn btn-primary btn-sm flex items-center gap-2">
                Learn More <FaArrowRight />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingScholarships;
