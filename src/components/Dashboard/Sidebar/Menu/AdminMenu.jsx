// client/src/pages/AdminDashboard.js
import React from 'react';
import { FaUserEdit, FaPlusSquare, FaClipboardList, FaUsers, FaTasks, FaStarHalfAlt } from 'react-icons/fa';
import MenuItem from './MenuItem';

function AdminMenu() {
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <div className="">
         <MenuItem label="My Profile" address="/moderator-profile" icon={FaUserEdit} />
        <MenuItem label="Add Scholarship" address="/add-scholarship" icon={FaPlusSquare} />
        <MenuItem label="Manage Scholarships" address="/manage-scholarships" icon={FaClipboardList} />
        <MenuItem label="Manage Applications" address="/manage-applications" icon={FaTasks} />
        <MenuItem label="Manage Users" address="/manage-users" icon={FaUsers} />
		<MenuItem label="All Reviews" address="/moderator-reviews" icon={FaStarHalfAlt} />
      </div>
    </div>
  );
}

export default AdminMenu;