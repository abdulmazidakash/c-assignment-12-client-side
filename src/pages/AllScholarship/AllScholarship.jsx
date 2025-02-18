import React, { useState, useRef, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaSearch, FaCircle, FaExclamationTriangle } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import ScholarshipCard from '../../components/ScholarshipCard';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { ThemeContext } from '../../context/ThemeContext'; // Assuming ThemeContext is set up

const AllScholarship = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState(0);
  const swiperRef = useRef(null);
  const axiosPublic = useAxiosPublic();
  const { darkMode } = useContext(ThemeContext); // Get darkMode from context

  // Fetch scholarships using TanStack Query
  const { data: scholarships = [], isLoading, isError } = useQuery({
    queryKey: ['scholarships'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/all-scholarships');
      return data;
    },
  });

  // Filter scholarships based on the search query
  const filteredScholarships = scholarships.filter((scholarship) =>
    scholarship.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholarship.scholarshipCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholarship.subjectCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle pagination controls
  const handleBulletClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
      setActivePage(index);
    }
  };

  const handleSlideChange = (swiper) => {
    setActivePage(swiper.activeIndex);
  };

  // Create paginated slides (3 scholarships per slide)
  const slides = Array.from({ length: Math.ceil(filteredScholarships.length / 6) }, (_, index) => (
    <SwiperSlide key={index}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-6 pr-8">
        {filteredScholarships.slice(index * 6, index * 6 + 6).map((scholarship) => (
          <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
        ))}
      </div>
    </SwiperSlide>
  ));

  return (
    <div
      className={`${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
      } p-6 my-8 rounded-lg`}
    >
      {/* Search Bar */}
      <div className="flex justify-center items-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by University Name, Scholarship Category, or Subject"
          className={`input input-bordered w-full max-w-md ${
            darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
          }`}
        />
        <button
          className={`btn ml-4 flex items-center gap-2 ${
            darkMode ? 'btn-dark' : 'btn-primary'
          }`}
        >
          <FaSearch />
          Search
        </button>
      </div>

      {/* Loading and Error States */}
      {isLoading && <LoadingSpinner />}
      {isError && (
        <p className="text-center text-red-500">Failed to load scholarships. Please try again later.</p>
      )}

      {/* Scholarship Cards with Swiper Pagination */}
      {!isLoading && filteredScholarships.length > 0 ? (
        <div>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            className="mySwiper"
          >
            {slides}
          </Swiper>

          {/* Custom Pagination */}
          <div
            className={`flex justify-center gap-4 mt-4 border-t-4 p-2 ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleBulletClick(index)}
                className={`text-lg hover:text-blue-700 btn btn-sm btn-circle btn-outline mb-8 border-t-4 ${
                  activePage === index ? 'btn-info' : 'text-orange-500'
                }`}
              >
                <FaCircle />
              </button>
            ))}
          </div>
        </div>
      ) : (
        // No Results Message
        !isLoading && (
          <div className="text-center mt-6">
            <FaExclamationTriangle
              className={`${
                darkMode ? 'text-yellow-400' : 'text-yellow-300'
              } text-8xl py-6 animate-bounce mx-auto`}
            />
            <p
              className={`text-lg ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              No scholarships found. Please try a different search.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default AllScholarship;
