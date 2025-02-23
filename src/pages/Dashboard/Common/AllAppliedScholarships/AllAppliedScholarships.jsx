import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEye, FaCommentDots, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../../../context/ThemeContext"; // Assuming you have a ThemeContext

const AllAppliedScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const { darkMode } = useContext(ThemeContext); // Get darkMode from context

  // Fetching all applied scholarships
  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applyScholarships"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/apply-scholarships");
      return data;
    },
  });

  // Handle application cancellation
  const handleCancel = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel it!",
      });

      if (result.isConfirmed) {
        await axiosSecure.patch(`/apply-scholarship/cancel/${id}`);
        Swal.fire("Cancelled!", "The application has been canceled.", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to cancel the application.", "error");
    }
  };

  // Handle feedback submission
  const handleSubmitFeedback = async () => {
    try {
      await axiosSecure.patch(`/apply-scholarship/${selectedApplication._id}/feedback`, {
        feedback,
      });
      Swal.fire("Success!", "Feedback submitted successfully.", "success");
      setIsFeedbackModalOpen(false);
      refetch();
      setFeedback('');
    } catch (err) {
      Swal.fire("Error!", "Failed to submit feedback.", "error");
    }
  };

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/update-status/${id}`, { status: newStatus });
      Swal.fire("Success!", "Application status updated successfully.", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error!", "Failed to update application status.", "error");
    }
  };

  // Loading state
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>All Applied Scholarships | ScholarshipHub</title>
      </Helmet>
      <div className={`p-4 lg:p-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
        <h1 className={`text-2xl lg:text-4xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
          All Applied Scholarships: {applications.length}
        </h1>

        <div className="overflow-x-auto">
          <table className={`table w-full rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}>
            <thead  className={`rounded-lg ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"}`}>
              <tr>
                <th>#</th>
                <th>Applicant Email</th>
                <th>University</th>
                <th>Degree</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr key={application._id}>
                  <td>{index + 1}</td>
                  <td>{application.student?.userEmail}</td>
                  <td>{application.universityName}</td>
                  <td>{application.degree}</td>
                  <td>{application.scholarshipCategory}</td>

                  <td>
                    <select
                      value={application.status} // Current status of the application
                      onChange={(e) => handleStatusChange(application._id, e.target.value)} // Handle changes
                      disabled={application.status === "completed"} // Disable if status is "completed"
                      className={`select select-bordered select-sm ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"} 
                        ${application.status === "pending" ? "select-warning" : 
                        application.status === "processing" ? "select-info" : "select-success"}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>

                  <td className="flex gap-2">
                    {/* Details Button */}
                    <button
                      onClick={() => {
                        setSelectedApplication(application);
                        setIsDetailsModalOpen(true);
                      }}
                      className={`btn btn-sm flex items-center gap-1 ${darkMode ? "btn-info" : "btn-outline btn-info"}`}
                    >
                      <FaEye title="View Details" />
                    </button>
                    {/* Feedback Button */}
                    <button
                      onClick={() => {
                        setSelectedApplication(application);
                        setIsFeedbackModalOpen(true);
                      }}
                      className={`btn btn-sm flex items-center gap-1 ${darkMode ? "btn-primary" : "btn-outline btn-primary"}`}
                    >
                      <FaCommentDots title="Feedback" />
                    </button>
                    {/* Cancel Button */}
                    <button
                      onClick={() => handleCancel(application._id)}
                      className={`btn btn-sm flex items-center gap-1 ${darkMode ? "btn-error" : "btn-outline btn-error"}`}
                    >
                      <FaTrashAlt title="Cancel" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Details Modal */}
        {isDetailsModalOpen && selectedApplication && (
          <div className="modal modal-open">
            <div className={`modal-box ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
              <h3 className="font-bold text-lg">Application Details</h3>
              <p className="mt-2">
                <strong>University:</strong> {selectedApplication.universityName}
              </p>
              <p>
                <strong>Degree:</strong> {selectedApplication.degree}
              </p>
              <p>
                <strong>Scholarship Category:</strong> {selectedApplication.scholarshipCategory}
              </p>
              <p>
                <strong>Application Status:</strong> {selectedApplication.status}
              </p>
              <div className="modal-action">
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className={`btn btn-sm ${darkMode ? "btn-error" : "btn-outline btn-error"}`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Modal */}
        {isFeedbackModalOpen && selectedApplication && (
          <div className="modal modal-open">
            <div className={`modal-box ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
              <h3 className="font-bold text-lg">Provide Feedback</h3>
              <textarea
                className={`textarea textarea-bordered w-full mt-2 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
              <div className="modal-action">
                <button
                  onClick={handleSubmitFeedback}
                  className={`btn btn-sm ${darkMode ? "btn-primary" : "btn-outline btn-primary"}`}
                >
                  Submit
                </button>
                <button
                  onClick={() => setIsFeedbackModalOpen(false)}
                  className={`btn btn-sm ${darkMode ? "btn-error" : "btn-outline btn-error"}`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllAppliedScholarships;
