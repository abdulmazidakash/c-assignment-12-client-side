import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';

const ScholarshipDetails = ({ }) => {

	const { id } = useParams();
	const { data, isLoading, refetch} = useQuery({
		queryKey: ['scholarships', id],
		queryFn: async() =>{
			
		}
	})

  
  const reviews = [
	{
	  reviewerImage: 'https://via.placeholder.com/50',
	  reviewerName: 'John Doe',
	  reviewDate: '2025-01-15',
	  rating: 4,
	  comment: 'Great opportunity and very helpful!',
	},
  ];
  

  const {
    universityName,
    universityLogo,
    category,
    location,
    applicationDeadline,
    subjectName,
    description,
    stipend,
    postDate,
    serviceCharge,
    applicationFees,
    image,
  } = scholarshipData;

  return (
    <div className="max-w-5xl mx-auto p-5">
      {/* Header Section */}
      <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden shadow-lg border p-2">
        <img
          src={image || 'https://via.placeholder.com/1200x300'}
          alt="Scholarship Banner"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Title and Apply Button */}
      <div className="w-full h-full text-black flex items-center justify-between p-5 mt-4">
        <h1 className="text-2xl font-bold">{universityName}</h1>
        <Link
          to={`/applyScholarship/${id}`}
          className="btn bg-[#13405E] text-white px-6 py-2 rounded-md"
        >
          Apply Scholarship
        </Link>
      </div>

      {/* Body Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="col-span-2 bg-white shadow-lg rounded-lg p-6 border">
          {/* University Info */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={universityLogo || 'https://via.placeholder.com/150'}
              alt="University Logo"
              className="w-16 h-16"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{universityName}</h2>
              <div className="flex items-center text-gray-500 text-sm">
                <MdLocationOn size={16} />
                <span className="ml-1">{location}</span>
              </div>
            </div>
          </div>

          {/* Scholarship Details */}
          <h3 className="text-lg font-bold text-gray-800 mb-2">{category}</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

          {/* Scholarship Details List */}
          <ul className="text-gray-600 space-y-2">
            <li>
              <strong>Subject Name:</strong> {subjectName}
            </li>
            <li>
              <strong>Application Deadline:</strong> {applicationDeadline}
            </li>
            <li>
              <strong>Stipend:</strong> {stipend || 'Not Available'}
            </li>
            <li>
              <strong>Post Date:</strong> {postDate}
            </li>
            <li>
              <strong>Service Charge:</strong> ${serviceCharge}
            </li>
            <li>
              <strong>Application Fees:</strong> ${applicationFees}
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-lg font-bold text-gray-800 mb-4">University Information</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Category:</strong> {category}
            </p>
            <p>
              <strong>Location:</strong> {location}
            </p>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Scholarship Reviews</h2>
        {reviews?.length > 0 ? (
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white shadow-lg rounded-lg p-6 border flex items-start gap-4">
                  <img
                    src={review.reviewerImage || 'https://via.placeholder.com/50'}
                    alt={review.reviewerName}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{review.reviewerName}</h3>
                    <p className="text-sm text-gray-500 mb-2">{review.reviewDate}</p>
                    <div className="flex items-center text-yellow-500 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-gray-600">No reviews available for this scholarship.</p>
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;
