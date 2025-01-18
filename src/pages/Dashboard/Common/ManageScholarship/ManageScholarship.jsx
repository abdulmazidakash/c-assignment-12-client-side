import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../../shared/LoadingSpinner";

const ManageScholarships = () => {

  const axiosSecure = useAxiosSecure();
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch scholarships using TanStack Query
	const { data: scholarships = [], isLoading, isError, refetch } = useQuery({
	  queryKey: ['scholarships'],
	  queryFn: async () => {
		const { data } = await axiosSecure.get('/scholarships');
		return data;
	  },
	});

  console.log(scholarships);

  // Mutation for updating scholarship
  const updateScholarship = useMutation({
    mutationFn: async (updatedScholarship) => {
      const response = await fetch(`/api/scholarships/${updatedScholarship.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedScholarship),
      });
      if (!response.ok) {
        throw new Error("Failed to update scholarship");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scholarships"] });
      Swal.fire("Success!", "Scholarship updated successfully!", "success");
      setIsModalOpen(false);
    },
  });

  // Handle Edit Button
  const handleEdit = (scholarship) => {
    setSelectedScholarship(scholarship);
    setIsModalOpen(true);
  };

  // Handle Modal Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedScholarship = {
      id: selectedScholarship.id,
      name: formData.get("name"),
      university: formData.get("university"),
      subject: formData.get("subject"),
      degree: formData.get("degree"),
      fees: formData.get("fees"),
    };
    updateScholarship.mutate(updatedScholarship);
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
		   console.log(result);
		   
		   Swal.fire("Canceled!", "You Scholarship has been canceled.", "success");
		   refetch()
		 } else {
		   // Handle cancel button click
		   Swal.fire("Cancelled", "Your Scholarship is safe.", "info");
		 }
	   } catch (err) {
		 console.error(err);
		 Swal.fire("Error!", "Something went wrong while canceling the Scholarship.", "error");
	   }
	 };

  // Loading State
  if (isLoading) return <LoadingSpinner/>;

  return (
    <div className="p-4 lg:p-8">
      <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-6">
        Manage Scholarships: {scholarships.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Scholarship Name</th>
              <th>University</th>
              <th>Subject</th>
              <th>Degree</th>
              <th>Application Fees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((scholarship, index) => (
              <tr key={scholarship._id}>
                <td>{index + 1}</td>
                <td>{scholarship.scholarshipName}</td>
                <td>{scholarship.universityName}</td>
                <td>{scholarship.subjectCategory}</td>
                <td>{scholarship.degreeCategory}</td>
                <td>${scholarship.applicationFees}</td>
                <td className="flex gap-2">
                  <Link
				  to={`/scholarships/${scholarship._id}`}
                    // onClick={() => handleEdit(scholarship)}
                    className="btn btn-sm btn-info flex items-center gap-1"
                  >
                    <FaEye />
                  </Link>
                  <button
                    onClick={() => handleEdit(scholarship)}
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
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold mb-4">Edit Scholarship</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-2">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedScholarship.name}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mb-2">
                <label className="label">University</label>
                <input
                  type="text"
                  name="university"
                  defaultValue={selectedScholarship.university}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mb-2">
                <label className="label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  defaultValue={selectedScholarship.subject}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mb-2">
                <label className="label">Degree</label>
                <input
                  type="text"
                  name="degree"
                  defaultValue={selectedScholarship.degree}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">Application Fees</label>
                <input
                  type="number"
                  name="fees"
                  defaultValue={selectedScholarship.fees}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;
