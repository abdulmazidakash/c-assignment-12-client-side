import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../../../shared/LoadingSpinner";

const MyReviews = () => {
  const [editReview, setEditReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  console.log(user);

  // Fetch reviews based on user email
  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/review?email=${user?.email}`);
      return response.data;
    },
    onError: (error) => {
      console.error("Error fetching reviews:", error);
    },
    retry: false,
  });

  console.log("reviews: ", reviews);

  // Handle editing a review
  const handleEdit = (review) => {
    setEditReview(review);
    setIsModalOpen(true);
  };

  // Handle modal form submission for editing a review
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/review/${editReview._id}`, editReview);
      Swal.fire("Success!", "Review updated successfully.", "success");
      setIsModalOpen(false);
      refetch(); // Refetch reviews after the update
    } catch (error) {
      console.error("Error updating review:", error);
      Swal.fire("Error!", "Failed to update review.", "error");
    }
  };

  // Handle deleting a review
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/review/${id}`);
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
        refetch(); // Refetch reviews after deletion
      } catch (error) {
        console.error("Error deleting review:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  // Loader or Error handling
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading reviews.</div>;

  // Ensure reviews is always an array
  const reviewList = Array.isArray(reviews) ? reviews : [];

  return (
    <>
      <Helmet>
        <title>My Reviews | ScholarshipHub</title>
      </Helmet>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Reviews</h1>
        <div className="overflow-x-auto">
          <table className="table w-full table-auto">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th>#</th>
                <th>Scholarship Name</th>
                <th>University Name</th>
                <th>Comments</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviewList.length > 0 ? (
                reviewList.map((review, index) => (
                  <tr
                    key={review._id}
                    className="hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-800"
                  >
                    <td>{index + 1}</td>
                    <td className="text-gray-900 dark:text-gray-100">
                      {review.scholarshipCategory}
                    </td>
                    <td className="text-gray-900 dark:text-gray-100">
                      {review.universityName}
                    </td>
                    <td className="text-gray-900 dark:text-gray-100">
                      {review.comment}
                    </td>
                    <td className="text-gray-900 dark:text-gray-100">
                      {review.reviewDate}
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(review)}
                        className="btn btn-primary dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="btn btn-danger ml-2 dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for editing review */}
        {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <h2 className="text-xl font-bold mb-4">Edit Review</h2>
              <form onSubmit={handleModalSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Scholarship Name
                  </label>
                  <input
                    type="text"
                    value={editReview?.scholarshipCategory || ""}
                    onChange={(e) =>
                      setEditReview({ ...editReview, scholarshipCategory: e.target.value })
                    }
                    className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold  text-gray-900 dark:text-white">
                    University Name
                  </label>
                  <input
                    type="text"
                    value={editReview?.universityName || ""}
                    onChange={(e) =>
                      setEditReview({ ...editReview, universityName: e.target.value })
                    }
                    className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Review Comments
                  </label>
                  <textarea
                    value={editReview?.comment || ""}
                    onChange={(e) =>
                      setEditReview({ ...editReview, comment: e.target.value })
                    }
                    className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-white"
                    rows="4"
                    required
                  />
                </div>
                <div className="modal-action">
                  <button type="submit" className="btn btn-success dark:bg-green-600 dark:hover:bg-green-500">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn dark:bg-gray-600 dark:hover:bg-gray-500"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyReviews;
