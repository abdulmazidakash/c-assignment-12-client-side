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
	const {user} = useAuth();
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: scholarship = {}, isLoading } = useQuery({
		queryKey: ['scholarship', id],
		queryFn: async () => {
		  const { data } = await axiosSecure.get(`/scholarships/${id}`);
		  return data;
		},
	  });

	  console.log(scholarship);

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
		  studyGap: formData.get('studyGap') || null,  //optional
		  universityName: scholarship.universityName,  //read-only
		  scholarshipCategory: scholarship.scholarshipCategory, //read-only
		  subjectCategory: scholarship.subjectCategory,  //read-only

		  //user or student related information
		  student: {
			userName: user?.displayName,
			userEmail: user?.email,
			userId: scholarship._id,
			scholarshipId: scholarship._id,
			appliedDate: new Date().toISOString().split('T')[0],
			status: 'pending',
		  },

		  //my application page information
		  myApplicationInfo: {
			universityCity: scholarship?.universityCity,
			universityCountry: scholarship?.universityCountry,
			applicationFees: scholarship?.applicationFees,
			serviceCharge: scholarship?.serviceCharge,

		  }


		};

		console.table(applicationData);
	
		try {
			//save data in db
		  const response = await axiosSecure.post('/apply-scholarship', applicationData);
		  console.log(response.data);
		  if (response.data.insertedId) {
			Swal.fire('Success', 'You have successfully applied for the scholarship!', 'success');
			
			//todo: navigate my application page
			navigate(`/dashboard/my-application`)

		  }
		} catch (error) {
		  toast.error('Failed to submit the application.');
		}
	  };
	return (
		<div>
		<div>
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <FaCheckCircle className="text-green-600" />
              Application Form
            </h1>
            <p className="text-lg text-gray-600">Fill out the form below to complete your application</p>
          </div>
          <form onSubmit={handleApplicationSubmit} className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg border border-gray-200 space-y-4">

            <input name="phone" type="text" placeholder="Phone Number" className="input input-bordered w-full" required />

            <input name="photo" type="file" className="file-input w-full" required />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="village" type="text" placeholder="Village" className="input input-bordered w-full" required />
              <input name="district" type="text" placeholder="District" className="input input-bordered w-full" required />
              <input name="country" type="text" placeholder="Country" className="input input-bordered w-full" required />
            </div>

            <select defaultValue={''} name="gender" className="select select-bordered w-full" required>
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            
			<select defaultValue={''} name="degree" className="select select-bordered w-full" required>
              
			  <option value=""  disabled>
                Select Degree
              </option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Masters">Masters</option>
            </select>

            <input name="sscResult" type="text" placeholder="SSC Result" className="input input-bordered w-full" required />
            <input name="hscResult" type="text" placeholder="HSC Result" className="input input-bordered w-full" required />

            <select defaultValue={''} name="studyGap" className="select select-bordered w-full">
              <option value=""  disabled>
                Select Study Gap (if any)
              </option>
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="None">None</option>
            </select>

            <input name="universityName" type="text" defaultValue={scholarship.universityName } className="input input-bordered w-full" readOnly />
            <input name="scholarshipCategory" type="text" defaultValue={scholarship.scholarshipCategory} className="input input-bordered w-full" readOnly />
            <input name="subjectCategory" type="text" defaultValue={scholarship.subjectCategory} className="input input-bordered w-full" readOnly />
            <button type="submit" className="btn btn-success w-full">
              Submit Application
            </button>
          </form>
        </div>
		</div>
	);
};

export default ApplyScholarship;