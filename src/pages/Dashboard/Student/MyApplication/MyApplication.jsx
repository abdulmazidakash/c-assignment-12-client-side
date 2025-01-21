import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaEdit, FaTrashAlt, FaStar } from "react-icons/fa";
import LoadingSpinner from "../../../../shared/LoadingSpinner";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { Link } from "react-router-dom";
import AddReviewModal from "../../../../components/Modal/AddReviewModal/AddReviewModal";
import { Helmet } from "react-helmet-async";

const MyApplication = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const { data: myApplications = [], isLoading, refetch } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/apply-scholarship/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const handleAddReview = (application) => {
    console.log("Selected Application:", application); // Debugging
    setShowReviewModal(true);
    setSelectedApplication(application);
  };
  

  const handleEdit = (status, navigateTo) => {
    if (status !== "pending") {
      Swal.fire({
        icon: "warning",
        title: "Cannot Edit",
        text: "You cannot edit an application that is being processed.",
      });
    } else {
      window.location.href = navigateTo;
    }
  };

  const handleMyApplicationCancel = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/my-application/${id}`);
        Swal.fire("Canceled!", "Your application has been canceled.", "success");
        refetch();
      } else {
        Swal.fire("Cancelled", "Your application is safe.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong while canceling the application.", "error");
    }
  };

  return (
    <>
    <Helmet>
      <title>My Applications | ScholarshipHub</title>
    </Helmet>
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        My Applications: {myApplications.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>University Name</th>
              <th>Address</th>
              <th>Feedback</th>
              <th>Subject</th>
              <th>Degree</th>
              <th>App Fees</th>
              <th>Service Charge</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myApplications.map((app, index) => (
              <tr key={app._id}>
                <th>{index + 1}</th>
                <td className="whitespace-normal">{app.universityName}</td>
                <td className="whitespace-nowrap">
                  {app.myApplicationInfo.universityCity}, {app.myApplicationInfo.universityCountry}
                </td>
                <td>{app.feedback || "N/A"}</td>
                <td>{app.subjectCategory}</td>
                <td>{app.degree}</td>
                <td>${app.myApplicationInfo.applicationFees}</td>
                <td>${app.myApplicationInfo.serviceCharge}</td>
                <td
                  className={`font-semibold ${
                    app.status === "pending"
                      ? "text-yellow-500"
                      : app.status === "processing"
                      ? "text-blue-500"
                      : app.status === "completed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {app.status}
                </td>
                <td className="flex gap-2 justify-center items-center">
                  <Link
                    to={`/scholarships/${app.student.scholarshipId}`}
                    className="btn btn-sm btn-primary flex items-center gap-1"
                  >
                    <FaEye />
                  </Link>

                  <Link
                    to="#"
                    className="btn btn-sm btn-secondary flex items-center gap-1"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(app.status, `/dashboard/edit-my-application/${app._id}`);
                    }}
                  >
                    <FaEdit />
                  </Link>

                  <button
                    className="btn btn-sm btn-error flex items-center gap-1"
                    onClick={() => handleMyApplicationCancel(app._id)}
                  >
                    <FaTrashAlt />
                  </button>

                  <button
                    className="btn btn-sm btn-accent flex items-center gap-1"
                    onClick={() => {
                      handleAddReview(app);
                      setShowReviewModal(true);
                    }}
                  >
                    <FaStar />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showReviewModal && selectedApplication && (
        <AddReviewModal
          selectedApplication={selectedApplication}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedApplication(null); // Clear selected application after closing
          }}
          refetch={refetch}
        />
      )}

      </div>
    </div>
    </>
  );
};

export default MyApplication;
