import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaTimes, FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AddReviewModal = ({ selectedApplication, onClose, refetch }) => {
  
  
  const { universityName, scholarshipCategory, subjectCategory,  student: { scholarshipId }, } = selectedApplication;
  
  console.log(selectedApplication);
  const { user } = useAuth();
  console.log(user);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [reviewDate, setReviewDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Fields",
        text: "Please fill out all fields before submitting.",
      });
      return;
    }

    const reviewData = {
      scholarshipCategory,
      universityName,
      scholarshipId,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL,
      rating,
      comment,
      reviewDate,
      subjectCategory,
    };

    console.log(reviewData);

    try {
      const response = await axiosSecure.post("/add-review", reviewData);
      console.log(response);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted",
          text: "Your review has been submitted successfully.",
        });
        onClose(); // Close the modal
        refetch();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      console.log(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data.message}`,
      });
      onClose(); // Close the modal
        refetch();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg h-[80vh] max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaStar className="text-yellow-500" /> Add Review
        </h2>

        <form onSubmit={handleSubmit}>
          {/* University Name */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">University Name:</label>
            <p className="text-gray-700">{universityName}</p>
          </div>

          {/* Scholarship Name */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Scholarship Name:</label>
            <p className="text-gray-700">{scholarshipCategory}</p>
          </div>
          {/* University _id */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">University Id:</label>
            <p className="text-gray-700">{scholarshipId}</p>
          </div>

      

          {/* Rating */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Rating (1-5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Review Comment */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Review Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="textarea textarea-bordered w-full"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Review Date */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Review Date:</label>
            <input
              type="date"
              value={reviewDate}
              onChange={(e) => setReviewDate(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* User Info */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">User Name:</label>
            <p className="text-gray-700">{user?.displayName}</p>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">User Email:</label>
            <p className="text-gray-700">{user?.email}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
