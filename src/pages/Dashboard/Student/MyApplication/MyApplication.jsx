import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaEdit, FaTrashAlt, FaStar } from "react-icons/fa";
import LoadingSpinner from "../../../../shared/LoadingSpinner";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { Link } from "react-router-dom";

const MyApplication = () => {

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user);

  const { data: myApplications = [], isLoading, refetch } = useQuery({
    queryKey: ['myApplications', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/apply-scholarship/${user?.email}`);
      return data;
    },
  });

  console.log(myApplications);

  if(isLoading) return <LoadingSpinner/>

  const handleEdit = (status, navigateTo) => {
    if (status !== "pending") {
      Swal.fire({
        icon: "warning",
        title: "Cannot Edit",
        text: "You cannot edit an application that is being processed.",
      });
    } else {
      // Navigate to the edit page for other statuses
      window.location.href = navigateTo;
    }
  };



  //handle my application delete/cancellation
  
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
        // Perform delete operation if confirmed
        await axiosSecure.delete(`/my-application/${id}`);
        
        // Optionally update UI or state here
        // Example: setApplications(applications.filter((app) => app.id !== id));
        
        Swal.fire("Canceled!", "Your application has been canceled.", "success");
        refetch()
      } else {
        // Handle cancel button click
        Swal.fire("Cancelled", "Your application is safe.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong while canceling the application.", "error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
  <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
    My Applications: {myApplications.length}
  </h1>

  {/* Table Wrapper */}
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
            <td className="whitespace-normal">
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
            <td className="flex flex-wrap gap-2 justify-center items-center">
              {/* View Details Button */}
              <Link
                to={`/scholarships/${app.student.scholarshipId}`}
                className="btn btn-sm btn-primary flex items-center gap-1"
              >
                <FaEye />
              </Link>

              {/* Edit Application Button */}
              <Link
                to="#"
                className="btn btn-sm btn-secondary flex items-center gap-1"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default navigation
                  handleEdit(app.status, `/dashboard/edit-my-application/${app._id}`);
                }}
              >
                <FaEdit />
              </Link>

              {/* Cancel Application Button */}
              <button
                className="btn btn-sm btn-error flex items-center gap-1"
                onClick={() => handleMyApplicationCancel(app._id)}
              >
                <FaTrashAlt />
              </button>

              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default MyApplication;
