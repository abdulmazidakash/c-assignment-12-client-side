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

  // const handleEdit = (status) => {
  //   if (status === "processing") {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Cannot Edit",
  //       text: "You cannot edit an application that is being processed.",
  //     });
  //   }
  // };



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

  const handleMyApplicationEdit = async() =>{

  }
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-6">My Applications: {myApplications.length} </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
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
                <td>{app.universityName}</td>
                <td>{app.myApplicationInfo.universityCity},{app.myApplicationInfo.universityCountry}</td>
                <td>{app.feedback}</td>
                <td>{app.subjectCategory}</td>
                <td>{app.degree}</td>
                <td>${app.myApplicationInfo.applicationFees}</td>
                <td>${app.myApplicationInfo.serviceCharge}</td>
                <td
                  className={`capitalize font-semibold ${
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
                <td className="flex gap-2">

                 {/* application details button  */}
                  <Link
                  to={`/scholarships/${app.student.scholarshipId}`}
                    className="btn btn-sm btn-primary flex items-center gap-1"
                    // onClick={() => alert("Viewing details...")}
                  >
                    <FaEye />
                  </Link>

                  {/* application edit button  */}
                  <Link
                    to={`/dashboard/edit-my-application/${app._id}`}
                    className="btn btn-sm btn-secondary flex items-center gap-1"
                    // onClick={() => handleEdit(app.status)}
                    // disabled={app.status !== "pending"}
                  >
                    <FaEdit />
                  </Link>

                  {/* application cancel button  */}
                  <button
                    className="btn btn-sm btn-error flex items-center gap-1"
                    onClick={() => handleMyApplicationCancel(app._id)}
                  >
                    <FaTrashAlt />
                  </button>

                  {/* application add review button  */}
                  <button
                    className="btn btn-sm btn-accent flex items-center gap-1"
                    onClick={() => alert("Add review")}
                  >
                    <FaStar />
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
