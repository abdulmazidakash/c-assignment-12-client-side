import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdLocationOn, MdSchool, MdDateRange, MdAttachMoney } from 'react-icons/md';
import { FaStar, FaUniversity, FaGraduationCap, FaRegCommentDots, FaBook } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../shared/LoadingSpinner';

const ScholarshipDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data: scholarship= {}, isLoading } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/scholarships/${id}`);
      return data;
    },
  });

  const reviews = [
    {
      reviewerImage: 'https://i.ibb.co/BG7TFcR/Stanford-University.jpg',
      reviewerName: 'John Doe',
      reviewDate: '2025-01-15',
      rating: 4,
      comment: 'Great opportunity and very helpful!',
    },
    {
      reviewerImage: 'https://i.ibb.co/BG7TFcR/Stanford-University.jpg',
      reviewerName: 'Jane Smith',
      reviewDate: '2025-01-14',
      rating: 5,
      comment: 'Amazing experience and supportive staff!',
    },
  ];

  const {
    universityName,
    scholarshipCategory,
    subjectCategory,
    applicationDeadline,
    stipend,
    description,
    postDate,
    serviceCharge,
    applicationFees,
    image,
    universityCity,
    universityCountry,
  } = scholarship || {};

  if (isLoading) {
    return <LoadingSpinner/> ;
  }

  return (
    <div className="max-w-5xl mx-auto p-5">
      {/* Header Section */}
      <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden shadow-lg border">
        <img
          src={image || 'https://via.placeholder.com/1200x300'}
          alt="Scholarship Banner"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Title and Apply Button */}
      <div className="w-full flex items-center justify-between p-5 mt-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaUniversity className="text-[#13405E]" />
          {universityName || 'Unknown University'}
        </h1>
        <Link
          to={`/dashboard/payment/${id}`}
          className="btn bg-[#13405E] text-white px-6 py-2 rounded-md flex items-center gap-2"
        >
          <MdSchool />
          Apply Scholarship
        </Link>
      </div>

      {/* Scholarship Details */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="md:col-span-2 bg-white shadow-lg rounded-lg p-6 border">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaGraduationCap className="text-[#13405E]" />
            Scholarship Details:
          </h2>
          <p className="text-gray-600 mb-4">{description || 'No description available.'}</p>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <MdDateRange />
              <strong>Application Deadline:</strong> {applicationDeadline || 'N/A'}
            </li>
            
            <li className="flex items-center gap-2">
              <MdDateRange />
              <strong>Post Date:</strong> {postDate || 'N/A'}
            </li>
			<li className="flex items-center gap-2">
              <MdAttachMoney />
              <strong>Stipend:</strong> {stipend || 'Not Available'}
            </li>
            <li className="flex items-center gap-2">
              <MdAttachMoney />
              <strong>Service Charge:</strong> ${serviceCharge || 0}
            </li>
            <li className="flex items-center gap-2">
              <MdAttachMoney />
              <strong>Application Fees:</strong> ${applicationFees || 0}
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
			<h3 className="text-lg font-bold mb-4 flex items-center gap-2">
				<FaUniversity className="text-[#13405E]" />
				University Information
			</h3>

			<div className="text-sm text-gray-600 space-y-2">
				{/* Location */}
				<div className="flex items-center gap-2">
					<MdLocationOn /> 
					{/* <strong>Location:</strong> */}
					<span>
					{universityCity || 'Unknown City'}, {universityCountry || 'Unknown Country'}
					</span>
				</div>

				{/* Scholarship Category */}
				<div className="flex items-center gap-2">
					<FaGraduationCap />
					<strong>Scholarship Category:</strong>
					<span>{scholarshipCategory || 'N/A'}</span>
				</div>

				{/* Subject Category */}
				<div className="flex items-center gap-2">
					<FaBook />
					<strong>Subject Category:</strong>
					<span>{subjectCategory || 'N/A'}</span>
				</div>
			</div>

        </div>
      </div>

      {/* Reviews Section */}
      <div className="my-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaRegCommentDots className="text-[#13405E]" />
          Scholarship Reviews
        </h2>
        {reviews.length > 0 ? (
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
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{review.reviewerName}</h3>
                    <p className="text-sm text-gray-500">{review.reviewDate}</p>
                    <div className="flex items-center text-yellow-500 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p>{review.comment}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No reviews available for this scholarship.</p>
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;
