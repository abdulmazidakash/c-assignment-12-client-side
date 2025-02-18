import React, { useContext } from 'react';
import { MdLocationOn } from "react-icons/md";
import { AiOutlineCalendar, AiFillStar } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const ScholarshipCard = ({ scholarship }) => {
  const { darkMode } = useContext(ThemeContext); // Get darkMode from context

  const {
    universityName,
    image,
    universityCountry,
    universityCity,
    subjectCategory,
    scholarshipCategory,
    applicationFees,
    applicationDeadline,
    _id,
    averageRating
  } = scholarship || {};

  return (
    <div
      className={`card w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl rounded-lg overflow-hidden border border-gray-300 mx-auto my-4 transition-transform transform hover:scale-105`}
    >
      {/* University Image */}
      <img
        src={image}
        alt={`${universityName} logo`}
        className="w-full h-40 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        {/* University Name */}
        <h2 className={`card-title text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
          {universityName}
        </h2>

        {/* Scholarship Category */}
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
          <span className="font-semibold">Category:</span> {scholarshipCategory}
        </p>

        {/* University Location */}
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center mb-2`}>
          <MdLocationOn className={`${darkMode ? 'text-blue-300' : 'text-blue-500'} mr-1`} />
          {universityCity}, {universityCountry}
        </p>

        {/* Application Deadline */}
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center mb-2`}>
          <AiOutlineCalendar className={`${darkMode ? 'text-red-300' : 'text-red-500'} mr-1`} />
          <span className="font-semibold">Deadline:</span> {applicationDeadline}
        </p>

        {/* Subject Category */}
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
          <span className="font-semibold">Subject:</span> {subjectCategory}
        </p>

        {/* Application Fees */}
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
          <span className="font-semibold">Application Fees:</span> ${applicationFees}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <AiFillStar className={`${darkMode ? 'text-yellow-300' : 'text-yellow-500'}`} />
          <span className={`ml-1 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{averageRating}</span>
        </div>

        {/* Details Button */}
        <div className="card-actions justify-end">
          <Link
            to={`/scholarships/${_id}`}
            className={`bg-gradient-to-tr ${darkMode ? 'from-sky-700 to-slate-800' : 'from-sky-900 to-slate-800'} text-white font-semibold btn w-full`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
