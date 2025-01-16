import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaSearch } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import ScholarshipCard from '../../components/ScholarshipCard';

const AllScholarship = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const axiosPublic = useAxiosPublic();

  // Fetch scholarships using TanStack Query
  const { data: scholarships = [], isLoading, isError } = useQuery({
    queryKey: ['scholarships'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/scholarships');
      return data;
    },
  });

  // Filter scholarships based on the search query
  const filteredScholarships = scholarships.filter((scholarship) =>
    scholarship.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholarship.scholarshipCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholarship.subjectCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search Bar */}
      <div className="flex justify-center items-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by University Name, Scholarship Category, or Subject"
          className="input input-bordered w-full max-w-md"
        />
        <button className="btn btn-primary ml-4 flex items-center gap-2">
          <FaSearch />
          Search
        </button>
      </div>

      {/* Loading and Error States */}
      {isLoading && (
        <p className="text-center text-gray-600">Loading scholarships...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">Failed to load scholarships. Please try again later.</p>
      )}

      {/* Scholarship Cards */}
      {!isLoading && filteredScholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          ))}
        </div>
      ) : (
        // No Results Message
        !isLoading && (
          <div className="text-center mt-6">
            <img
              src="https://via.placeholder.com/400x300?text=No+Scholarships+Available"
              alt="No scholarships available"
              className="mx-auto mb-4"
            />
            <p className="text-lg text-gray-600">
              No scholarships found. Please try a different search.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default AllScholarship;
