import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaEdit, FaTrashAlt, FaStar } from "react-icons/fa";
import LoadingSpinner from "../../../../shared/LoadingSpinner";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";

const MyApplication = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      universityName: "Harvard University",
      address: "Cambridge, MA, USA",
      feedback: "Excellent application",
      subjectCategory: "Engineering",
      appliedDegree: "Master's",
      applicationFees: "$150",
      serviceCharge: "$20",
      status: "pending",
    },
    {
      id: 2,
      universityName: "Oxford University",
      address: "Oxford, UK",
      feedback: "Review in process",
      subjectCategory: "Arts",
      appliedDegree: "Bachelor's",
      applicationFees: "$100",
      serviceCharge: "$15",
      status: "processing",
    },
  ]);

  const axiosSecure = useAxiosSecure();
const { user } = useAuth();
console.log(user);

  const { data: myApplication= [], isLoading, refetch } = useQuery({
    queryKey: ['myApplication', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/apply-scholarship/${user?.email}`);
      return data;
    },
  });

  console.log(myApplication);

  if(isLoading) return <LoadingSpinner/>

  const handleEdit = (status) => {
    if (status === "processing") {
      Swal.fire({
        icon: "warning",
        title: "Cannot Edit",
        text: "You cannot edit an application that is being processed.",
      });
    }
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setApplications(applications.filter((app) => app.id !== id));
        Swal.fire("Canceled!", "Your application has been canceled.", "success");
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-6">My Applications</h1>
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
            {applications.map((app, index) => (
              <tr key={app.id}>
                <th>{index + 1}</th>
                <td>{app.universityName}</td>
                <td>{app.address}</td>
                <td>{app.feedback}</td>
                <td>{app.subjectCategory}</td>
                <td>{app.appliedDegree}</td>
                <td>{app.applicationFees}</td>
                <td>{app.serviceCharge}</td>
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
                  <button
                    className="btn btn-sm btn-primary flex items-center gap-1"
                    onClick={() => alert("Viewing details...")}
                  >
                    <FaEye /> Details
                  </button>
                  <button
                    className="btn btn-sm btn-secondary flex items-center gap-1"
                    onClick={() => handleEdit(app.status)}
                    disabled={app.status !== "pending"}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error flex items-center gap-1"
                    onClick={() => handleCancel(app.id)}
                  >
                    <FaTrashAlt /> Cancel
                  </button>
                  <button
                    className="btn btn-sm btn-accent flex items-center gap-1"
                    onClick={() => alert("Add review")}
                  >
                    <FaStar /> Add Review
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
