import React from "react";

const Navbar = () => {
  return (
    <div className="navbar fixed max-w-screen-xl mx-auto z-50 bg-opacity-30 bg-gradient-to-tr from-sky-800 to-slate-800 backdrop-blur-md text-white shadow-lg">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">ScholarShipHub</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-opacity-90 bg-gradient-to-tr from-sky-900 to-slate-900 text-white font-semibold rounded-box mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <button className="hover:bg-sky-700 rounded-lg">Home</button>
            </li>
            <li>
              <button className="hover:bg-sky-700 rounded-lg">
                All Scholarship
              </button>
            </li>
            <li>
              <button className="hover:bg-sky-700 rounded-lg">Dashboard</button>
            </li>
            <li>
              <button className="hover:bg-red-600 rounded-lg">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
