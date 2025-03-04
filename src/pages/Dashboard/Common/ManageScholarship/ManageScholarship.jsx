import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../../shared/LoadingSpinner";
import UpdateScholarshipModal from "../../../../components/Modal/UpdateScholarshipModal/UpdateScholarshipModal";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../../../context/ThemeContext"; // Assuming you have a ThemeContext

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("none"); // State for selected filter/sort option
  const { darkMode } = useContext(ThemeContext); // Get darkMode from context

  // Fetch scholarships using TanStack Query
  const {
    data: scholarships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/scholarships");
      return data;
    },
  });

  // Sort and filter scholarships
  const sortedScholarships = [...scholarships].sort((a, b) => {
    if (sortOption === "appliedDate") {
      return new Date(a.appliedDate) - new Date(b.appliedDate);
    }
    if (sortOption === "deadline") {
      return new Date(a.applicationDeadline) - new Date(b.applicationDeadline);
    }
    return 0; // No sorting
  });

  // Handle update functionality
  const handleScholarshipEdit = async (updatedData) => {
    try {
      const response = await axiosSecure.put(
        `/edit-manage-scholarship/${selectedScholarship._id}`,
        updatedData
      );

      if (response.data.success) {
        Swal.fire("Success", response.data.message, "success");
        setIsModalOpen(false);
        refetch(); // Refetch the data after successful update
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("Error updating scholarship:", error);
      Swal.fire("Error", "Failed to update the scholarship.", "error");
    }
  };

  // Handle Delete Button
  const handleScholarshipDelete = async (id) => {
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
        await axiosSecure.delete(`/scholarship/${id}`);
        Swal.fire("Canceled!", "Your scholarship has been canceled.", "success");
        refetch();
      } else {
        Swal.fire("Cancelled", "Your scholarship is safe.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong while canceling the scholarship.", "error");
    }
  };

  // Loading state
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Manage Scholarships | ScholarshipHub</title>
      </Helmet>
      <div
        className={`p-4 lg:p-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}
      >
        <h1
          className={`text-2xl lg:text-4xl font-bold ${darkMode ? "text-white" : "text-gray-800"} mb-6`}
        >
          Manage Scholarships: {scholarships.length}
        </h1>

        {/* Sorting/Filtering Dropdown */}
        <div className="flex justify-center mb-6">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={`select select-bordered w-full max-w-xs ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
          >
            <option value="none">Sort By</option>
            <option value="appliedDate">Applied Date</option>
            <option value="deadline">Scholarship Deadline</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table
            className={`table w-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Scholarship Name</th>
                <th>University</th>
                <th>Subject</th>
                <th>Degree</th>
                <th>Application Fees</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedScholarships.map((scholarship, index) => (
                <tr key={scholarship._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={scholarship.image || "default-image-url.jpg"} // Default image if none provided
                      alt={scholarship.scholarshipName}
                      className="w-12 h-12 rounded-lg object-cover" // Adjust size and style
                    />
                  </td>
                  <td>{scholarship.scholarshipName}</td>
                  <td>{scholarship.universityName}</td>
                  <td>{scholarship.subjectCategory}</td>
                  <td>{scholarship.degreeCategory}</td>
                  <td>${scholarship.applicationFees}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/scholarships/${scholarship._id}`}
                      className="btn btn-sm btn-info flex items-center gap-1"
                    >
                      <FaEye />
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedScholarship(scholarship);
                        setIsModalOpen(true);
                      }}
                      className="btn btn-sm btn-warning flex items-center gap-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleScholarshipDelete(scholarship._id)}
                      className="btn btn-sm btn-error flex items-center gap-1"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && selectedScholarship && (
          <UpdateScholarshipModal
            handleScholarshipEdit={handleScholarshipEdit}
            selectedScholarship={selectedScholarship}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </>
  );
};

export default ManageScholarships;
