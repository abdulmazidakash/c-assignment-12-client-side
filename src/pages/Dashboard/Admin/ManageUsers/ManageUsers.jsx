import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import './ManageUsers.css'

const getRandomColor = (role) => {
  const colors = {
    user: "bg-blue-500",
    moderator: "bg-green-500",
    admin: "bg-red-500",
  };
  return colors[role] || "bg-gray-500";
};

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "user" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "moderator" },
    { id: 3, name: "Admin User", email: "admin@example.com", role: "admin" },
  ]);

  const [filterRole, setFilterRole] = useState("");

  const handleRoleChange = (id, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const filteredUsers = filterRole
    ? users.filter((user) => user.role === filterRole)
    : users;

  return (
    <div className="p-4 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 flex items-center gap-2">
          <HiOutlineUsers className="text-blue-500" /> Manage Users
        </h1>
        <div className="flex items-center gap-2">
          <label className="text-gray-600 font-medium">Filter by Role:</label>
          <select
            className="select select-bordered select-info"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="text-left">#</th>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
				<div className="dropdown">
					<label
						tabIndex={0}
						className={`btn btn-sm text-white ${getRandomColor(user.role)}`}
					>
						{user.role.charAt(0).toUpperCase() + user.role.slice(1)}
					</label>
					<ul
						tabIndex={0}
						className="dropdown-content z-50 menu p-2 shadow-lg bg-white rounded-lg w-36 border border-gray-400"
					>
						{["user", "moderator", "admin"]
						.filter((role) => role !== user.role)
						.map((role) => (
							<li key={role}>
							<button
								onClick={() => handleRoleChange(user.id, role)}
								className={`hover:bg-gray-100 rounded-md px-4 py-2 my-2  text-black ${getRandomColor(
								role
								)}`}
								style={{
								textDecoration: "none", // Remove underline
								outline: "none", // Remove focus outline
								}}
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
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-sm btn-error flex items-center gap-1"
                  >
                    <FaTrashAlt /> Delete
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

export default ManageUsers;
