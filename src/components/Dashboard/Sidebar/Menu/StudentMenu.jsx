import React, { useState } from 'react';
import { FaUser, FaFileAlt, FaStar } from 'react-icons/fa';
import MenuItem from './MenuItem';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import BecomeSellerModal from '../../../Modal/BecomeSellerModal';
import { GrUserAdmin } from 'react-icons/gr'

function StudentMenu() {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);


  const closeModal = () => {
    setIsOpen(false)
  };

  const requestHandler = async () =>{
      
    try{
      //send  a request to server
      const { data } = await axiosSecure.patch(`/users/${user?.email}`)

      console.log(data);
      toast.success('Successfully applied to become a seller ✅')
    }
    catch(err){
      console.log(err.response.data);
      toast.error(err.response.data + '🅾')
    }
    finally{
      closeModal();
    }
  }

  
  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <div className="">

        <MenuItem label="My Profile" address="/dashboard/profile" icon={FaUser} />

        <button
        onClick={() => setIsOpen(true)}
        className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
        >
        <GrUserAdmin className='w-5 h-5' />

        <span className='font-medium'>Become A Moderator</span>
        </button>

        <BecomeSellerModal requestHandler={requestHandler} closeModal={closeModal} isOpen={isOpen} />

        <MenuItem label="My Applications" address="/dashboard/my-application" icon={FaFileAlt} />
        <MenuItem label="My Reviews" address="/my-reviews" icon={FaStar} />
      </div>
    </div>
  );
}

export default StudentMenu;
