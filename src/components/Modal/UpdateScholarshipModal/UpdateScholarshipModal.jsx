import React from "react";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../utilities/utilities";

const UpdateScholarshipModal = ({
  selectedScholarship,
  setIsModalOpen,
  handleScholarshipEdit,
}) => {

  console.log(selectedScholarship);
  const { user } = useAuth();

  // Form submit handler

const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const imageFile = form.image.files[0];

  // Upload the image if an image file is selected
  let uploadedImageUrl = null;
  if (imageFile) {
    try {
      uploadedImageUrl = await imageUpload(imageFile); // Upload the image
    } catch (error) {
      console.error("Image upload failed:", error);
      return;
    }
  }

  // Construct updated data
  const updatedData = {
    scholarshipName: form.scholarshipName.value,
    universityName: form.universityName.value,
    universityCountry: form.universityCountry.value,
    universityCity: form.universityCity.value,
    universityRank: parseInt(form.universityRank.value, 10),
    tuitionFees: parseFloat(form.tuitionFees.value),
    applicationFees: parseFloat(form.applicationFees.value),
    serviceCharge: parseFloat(form.serviceCharge.value),
    applicationDeadline: form.applicationDeadline.value,
    postDate: form.postDate.value,
    subjectCategory: form.subjectCategory.value,
    scholarshipCategory: form.scholarshipCategory.value,
    degreeCategory: form.degreeCategory.value,
    image: uploadedImageUrl || selectedScholarship.image, // Use uploaded URL or existing image
    postedUserEmail: form.postedUserEmail.value,
  };

  console.log(updatedData);

  // Call the parent's function to handle the update
  handleScholarshipEdit(updatedData);
};

 

  return (
    <div className="modal modal-open ">
      <div className="modal-box dark:bg-gray-900 dark:text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Scholarship</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          {/* Scholarship Name */}
          <div>
            <label className="block font-medium mb-1">Scholarship Name</label>
            <input
              type="text"
              name="scholarshipName"
              defaultValue={selectedScholarship.scholarshipName}
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* University Name */}
          <div>
            <label className="block font-medium mb-1">University Name</label>
            <input
              type="text"
              name="universityName"
              defaultValue={selectedScholarship.universityName}
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* University Country */}
          <div>
            <label className="block font-medium mb-1">University Country</label>
            <input
              type="text"
              name="universityCountry"
              defaultValue={selectedScholarship.universityCountry}
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* University City */}
          <div>
            <label className="block font-medium mb-1">University City</label>
            <input
              type="text"
              name="universityCity"
              defaultValue={selectedScholarship.universityCity}
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* University Rank */}
          <div>
            <label className="block font-medium mb-1">University Rank</label>
            <input
              type="number"
              name="universityRank"
              defaultValue={selectedScholarship.universityRank}
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Tuition Fees */}
          <div>
            <label className="block font-medium mb-1">Tuition Fees</label>
            <input
              type="number"
              step="0.01"
              name="tuitionFees"
              defaultValue={selectedScholarship.tuitionFees}
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Application Fees */}
          <div>
            <label className="block font-medium mb-1">Application Fees</label>
            <input
              type="number"
              step="0.01"
              name="applicationFees"
              defaultValue={selectedScholarship.applicationFees}
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Service Charge */}
          <div>
            <label className="block font-medium mb-1">Service Charge</label>
            <input
              type="number"
              step="0.01"
              name="serviceCharge"
              defaultValue={selectedScholarship.serviceCharge}
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Application Deadline */}
          <div>
            <label className="block font-medium mb-1">Application Deadline</label>
            <input
              type="date"
              name="applicationDeadline"
              defaultValue={selectedScholarship.applicationDeadline}
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Post Date */}
          <div>
            <label className="block font-medium mb-1">Post Date</label>
            <input
              type="date"
              name="postDate"
              defaultValue={selectedScholarship.postDate}
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

           {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Subject Category</label>
            <select
              name="subjectCategory"
              defaultValue={selectedScholarship.subjectCategory}
          
              className="select select-bordered w-full dark:bg-gray-700 dark:text-white"
            >
              <option>Agriculture</option>
              <option>Engineering</option>
              <option>Doctor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Scholarship Category</label>
            <select
              name="scholarshipCategory"
              defaultValue={selectedScholarship.scholarshipCategory}
              className="select select-bordered w-full dark:bg-gray-700 dark:text-white"
            >
              <option>Full fund</option>
              <option>Partial</option>
              <option>Self-fund</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Degree</label>
            <select
              name="degreeCategory"
              defaultValue={selectedScholarship.degreeCategory}
              className="select select-bordered w-full dark:bg-gray-700 dark:text-white"
            >
              <option>Diploma</option>
              <option>Bachelor</option>
              <option>Masters</option>
            </select>
          </div>
        </div>

          <div className="form-control mb-4">
          <label className="label font-semibold">Upload Image</label>
         <input
         type="file"
         name="image"
         className="file-input file-input-bordered dark:bg-gray-700 dark:text-white"
         />
        
         <img
           src={selectedScholarship.image}
           alt="Preview"
           name='image'
           className="mt-2 w-20 h-20 object-cover"
         />
         </div>

          {/* User Email */}
        <div>
          <label className="block text-sm font-medium dark:text-white mb-2">Posted User Email *</label>
          <input
            type="email"
            name="postedUserEmail"
			defaultValue={user?.email}
			readOnly
            
            className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
            placeholder="Enter email"
          />
        </div>

          {/* Actions */}
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateScholarshipModal;
