// client/src/pages/AdminDashboard.js
import React from 'react';
import { FaUserEdit, FaPlusSquare, FaClipboardList, FaUsers, FaTasks, FaStarHalfAlt, FaChartBar } from 'react-icons/fa';
import MenuItem from './MenuItem';

function AdminMenu() {
  return (
    <div className="p-6 min-h-screen">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <div className="">
        <MenuItem label="My Profile" address="/dashboard/profile" icon={FaUserEdit} />
        <MenuItem label="Add Scholarship" address="/dashboard/add-scholarship"  icon={FaPlusSquare} />
        <MenuItem label="Manage Scholarships" address="/dashboard/manage-scholarship" icon={FaClipboardList} />
        <MenuItem label="Manage Applied Scholarship" address="/dashboard/all-applied-scholarship" icon={FaTasks} />
		    <MenuItem label="Manage Reviews" address="/dashboard/all-reviews" icon={FaStarHalfAlt} />
        <MenuItem label="Manage Users" address="/dashboard/manage-users" icon={FaUsers} />
		    <MenuItem label="Admin Stats" address="/dashboard/analytics" icon={FaChartBar} />
      </div>
    </div>
  );
}

export default AdminMenu;