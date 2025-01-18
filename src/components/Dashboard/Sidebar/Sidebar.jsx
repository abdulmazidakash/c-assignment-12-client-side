import { useState } from 'react';
import { GrLogout } from 'react-icons/gr';
import { FcSettings } from 'react-icons/fc';
import { AiOutlineBars } from 'react-icons/ai';
import { BsGraphUp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import StudentMenu from './Menu/StudentMenu';
import ModeratorMenu from './Menu/ModeratorMenu';
import AdminMenu from './Menu/AdminMenu';
import MenuItem from './Menu/MenuItem';
import toast from 'react-hot-toast';
import useRole from '../../../hooks/useRole';

const Sidebar = () => {
  const { user, logOut} = useAuth();
  const [isActive, setActive] = useState(false);
  const [role] = useRole();

  const handleToggle = () => {
    setActive(!isActive);
  };

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
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white flex justify-between md:hidden shadow-lg">
        <div className="p-4 font-bold">
          <Link to='/'>
            <button className='font-bold text-2xl btn btn-outline'>ScholarShipHub</button>
          </Link>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 bg-blue-600 text-white  focus:outline-none focus:bg-blue-700"
        >
          <AiOutlineBars className='h-6 w-6' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-purple-500 to-blue-500 text-white w-72 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        } md:translate-x-0 transition duration-300 ease-in-out shadow-2xl`}
      >
        <div>
          <div className="md:flex items-center justify-center mb-6">
		  <Link to='/'>
            <button className='font-bold text-2xl btn btn-outline'>ScholarShipHub</button>
          </Link>
          </div>

          <nav className="flex flex-col space-y-4">
           {role === 'student' &&  <StudentMenu />}
           {role === 'moderator' &&  <ModeratorMenu />}
           {role === 'admin' &&  <AdminMenu />}

           {/* <StudentMenu />
            <ModeratorMenu />
            <AdminMenu /> */}
          </nav>
        </div>

        <div>
          <hr className="border-blue-300" />
          {/* <MenuItem
            icon={FcSettings}
            label='Profile'
            address='/dashboard/profile'
          /> */}
          <button
            onClick={handleSignOUt} 
            className="flex w-full items-center px-4 py-2 mt-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300"
          >
            <GrLogout className='w-5 h-5' />
            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
