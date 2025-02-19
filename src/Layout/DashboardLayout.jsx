// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/Dashboard/Sidebar/Sidebar';

// const DashboardLayout = () => {
//   return (
//     <div className="relative min-h-screen md:flex bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
//       {/* Left Side: Sidebar Component */}
//       <Sidebar />
      
//       {/* Right Side: Dashboard Dynamic Content */}
//       <div className="flex-1 md:ml-64">
//         <div className="p-5">
//           {/* Outlet for dynamic contents */}
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import { Link, Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import { FaMoon, FaSun, FaSearch, FaUserCircle, FaBell, FaCog } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { RiLogoutCircleFill  } from "react-icons/ri";


const DashboardLayout = () => {
    const { darkMode, setDarkMode } = useContext(ThemeContext); // Use Theme Context
    const {user, logOut} = useContext(AuthContext);
    console.log(user);

    const handleSignOUt = ()=>{
      logOut()
        .then(()=>{
        toast.success(`signOUt successful ${user?.displayName}`)
        })
        .catch(()=>{
        toast.error(`not successful signOUt ${user?.displayName}`)
        })
      }

  return (
    <div className={`relative min-h-screen md:flex transition-colors duration-300 ${darkMode ? 'dark:bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex-1 md:ml-64">
        {/* Navbar */}
        <nav className="bg-white dark:bg-gray-800 shadow-md px-6 py-3 flex justify-end items-center">
          {/* Left Section: Logo & Toggle Button */}
          {/* <div className="flex items-center space-x-4">
            <button className="text-gray-700 dark:text-white text-2xl">
              <img src="https://via.placeholder.com/120x40" alt="Logo" className="h-10" />
            </button>
          </div> */}

          {/* Middle Section: Search Bar */}
          {/* <div className="hidden md:flex pl-4 items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
            <FaSearch className="text-gray-500 dark:text-gray-300" />
            <input 
              type="text" 
              placeholder="Search something..." 
              className="bg-transparent focus:outline-none px-2 text-gray-900 dark:text-white"
            />
          </div> */}

          {/* Right Section: Icons & Profile */}
          <div className="flex items-center space-x-6">
            {/* <FaBell className="text-gray-500 dark:text-gray-300 text-xl cursor-pointer" /> */}
            {/* <FaCog className="text-gray-500 dark:text-gray-300 text-xl cursor-pointer" /> */}
           <button
            onClick={handleSignOUt} 
            className="flex  items-center   text-white rounded-lg transition duration-300"
          >
            <RiLogoutCircleFill  className='w-6 h-6 text-gray-500 dark:text-gray-300 text-xl cursor-pointer' />
          </button>
            {/* <button onClick={toggleDarkMode}>
              {darkMode ? <FaSun className="text-yellow-400 text-xl" /> : <FaMoon className="text-gray-600 text-xl" />}
            </button> */}
            {/* Dark Mode Toggle */}
            <button
              className="p-2 rounded-full hover:text-yellow-400 transition"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
                      
            
            <Link to={'/dashboard/profile'}>
            <div className="flex items-center space-x-2">
              {user ? <img className='w-6 rounded-full border-white' src={user?.photoURL} referrerPolicy='no-referrer' /> : <FaUserCircle className="text-gray-500 dark:text-gray-300 text-2xl" />}
              <span className="text-sm font-medium">{user?.displayName}</span>
            </div>
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

