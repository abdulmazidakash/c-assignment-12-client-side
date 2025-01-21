import React from 'react';
import { MdLocationOn } from "react-icons/md";
import { AiOutlineCalendar, AiFillStar } from "react-icons/ai";
import { Link } from 'react-router-dom';

const ScholarshipCard = ({scholarship}) => {

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
		<div>
			<div className="card w-full max-w-md bg-white shadow-xl rounded-lg overflow-hidden border border-gray-300 mx-auto my-4 transition-transform transform hover:scale-105">
      {/* University Image */}
      <img
        src={image}
        alt={`${universityName} logo`}
        className="w-full h-40 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        {/* University Name */}
        <h2 className="card-title text-lg font-bold text-gray-800 mb-2">
          {universityName}
        </h2>

        {/* Scholarship Category */}
        <p className="text-sm text-gray-500 mb-2">
          <span className="font-semibold">Category:</span> {scholarshipCategory}
        </p>

        {/* University Location */}
        <p className="text-sm text-gray-500 flex items-center mb-2">
          <MdLocationOn className="text-blue-500 mr-1" />
          {universityCity}, {universityCountry}
        </p>

        {/* Application Deadline */}
        <p className="text-sm text-gray-500 flex items-center mb-2">
          <AiOutlineCalendar className="text-red-500 mr-1" />
          <span className="font-semibold">Deadline:</span> {applicationDeadline}
        </p>

        {/* Subject Category */}
        <p className="text-sm text-gray-500 mb-2">
          <span className="font-semibold">Subject:</span> {subjectCategory}
        </p>

        {/* Application Fees */}
        <p className="text-sm text-gray-500 mb-2">
          <span className="font-semibold">Application Fees:</span> $
          {applicationFees}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <AiFillStar className="text-yellow-500" />
          <span className="ml-1 text-sm font-semibold">{averageRating}</span>
        </div>

        {/* Details Button */}
        <div className="card-actions justify-end">
          <Link to={`/scholarships/${_id}`} className="bg-gradient-to-tr from-sky-900 to-slate-800 text-white font-semibold btn w-full">View Details</Link>
        </div>
      </div>
    </div>
		</div>
	);
};

export default ScholarshipCard;