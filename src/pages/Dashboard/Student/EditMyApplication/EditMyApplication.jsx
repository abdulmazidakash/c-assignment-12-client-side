import React from 'react';
import { FaCheckCircle, FaEdit } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const EditMyApplication = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data: editMyApplication = {}, isLoading } = useQuery({
    queryKey: ['editMyApplication', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/edit-my-application/${id}`);
      return data;
    },
  });

  const handleApplicationEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const applicationData = {
      phone: formData.get('phone'),
      photo: formData.get('photo').name,
      studentAddress: {
        village: formData.get('village'),
        district: formData.get('district'),
        country: formData.get('country'),
      },
      gender: formData.get('gender'),
      degree: formData.get('degree'),
      sscResult: formData.get('sscResult'),
      hscResult: formData.get('hscResult'),
      studyGap: formData.get('studyGap') || null,
      universityName: editMyApplication.universityName,
      scholarshipCategory: editMyApplication.scholarshipCategory,
      subjectCategory: editMyApplication.subjectCategory,

      student: {
        userName: user?.displayName,
        userEmail: user?.email,
        userId: editMyApplication._id,
        scholarshipId: editMyApplication._id,
        appliedDate: new Date().toISOString().split('T')[0],
      },

      myApplicationInfo: {
        universityCity: editMyApplication?.universityCity,
        universityCountry: editMyApplication?.universityCountry,
        applicationFees: editMyApplication?.applicationFees,
        serviceCharge: editMyApplication?.serviceCharge,
      },
    };

    try {
      const response = await axiosSecure.patch(`/edit-my-application/${editMyApplication._id}`, applicationData);

      if (response.data.success) {
        if (response.data.message === 'No changes were made') {
          toast.error(response.data.message);
        } else {
          Swal.fire('Success', response.data.message, 'success');
          navigate(`/dashboard/my-application`);
        }
      } else {
        toast.error(response.data.message);
        navigate(`/dashboard/my-application`);
      }
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update the application. Please try again later.');
      navigate(`/dashboard/my-application`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4">
      <div>
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-5xl font-bold flex items-center justify-center gap-2">
            <FaEdit className="text-green-600" />
            Edit My Application Form
          </h1>
          <p className="text-lg">Fill out the form below to complete your application</p>
        </div>
        <form onSubmit={handleApplicationEdit} className="max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-md p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
          {/* Phone */}
          <label className="block">
            <span className="text-gray-700 dark:text-gray-300">Phone Number</span>
            <input
              defaultValue={editMyApplication.phone}
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </label>

          {/* Photo */}
          <label className="block">
            <span className="text-gray-700 dark:text-gray-300">Upload Photo</span>
            <input
              defaultValue={editMyApplication.photo}
              name="photo"
              type="file"
              className="file-input w-full dark:bg-gray-700 dark:text-white"
            />
          </label>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">Village</span>
              <input
                defaultValue={editMyApplication?.studentAddress?.village}
                name="village"
                type="text"
                placeholder="Village"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">District</span>
              <input
                defaultValue={editMyApplication?.studentAddress?.district}
                name="district"
                type="text"
                placeholder="District"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">Country</span>
              <input
                defaultValue={editMyApplication?.studentAddress?.country}
                name="country"
                type="text"
                placeholder="Country"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
                required
              />
            </label>
          </div>

          {/* Gender */}
          {editMyApplication.gender && (
            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">Gender</span>
              <select
                defaultValue={editMyApplication.gender}
                name="gender"
                className="select select-bordered w-full dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="default" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
          )}

          {/* Degree */}
          {editMyApplication.degree && (
            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">Degree</span>
              <select
                defaultValue={editMyApplication.degree}
                name="degree"
                className="select select-bordered w-full dark:bg-gray-700 dark:text-white"
                required
              >
                <option disabled>Select Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
            </label>
          )}

          {/* SSC Result */}
          <label className="block">
            <span className="text-gray-700 dark:text-gray-300">SSC Result</span>
            <input
              defaultValue={editMyApplication.sscResult}
              name="sscResult"
              type="text"
              placeholder="SSC Result"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
          </label>

          {/* HSC Result */}
          <label className="block">
            <span className="text-gray-700 dark:text-gray-300">HSC Result</span>
            <input
              defaultValue={editMyApplication.hscResult}
              name="hscResult"
              type="text"
              placeholder="HSC Result"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
          </label>

          {/* Study Gap */}
          {editMyApplication.studyGap && (
            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">Study Gap (if any)</span>
              <select
                defaultValue={editMyApplication.studyGap}
                name="studyGap"
                className="select select-bordered w-full dark:bg-gray-700 dark:text-white"
              >
                <option value="" disabled>
                  Select Study Gap (if any)
                </option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="None">None</option>
              </select>
            </label>
          )}

          {/* University Name */}
          <label className="block">
            <span className="text-gray-700 dark:text-gray-300">University Name</span>
            <input
              defaultValue={editMyApplication.universityName}
              name="universityName"
              type="text"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              readOnly
            />
          </label>

          {/* Scholarship Category */}
          <label className="block">
            <span className="text-gray-700 dark:text-gray-300">Scholarship Category</span>
            <input
              defaultValue={editMyApplication.scholarshipCategory}
              name="scholarshipCategory"
              type="text"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              readOnly
            />
          </label>

          {/* Subject Category */}
          <label className="block">
            <span className="text-gray-700 dark:text-gray-300">Subject Category</span>
            <input
              defaultValue={editMyApplication.subjectCategory}
              name="subjectCategory"
              type="text"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              readOnly
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-500"
          >
            Submit Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMyApplication;
