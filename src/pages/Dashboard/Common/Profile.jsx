import React from 'react';
import { FiCamera } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import useScholarship from '../../../hooks/useScholarship';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import useRole from '../../../hooks/useRole';

const Profile = () => {
  const {user} = useAuth();
  // const {scholarship, isLoading} = useScholarship();
  const [role, isLoading] = useRole();

  if(isLoading) return <LoadingSpinner/>
  // console.log(scholarship);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-12">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
        {/* Profile Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Profile
        </h1>

        {/* Profile Content */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="relative">
            <img
            referrerPolicy='no-referrer'
              src={user?.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
            />
            <button className="absolute bottom-2 right-2 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600">
              <FiCamera size={16} />
            </button>
          </div>

          {/* User Info */}
          <div className="flex flex-col w-full">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                User Name
              </label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

          
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 text-center">
          <button className="btn bg-gradient-to-r uppercase from-pink-500 to-red-500 text-white hover:from-red-500 hover:to-pink-500">
           Role: {role}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
