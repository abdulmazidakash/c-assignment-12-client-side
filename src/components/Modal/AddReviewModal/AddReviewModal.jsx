import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddReviewModal = ({ scholarshipName, universityName, universityId, userName, userEmail, onClose }) => {
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  const handleSubmitReview = async () => {
    try {
      const review = {
        scholarshipName,
        universityName,
        universityId,
        userName,
        userEmail,
        rating: Number(rating), // Ensure it's stored as a number
        reviewComment,
        reviewDate: new Date(), // Automatically set the current date
      };

      // Make a POST request to the backend
      await axios.post('http://localhost:5000/api/reviews', review);

      Swal.fire('Success', 'Your review has been submitted!', 'success');
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error('Error submitting review:', error);
      Swal.fire('Error', 'Failed to submit the review.', 'error');
    }
  };

  return (
    <div className="modal fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="modal-content bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Review</h2>

        <label className="block mb-2">
          <span>Rating (1-5):</span>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="block w-full border rounded p-2 mt-1"
            min="1"
            max="5"
          />
        </label>

        <label className="block mb-4">
          <span>Review Comment:</span>
          <textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            className="block w-full border rounded p-2 mt-1"
            rows="4"
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            className="btn btn-error"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmitReview}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
