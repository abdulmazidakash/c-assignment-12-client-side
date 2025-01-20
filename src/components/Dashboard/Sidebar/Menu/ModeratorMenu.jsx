import React from 'react';
import { FaUserEdit, FaClipboardCheck, FaStarHalfAlt, FaPlusSquare, FaTasks } from 'react-icons/fa';
import MenuItem from './MenuItem';

function ModeratorMenu() {
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Moderator Dashboard</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <div className="">
        <MenuItem label="My Profile" address="/dashboard/profile" icon={FaUserEdit} />
       <MenuItem label="Add Scholarship" address="/dashboard/add-scholarship" icon={FaPlusSquare} />
        <MenuItem label="Manage Scholarships" address="/dashboard/manage-scholarship" icon={FaClipboardCheck} />
        <MenuItem label="All Applied Scholarship" address="/dashboard/all-applied-scholarship" icon={FaTasks} />
        <MenuItem label="All Reviews" address="/dashboard/all-reviews" icon={FaStarHalfAlt} />
      </div>
    </div>
  );
}

export default ModeratorMenu;