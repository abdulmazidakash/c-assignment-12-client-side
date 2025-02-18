import React, { useState, useContext } from "react";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../../../context/ThemeContext"; // ThemeContext 

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const { darkMode } = useContext(ThemeContext); // Dark Mode State

  // Fetch all reviews
  const { data: allReviews = [], isLoading, refetch } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const response = await axiosSecure.get("/all-reviews");
      setReviews(response.data);
      return response.data;
    },
  });

  // Handle review deletion
  const handleDeleteReview = async (reviewId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/all-reviews/${reviewId}`);
        Swal.fire("Deleted!", "The review has been deleted.", "success");
        refetch(); // Refresh the review list
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to delete the review.", "error");
      console.error("Delete Error:", error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>All Reviews | ScholarshipHub</title>
      </Helmet>

      <div
        className={`container mx-auto py-6 px-4 transition-all duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          All Reviews ({reviews.length})
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className={`card shadow-lg p-4 rounded-lg transition-all duration-300 ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            >
              {/* Reviewer Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.userImage || "https://via.placeholder.com/50"}
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-lg">{review.reviewerName}</h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Reviewed University */}
              <h4 className="text-xl font-semibold mb-1">{review.universityName}</h4>
              <p
                className={`text-sm mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                <span className="font-semibold">Subject Category:</span>{" "}
                {review.subjectCategory || "N/A"}
              </p>
              <p
                className={`text-sm mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                <span className="font-semibold">Reviewer Name:</span>{" "}
                {review.userName || "N/A"}
              </p>

              {/* Reviewer Comment */}
              <p
                className={`mb-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
              >
                <span className="font-semibold">Comments:</span> {review.comment}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
                <span
                  className={`text-sm ml-2 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  ({review.rating}/5)
                </span>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteReview(review._id)}
                className="btn btn-sm btn-error flex items-center gap-1"
              >
                <FaTrashAlt />
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllReviews;
