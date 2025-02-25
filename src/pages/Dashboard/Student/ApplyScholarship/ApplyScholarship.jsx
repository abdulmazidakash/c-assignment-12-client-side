import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';

const ApplyScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: scholarship = {}, isLoading } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/scholarships/${id}`);
      return data;
    },
  });

  const handleApplicationSubmit = async (e) => {
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
      universityName: scholarship.universityName,
      scholarshipCategory: scholarship.scholarshipCategory,
      subjectCategory: scholarship.subjectCategory,
      status: 'pending',

      student: {
        userName: user?.displayName,
        userEmail: user?.email,
        userId: scholarship._id,
        scholarshipId: scholarship._id,
        appliedDate: new Date().toISOString().split('T')[0],
      },

      myApplicationInfo: {
        universityCity: scholarship?.universityCity,
        universityCountry: scholarship?.universityCountry,
        applicationFees: scholarship?.applicationFees,
        serviceCharge: scholarship?.serviceCharge,
      },
    };

    try {
      const response = await axiosSecure.post('/apply-scholarship', applicationData);
      if (response.data.insertedId) {
        Swal.fire('Success', 'You have successfully applied for the scholarship!', 'success');
        navigate(`/dashboard/my-application`);
      }
    } catch (error) {
      toast.error('Failed to submit the application.');
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
          <FaCheckCircle className="text-green-600" />
          Application Form
        </h1>
        <p className="text-lg text-gray-600">Fill out the form below to complete your application</p>
      </div>
      <form
        onSubmit={handleApplicationSubmit}
        className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg border border-gray-200 space-y-4"
      >
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Phone Number"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Photo
          </label>
          <input id="photo" name="photo" type="file" className="file-input w-full" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="village" className="block text-sm font-medium text-gray-700">
              Village
            </label>
            <input
              id="village"
              name="village"
              type="text"
              placeholder="Village"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">
              District
            </label>
            <input
              id="district"
              name="district"
              type="text"
              placeholder="District"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              placeholder="Country"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select id="gender" name="gender" className="select select-bordered w-full" required>
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
            Degree
          </label>
          <select id="degree" name="degree" className="select select-bordered w-full" required>
            <option value="" disabled>
              Select Degree
            </option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        <div>
          <label htmlFor="sscResult" className="block text-sm font-medium text-gray-700">
            SSC Result
          </label>
          <input
            id="sscResult"
            name="sscResult"
            type="text"
            placeholder="SSC Result"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="hscResult" className="block text-sm font-medium text-gray-700">
            HSC Result
          </label>
          <input
            id="hscResult"
            name="hscResult"
            type="text"
            placeholder="HSC Result"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="studyGap" className="block text-sm font-medium text-gray-700">
            Study Gap (if any)
          </label>
          <select id="studyGap" name="studyGap" className="select select-bordered w-full">
            <option value="" disabled>
              Select Study Gap
            </option>
            <option value="1 Year">1 Year</option>
            <option value="2 Years">2 Years</option>
            <option value="3 Years">3 Years</option>
            <option value="None">None</option>
          </select>
        </div>

        <div>
          <label htmlFor="universityName" className="block text-sm font-medium text-gray-700">
            University Name
          </label>
          <input
            id="universityName"
            name="universityName"
            type="text"
            defaultValue={scholarship.universityName}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <div>
          <label htmlFor="scholarshipCategory" className="block text-sm font-medium text-gray-700">
            Scholarship Category
          </label>
          <input
            id="scholarshipCategory"
            name="scholarshipCategory"
            type="text"
            defaultValue={scholarship.scholarshipCategory}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <div>
          <label htmlFor="subjectCategory" className="block text-sm font-medium text-gray-700">
            Subject Category
          </label>
          <input
            id="subjectCategory"
            name="subjectCategory"
            type="text"
            defaultValue={scholarship.subjectCategory}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <button type="submit" className="btn btn-success w-full">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyScholarship;
