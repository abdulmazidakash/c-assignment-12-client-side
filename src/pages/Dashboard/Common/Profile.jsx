import React, { useContext } from 'react';
import { FiCamera } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../../../context/ThemeContext'; // Assuming ThemeContext is set up

const Profile = () => {
  const { user } = useAuth();
  const [role, isLoading] = useRole();
  const { darkMode } = useContext(ThemeContext); // Get darkMode from context

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>My Profile | ScholarshipHub</title>
      </Helmet>
      <div
        className={`${
          darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
        } flex flex-col items-center justify-center px-6 py-12 my-8 rounded-lg`}
      >
        <div
          className={`${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg rounded-lg w-full max-w-3xl p-8`}
        >
          {/* Profile Header */}
          <h1
            className={`${
              darkMode ? 'text-white' : 'text-gray-800'
            } text-4xl font-bold mb-6 text-center`}
          >
            Profile
          </h1>

          {/* Profile Content */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
              <img
                referrerPolicy="no-referrer"
                src={user?.photoURL}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
              />
              <button
                className={`absolute bottom-2 right-2 ${
                  darkMode ? 'bg-pink-600' : 'bg-pink-500'
                } text-white p-2 rounded-full hover:bg-pink-700`}
              >
                <FiCamera size={16} />
              </button>
            </div>

            {/* User Info */}
            <div className="flex flex-col w-full">
              <div className="mb-4">
                <label
                  className={`${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  } block text-sm font-medium mb-2`}
                >
                  User Name
                </label>
                <input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className={`input input-bordered w-full ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                  }`}
                />
              </div>

              <div className="mb-4">
                <label
                  className={`${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  } block text-sm font-medium mb-2`}
                >
                  E-mail
                </label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className={`input input-bordered w-full ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 text-center">
            <button
              className={`btn bg-gradient-to-r uppercase ${
                darkMode ? 'from-pink-600 to-red-600' : 'from-pink-500 to-red-500'
              } text-white hover:from-red-500 hover:to-pink-500`}
            >
              Role: {role}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
