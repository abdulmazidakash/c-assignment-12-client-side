import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { BiImageAdd } from 'react-icons/bi';
import { MdOutlineAddCircleOutline } from 'react-icons/md';

const AddScholarship = () => {
  const [scholarship, setScholarship] = useState({
    scholarshipName: '',
    universityName: '',
    universityCountry: '',
    universityCity: '',
    universityRank: '',
    subjectCategory: 'Agriculture',
    scholarshipCategory: 'Full fund',
    degree: 'Diploma',
    tuitionFees: '',
    applicationFees: '',
    serviceCharge: '',
    applicationDeadline: '',
    postDate: '',
    postedUserEmail: '',
    universityImage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScholarship((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
        formData
      );
      if (response.data.success) {
        setScholarship((prev) => ({
          ...prev,
          universityImage: response.data.data.display_url,
        }));
        toast.success('Image uploaded successfully!');
      } else {
        toast.error('Image upload failed!');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !scholarship.scholarshipName ||
      !scholarship.universityName ||
      !scholarship.universityCountry ||
      !scholarship.universityCity ||
      !scholarship.universityRank ||
      !scholarship.applicationFees ||
      !scholarship.serviceCharge ||
      !scholarship.applicationDeadline ||
      !scholarship.postDate ||
      !scholarship.postedUserEmail
    ) {
      return toast.error('Please fill all required fields!');
    }

    try {
      const response = await axios.post('https://your-database-api/scholarships', scholarship);
      if (response.status === 200 || response.status === 201) {
        toast.success('Scholarship added successfully!');
        setScholarship({
          scholarshipName: '',
          universityName: '',
          universityCountry: '',
          universityCity: '',
          universityRank: '',
          subjectCategory: 'Agriculture',
          scholarshipCategory: 'Full fund',
          degree: 'Diploma',
          tuitionFees: '',
          applicationFees: '',
          serviceCharge: '',
          applicationDeadline: '',
          postDate: '',
          postedUserEmail: '',
          universityImage: '',
        });
      } else {
        toast.error('Failed to add scholarship!');
      }
    } catch (error) {
      console.error('Error adding scholarship:', error);
      toast.error('Error adding scholarship!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 my-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600 flex items-center justify-center">
        <MdOutlineAddCircleOutline className="text-blue-600 text-4xl mr-2" /> Add Scholarship
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Scholarship Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Name *</label>
          <input
            type="text"
            name="scholarshipName"
            value={scholarship.scholarshipName}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter scholarship name"
          />
        </div>

        {/* University Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">University Name *</label>
            <input
              type="text"
              name="universityName"
              value={scholarship.universityName}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter university name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">University Country *</label>
            <input
              type="text"
              name="universityCountry"
              value={scholarship.universityCountry}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter country name"
            />
          </div>
        </div>

        {/* City and Rank */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">University City *</label>
            <input
              type="text"
              name="universityCity"
              value={scholarship.universityCity}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter city name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">University World Rank *</label>
            <input
              type="number"
              name="universityRank"
              value={scholarship.universityRank}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter rank"
            />
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject Category</label>
            <select
              name="subjectCategory"
              value={scholarship.subjectCategory}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option>Agriculture</option>
              <option>Engineering</option>
              <option>Doctor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Category</label>
            <select
              name="scholarshipCategory"
              value={scholarship.scholarshipCategory}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option>Full fund</option>
              <option>Partial</option>
              <option>Self-fund</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
            <select
              name="degree"
              value={scholarship.degree}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option>Diploma</option>
              <option>Bachelor</option>
              <option>Masters</option>
            </select>
          </div>
        </div>

        {/* Tuition Fees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tuition Fees (Optional)</label>
            <input
              type="text"
              name="tuitionFees"
              value={scholarship.tuitionFees}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Application Fees *</label>
            <input
              type="text"
              name="applicationFees"
              value={scholarship.applicationFees}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Charge *</label>
            <input
              type="text"
              name="serviceCharge"
              value={scholarship.serviceCharge}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter amount"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">University Logo/Image *</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="file-input file-input-bordered"
            />
            <BiImageAdd className="text-2xl text-gray-500" />
          </div>
          {scholarship.universityImage && (
            <img
              src={scholarship.universityImage}
              alt="Uploaded"
              className="w-20 h-20 mt-2 rounded-lg"
            />
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline *</label>
            <input
              type="date"
              name="applicationDeadline"
              value={scholarship.applicationDeadline}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Post Date *</label>
            <input
              type="date"
              name="postDate"
              value={scholarship.postDate}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* User Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Posted User Email *</label>
          <input
            type="email"
            name="postedUserEmail"
            value={scholarship.postedUserEmail}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter email"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center"
          >
            <MdOutlineAddCircleOutline className="text-xl mr-2" /> Add Scholarship
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
