import React from 'react';
import { FaUser, FaFileAlt, FaStar } from 'react-icons/fa';
import MenuItem from './MenuItem';

function StudentMenu() {
  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <div className="">
        <MenuItem label="My Profile" address="/my-profile" icon={FaUser} />
        <MenuItem label="My Applications" address="/my-applications" icon={FaFileAlt} />
        <MenuItem label="My Reviews" address="/my-reviews" icon={FaStar} />
      </div>
    </div>
  );
}

export default StudentMenu;