import React from 'react';
import { FaCheckCircle, FaEdit } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const EditMyApplication = () => {

	const { user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data: editMyApplication = {}, isLoading } = useQuery({
    queryKey: ['editMyApplication', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/edit-my-application/${id}`);
      return data;
    },
  });

  console.log(editMyApplication);

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

	console.log(applicationData);

    try {
      const response = await axiosSecure.patch(`/edit-my-application/${editMyApplication._id}`, applicationData);
      if (response.data.insertedId) {
        Swal.fire('Success', 'You have successfully updated for the scholarship!', 'success');
        navigate(`/dashboard/my-application`);
      }
    } catch (error) {
      toast.error('Failed to update the application.');
    }
  };

  return (
    <div>
      <div>
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <FaEdit className="text-green-600" />
            Edit My Application Form
          </h1>
          <p className="text-lg text-gray-600">Fill out the form below to complete your application</p>
        </div>
        <form 
		onSubmit={handleApplicationEdit}
		className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg border border-gray-200 space-y-4">
          {/* Phone */}
          <label className="block">
            <span className="text-gray-700">Phone Number</span>
            <input
              defaultValue={editMyApplication.phone}
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
          </label>

          {/* Photo */}
          <label className="block">
            <span className="text-gray-700">Upload Photo</span>
            <input
              defaultValue={editMyApplication.photo}
              name="photo"
              type="file"
              className="file-input w-full"
            />
          </label>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-gray-700">Village</span>
              <input
                defaultValue={editMyApplication?.studentAddress?.village}
                name="village"
                type="text"
                placeholder="Village"
                className="input input-bordered w-full"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">District</span>
              <input
                defaultValue={editMyApplication?.studentAddress?.district}
                name="district"
                type="text"
                placeholder="District"
                className="input input-bordered w-full"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Country</span>
              <input
                defaultValue={editMyApplication?.studentAddress?.country}
                name="country"
                type="text"
                placeholder="Country"
                className="input input-bordered w-full"
                required
              />
            </label>
          </div>

          {/* Gender */}
          {editMyApplication.gender && (
            <label className="block">
              <span className="text-gray-700">Gender</span>
              <select
                defaultValue={editMyApplication.gender}
                name="gender"
                className="select select-bordered w-full"
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
              <span className="text-gray-700">Degree</span>
              <select
                defaultValue={editMyApplication.degree}
                name="degree"
                className="select select-bordered w-full"
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
            <span className="text-gray-700">SSC Result</span>
            <input
              defaultValue={editMyApplication.sscResult}
              name="sscResult"
              type="text"
              placeholder="SSC Result"
              className="input input-bordered w-full"
              required
            />
          </label>

          {/* HSC Result */}
          <label className="block">
            <span className="text-gray-700">HSC Result</span>
            <input
              defaultValue={editMyApplication.hscResult}
              name="hscResult"
              type="text"
              placeholder="HSC Result"
              className="input input-bordered w-full"
              required
            />
          </label>

          {/* Study Gap */}
          {editMyApplication.studyGap && (
            <label className="block">
              <span className="text-gray-700">Study Gap (if any)</span>
              <select
                defaultValue={editMyApplication.studyGap}
                name="studyGap"
                className="select select-bordered w-full"
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
            <span className="text-gray-700">University Name</span>
            <input
              defaultValue={editMyApplication.universityName}
              name="universityName"
              type="text"
              className="input input-bordered w-full"
              readOnly
            />
          </label>

          {/* Scholarship Category */}
          <label className="block">
            <span className="text-gray-700">Scholarship Category</span>
            <input
              defaultValue={editMyApplication.scholarshipCategory}
              name="scholarshipCategory"
              type="text"
              className="input input-bordered w-full"
              readOnly
            />
          </label>

          {/* Subject Category */}
          <label className="block">
            <span className="text-gray-700">Subject Category</span>
            <input
              defaultValue={editMyApplication.subjectCategory}
              name="subjectCategory"
              type="text"
              className="input input-bordered w-full"
              readOnly
            />
          </label>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-full">
            <FaEdit /> Update Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMyApplication;
