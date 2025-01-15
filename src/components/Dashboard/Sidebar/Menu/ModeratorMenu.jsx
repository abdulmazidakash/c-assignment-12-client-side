import React from 'react';
import { FaUserEdit, FaClipboardCheck, FaStarHalfAlt, FaPlusSquare } from 'react-icons/fa';
import MenuItem from './MenuItem';

function ModeratorMenu() {
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Moderator Dashboard</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <div className="">
        <MenuItem label="My Profile" address="/dashboard/profile" icon={FaUserEdit} />
        <MenuItem label="Manage Scholarships" address="/moderator-scholarships" icon={FaClipboardCheck} />
        <MenuItem label="All Reviews" address="/moderator-reviews" icon={FaStarHalfAlt} />
       <MenuItem label="Add Scholarship" address="/dashboard/add-scholarship" icon={FaPlusSquare} />
      </div>
    </div>
  );
}

export default ModeratorMenu;