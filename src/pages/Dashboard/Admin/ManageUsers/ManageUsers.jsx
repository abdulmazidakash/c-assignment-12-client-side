import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import "./ManageUsers.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../../shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const getRandomColor = (role) => {
  const colors = {
    student: "bg-blue-500",
    moderator: "bg-green-500",
    admin: "bg-red-500",
  };
  return colors[role] || "bg-gray-500";
};

const ManageUsers = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users/${user?.email}`);
      return data;
    },
  });

  const [filterRole, setFilterRole] = useState("");

  const handleRoleChange = async (email, newRole) => {
    try {
      const response = await axiosSecure.patch(`/user/role/${email}`, {
        role: newRole,
      });

      if (response.data.modifiedCount > 0) {
        // Update the user roles locally in React Query
        Swal.fire({
          title: "Success!",
          text: "User role updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        refetch();
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Failed to update the user role.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while updating the user role.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleUserDelete = async (id) => {
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
          await axiosSecure.delete(`/user/${id}`);
          console.log(result);
          
          Swal.fire("Canceled!", "user has been canceled.", "success");
          refetch()
        } else {
          // Handle cancel button click
          Swal.fire("Cancelled", "Your user is safe.", "info");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Something went wrong while canceling the user.", "error");
      }
    };

  const filteredUsers = filterRole
    ? users.filter((user) => user.role === filterRole)
    : users;

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <>
    <Helmet>
      <title>Manage Users | ScholarshipHub</title>
    </Helmet>
    <div className="p-4 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 flex items-center gap-2">
          <HiOutlineUsers className="text-blue-500" /> Manage Users: {users?.length}
        </h1>
        <div className="flex items-center gap-2">
          <label className="text-gray-600 font-medium">Filter by Role:</label>
          <select
            className="select select-bordered select-info"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="student">Student</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-gradient-to-tr from-sky-900 to-slate-800 backdrop-blur-md text-white shadow-lg">
            <tr>
              <th className="text-left">#</th>
              <th>Image</th>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={user.image || "/default-avatar.png"}
                    alt={user.name || "N/A"}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td>
                  <div className="dropdown">
                    <label
                      tabIndex={0}
                      className={`btn btn-sm text-white ${
                        user.role
                          ? getRandomColor(user.role)
                          : "bg-gray-500"
                      }`}
                    >
                      {user.role
                        ? user.role.charAt(0).toUpperCase() +
                          user.role.slice(1)
                        : "Unknown"}
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-50 menu p-2 bg-gradient-to-tr from-sky-900 to-slate-800 backdrop-blur-md text-white shadow-lg font-semibold rounded-lg w-36"
                    >
                      {["student", "moderator", "admin"]
                        .filter((role) => role !== user.role)
                        .map((role) => (
                          <li key={role} >
                            <button
                              onClick={() => handleRoleChange(user.email, role)}
                              className="hover:bg-gray-100 rounded-md px-4 py-2 text-black"
                            >
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleUserDelete(user._id)}
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
    </div>
    </>
  );
};

export default ManageUsers;
