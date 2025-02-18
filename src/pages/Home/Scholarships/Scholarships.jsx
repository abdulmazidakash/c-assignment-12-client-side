import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import ScholarshipCard from '../../../components/ScholarshipCard';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';

const Scholarships = () => {
  const axiosPublic = useAxiosPublic();
  const { darkMode } = useContext(ThemeContext); // Get darkMode from context

  const { data: scholarships, isLoading } = useQuery({
    queryKey: ['top-scholarships'],
    queryFn: async () => {
      // Fetch scholarships
      const { data } = await axiosPublic.get(`/top-scholarships`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div
      className={`container mx-auto my-8 py-12 rounded-lg shadow-md ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      }`}
    >
      {/* Section Header */}
      <div className="text-center">
        <h2
          className={`text-4xl font-extrabold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          🚀 Top Scholarships
        </h2>
        {/* Subtitle Added */}
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Find the best scholarships available for your education. Apply now and secure your future!
        </p>
      </div>

      {scholarships && scholarships.length > 0 ? (
        <div>
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
            ))}
          </div>
          <div className="text-center">
            <Link
              to={'/allScholarship'}
              className={`bg-gradient-to-tr ${
                darkMode ? 'from-sky-700 to-slate-800' : 'from-sky-900 to-slate-800'
              } text-white font-semibold btn my-4`}
            >
              View All Scholarships
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center">No data available</p>
      )}
    </div>
  );
};

export default Scholarships;
