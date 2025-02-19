import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext); // Use Theme Context

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success(`Sign-out successful ${user?.displayName}`);
      })
      .catch(() => {
        toast.error(`Sign-out not successful ${user?.displayName}`);
      });
  };

  return (
    <div className="navbar fixed top-0 left-0 right-0 z-50 bg-opacity-30 bg-gradient-to-tr from-sky-900 to-slate-800 backdrop-blur-md text-white shadow-lg dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-outline text-white normal-case text-xl font-bold">
          
            <FaGoogleScholar /> ScholarshipHub
          </Link>
        </div>

        {/* Navbar Links */}
        <div className="hidden lg:block justify-center items-center mr-4 font-semibold">
          <ul className="flex gap-4 p-2 justify-center items-center">
            <li>
              <NavLink to={"/"} className="hover:text-sky-400 rounded-lg p-2">Home</NavLink>
            </li>
            <li>
              <NavLink to={"/allScholarship"} className="hover:text-sky-400 rounded-lg p-2">All Scholarship</NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to={"/terms-and-conditions"} className="hover:text-sky-400 rounded-lg p-2">
                    Terms & Conditions
                  </NavLink>
                </li>
               
              </>
            )}
             <li>
                  <NavLink to={"/about"} className="hover:text-sky-400 rounded-lg p-2">About Us</NavLink>
                </li>
            {user && <li>
              <NavLink to={"/dashboard"} className="hover:text-sky-400 rounded-lg p-2">Dashboard</NavLink>
            </li>}
            {user ? (
              <li>
                <button onClick={handleSignOut} className="hover:text-red-400 rounded-lg p-2">Logout</button>
              </li>
            ) : (
              <li>
                <NavLink to={"/login"} className="hover:text-green-400 rounded-lg p-2">Login</NavLink>
              </li>
            )}

            {/* Dark Mode Toggle */}
            <button
              className="p-2 rounded-full hover:text-yellow-400 transition"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </ul>
        </div>

        {/* User Avatar Dropdown */}
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border-2 border-white">
                {user ? (
                  <img
                    referrerPolicy={"no-referrer"}
                    alt={`${user?.displayName}`}
                    title={`${user?.displayName}`}
                    src={user?.photoURL}
                  />
                ) : (
                  <FaUserCircle className="text-4xl" />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-opacity-90 bg-gradient-to-tr from-sky-900 to-slate-900 text-white font-semibold rounded-box mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <Link to={"/"} className="hover:text-sky-400 rounded-lg">Home</Link>
              </li>
              <li>
                <Link to={"/allScholarship"} className="hover:text-sky-400 rounded-lg">All Scholarship</Link>
              </li>
              {user && (
                <>
                  <li>
                    <Link to={"/terms-and-conditions"} className="hover:text-sky-400 rounded-lg">
                      Terms & Conditions
                    </Link>
                  </li>
                  
                </>
              )}
              <li>
                    <Link to={"/about"} className="hover:text-sky-400 rounded-lg">About Us</Link>
                  </li>
              {user && <li>
                <Link to={"/dashboard"} className="hover:text-sky-400 rounded-lg">Dashboard</Link>
              </li>}

              {user ? (
                <li>
                  <button onClick={handleSignOut} className="hover:text-red-400 rounded-lg">Logout</button>
                </li>
              ) : (
                <li>
                  <Link to={"/login"} className="hover:text-green-400 rounded-lg">Login</Link>
                </li>
              )}

              {/* Dark Mode Toggle */}
              <button
                className="mt-2 p-2 rounded-full hover:text-yellow-400 transition"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
