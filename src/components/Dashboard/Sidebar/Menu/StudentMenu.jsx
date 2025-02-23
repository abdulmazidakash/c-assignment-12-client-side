import React, { useState } from 'react';
import { FaUser, FaFileAlt, FaStar } from 'react-icons/fa';
import MenuItem from './MenuItem';

function StudentMenu() {

  
  return (
    <div className="p-6  min-h-screen">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <div className="">


        <MenuItem label="My Applications" address="/dashboard/my-application" icon={FaFileAlt} />
        <MenuItem label="My Reviews" address="/dashboard/my-reviews" icon={FaStar} />
      </div>
    </div>
  );
}

export default StudentMenu;
