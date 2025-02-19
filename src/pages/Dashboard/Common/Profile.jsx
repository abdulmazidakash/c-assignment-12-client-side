import React, { useContext } from "react";
import { FiCamera } from "react-icons/fi";
import { FaMapMarkerAlt, FaEnvelope, FaGlobe, FaPhone, FaUserFriends, FaUsers } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../../context/ThemeContext";

const Profile = () => {
  const { user } = useAuth();
  const [role, isLoading] = useRole();
  const { darkMode } = useContext(ThemeContext);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>My Profile | ScholarshipHub</title>
      </Helmet>

      <div
        className={`flex flex-col lg:flex-row gap-6 p-4 md:p-6 min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        {/* Sidebar Profile Info */}
        <div
          className={`w-full lg:w-1/3 p-4 md:p-6 rounded-xl shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                referrerPolicy="no-referrer"
                src={user?.photoURL}
                alt="Profile"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-gray-200 object-cover"
              />
              <button
                className={`absolute bottom-2 right-2 p-2 rounded-full ${
                  darkMode ? "bg-pink-600" : "bg-pink-500"
                } text-white hover:bg-pink-700`}
              >
                <FiCamera size={16} />
              </button>
            </div>

            <h2 className="mt-4 text-lg md:text-xl font-bold">
              {user?.displayName || "User Name"}
            </h2>
            <p className="text-sm text-gray-400 uppercase">Role: {role || "Your Role"}</p>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <FaMapMarkerAlt /> <span>Hamburg, Germany</span>
            </div>

            {/* <div className="flex justify-between mt-4 w-full">
              <div className="flex flex-col items-center">
                <FaUsers className="text-green-500" size={18} />
                <p className="text-lg font-semibold">15k</p>
                <span className="text-xs text-gray-400">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <FaUserFriends className="text-pink-500" size={18} />
                <p className="text-lg font-semibold">241</p>
                <span className="text-xs text-gray-400">Following</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Main Profile Section */}
        <div
          className={`w-full lg:w-2/3 p-4 md:p-6 rounded-xl shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">📌 About Info:</h3>
          <p className="text-sm md:text-base text-gray-500">
            Hello, I'm <strong>{user?.displayName || "[Your Name]"}</strong>, a dedicated{" "}
            <strong>[Your Profession]</strong> based in <strong>[Your Location]</strong>. I have a
            passion for <strong>[Your Hobbies]</strong> and enjoy exploring{" "}
            <strong>[Your Industry]</strong>. Specializing in <strong>[Your Expertise]</strong>, I
            strive to bring innovation into every project I undertake.
          </p>

          <h3 className="text-lg md:text-xl font-semibold mt-4 md:mt-6 mb-3 md:mb-4">📞 Contact Info:</h3>
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center gap-2 md:gap-3">
              <FaEnvelope className="text-blue-500" />
              <p className="text-sm md:text-base">{user?.email || "email@example.com"}</p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <FaGlobe className="text-green-500" />
              <p className="text-sm md:text-base">www.yourwebsite.com</p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <FaMapMarkerAlt className="text-pink-500" />
              <p className="text-sm md:text-base">City, Country</p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <FaPhone className="text-yellow-500" />
              <p className="text-sm md:text-base">+1 (222) 111 - 57840</p>
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-semibold mt-4 md:mt-6 mb-3 md:mb-4">🎯 Skills:</h3>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <span className="badge badge-primary p-2 md:p-3 text-xs md:text-sm">React</span>
            <span className="badge badge-secondary p-2 md:p-3 text-xs md:text-sm">JavaScript</span>
            <span className="badge badge-accent p-2 md:p-3 text-xs md:text-sm">Node.js</span>
            <span className="badge badge-info p-2 md:p-3 text-xs md:text-sm">Tailwind CSS</span>
            <span className="badge badge-warning p-2 md:p-3 text-xs md:text-sm">DaisyUI</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
