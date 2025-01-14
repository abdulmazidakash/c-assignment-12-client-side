

const Navbar = () => {


  return (
    <div  className="navbar top-0 z-50 bg-opacity-30  bg-gradient-to-tr from-sky-800  to-slate-800  backdrop-blur-0 text-white shadow-lg mb-8">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">ScholarShipHub</a>
  </div>
  <div className="flex-none gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full border-2 border-bg-white">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-opacity-30  bg-gradient-to-tr from-sky-800  to-slate-800  backdrop-blur-0 text-white font-semibold rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><button>Home</button></li>
        <li><button>All Scholarship</button></li>
        <li><button>Dashboard</button></li>
        <li><button>Logout</button></li>
      </ul>
    </div>
  </div>
</div>
  );
};

export default Navbar;
