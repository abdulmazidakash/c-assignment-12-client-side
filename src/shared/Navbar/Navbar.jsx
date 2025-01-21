import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { FaUserCircle, FaUserGraduate } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";


const Navbar = () => {
	const {user, logOut} = useContext(AuthContext);

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
   <div className="navbar fixed top-0 left-0 right-0 z-50 bg-opacity-30 bg-gradient-to-tr from-sky-900 to-slate-800 backdrop-blur-md text-white shadow-lg ">
     <div className="container mx-auto">
      <div className="flex-1">
        <Link to={'/'} className="btn btn-outline text-white normal-case text-xl font-bold"><FaGoogleScholar />
        ScholarShipHub</Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full border-2 border-bg-white">
              {user ? <img
              referrerPolicy={"no-referrer"}
                alt="User Avatar"
                src={user?.photoURL}
              /> : <FaUserCircle className="text-4xl" />}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-opacity-90 bg-gradient-to-tr from-sky-900 to-slate-900 text-white font-semibold rounded-box mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <Link to={'/'} className="hover:bg-sky-700 rounded-lg">Home</Link>
            </li>
            <li>
              <Link to={'/allScholarship'} className="hover:bg-sky-700 rounded-lg">
                All Scholarship
              </Link>
            </li>
            <li>
              <Link to={'/dashboard'} className="hover:bg-sky-700 rounded-lg">Dashboard</Link>
            </li>
			
			{user ? <><li>
              <button onClick={handleSignOUt}  className="hover:bg-red-600 rounded-lg">Logout</button>
            </li></> : <><li>
              <Link to={'/login'} className="hover:bg-green-600 rounded-lg">Login</Link>
            </li></>}
            
            
          </ul>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Navbar;
