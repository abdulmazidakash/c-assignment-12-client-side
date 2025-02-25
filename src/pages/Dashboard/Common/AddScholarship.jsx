import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import useAuth from '../../../hooks/useAuth';
import { imageUpload, shortImageName } from '../../../utilities/utilities';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AddScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [uploadImage, setUploadImage] = useState({ image: { name: 'upload button' } });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const scholarshipName = form.scholarshipName.value;
    const universityName = form.universityName.value;
    const universityCountry = form.universityCountry.value;
    const universityCity = form.universityCity.value;
    const universityRank = parseInt(form.universityRank.value);
    const tuitionFees = parseFloat(form.tuitionFees.value);
    const applicationFees = parseFloat(form.applicationFees.value);
    const serviceCharge = parseFloat(form.serviceCharge.value);
    const applicationDeadline = form.applicationDeadline.value;
    const postDate = form.postDate.value;
    const subjectCategory = form.subjectCategory.value;
    const scholarshipCategory = form.scholarshipCategory.value;
    const degreeCategory = form.degreeCategory.value;

    const stipend = parseFloat(form.stipend.value);
    const description = form.description.value;

    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);
    const postedUserEmail = user?.email;

    const moderator = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    const scholarshipData = {
      scholarshipName,
      universityName,
      image: imageUrl,
      universityCountry,
      universityCity,
      universityRank,
      subjectCategory,
      scholarshipCategory,
      degreeCategory,
      tuitionFees,
      applicationFees,
      serviceCharge,
      applicationDeadline,
      postDate,
      postedUserEmail,
      moderator,
      description,
      stipend,
    };

    console.table(scholarshipData);

    if (
      !scholarshipName ||
      !universityName ||
      !universityCountry ||
      !universityCity ||
      !universityRank ||
      !applicationFees ||
      !serviceCharge ||
      !applicationDeadline ||
      !postDate ||
      !postedUserEmail
    ) {
      return toast.error('Please fill all required fields!');
    }

    try {
      const response = await axiosSecure.post(`/scholarships`, scholarshipData);
      console.log(response.data);

      if (response.status === 200 || response.status === 201) {
        toast.success('Scholarship added successfully!');
        form.reset();
        navigate(`/dashboard/manage-scholarship`);
      } else {
        toast.error('Failed to add scholarship!');
      }
    } catch (error) {
      console.error('Error adding scholarship:', error);
      toast.error('Error adding scholarship!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Scholarship | ScholarshipHub</title>
      </Helmet>
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 my-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <MdOutlineAddCircleOutline className="text-blue-600 dark:text-blue-400 text-4xl mr-2" /> Add Scholarship
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Scholarship Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Scholarship Name *</label>
            <input
              type="text"
              name="scholarshipName"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter scholarship name"
            />
          </div>

          {/* University Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">University Name *</label>
              <input
                type="text"
                name="universityName"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-300"
                placeholder="Enter university name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">University Country *</label>
              <input
                type="text"
                name="universityCountry"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-300"
                placeholder="Enter country name"
              />
            </div>
          </div>

          {/* City and Rank */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">University City *</label>
              <input
                type="text"
                name="universityCity"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-300"
                placeholder="Enter city name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">University World Rank *</label>
              <input
                type="number"
                name="universityRank"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-300"
                placeholder="Enter rank"
              />
            </div>
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject Category</label>
              <select name="subjectCategory" className="select select-bordered w-full dark:bg-gray-700 dark:text-gray-300">
                <option>Agriculture</option>
                <option>Engineering</option>
                <option>Doctor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Scholarship Category</label>
              <select name="scholarshipCategory" className="select select-bordered w-full dark:bg-gray-700 dark:text-gray-300">
                <option>Full fund</option>
                <option>Partial</option>
                <option>Self-fund</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Degree</label>
              <select name="degreeCategory" className="select select-bordered w-full dark:bg-gray-700 dark:text-gray-300">
                <option>Diploma</option>
                <option>Bachelor</option>
                <option>Masters</option>
              </select>
            </div>
          </div>

          {/* Tuition Fees */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tuition Fees (Optional)</label>
              <input
                type="number"
                name="tuitionFees"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-300"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Application Fees *</label>
              <input
                type="number"
                name="applicationFees"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-300"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Charge *</label>
              <input
                type="number"
                name="serviceCharge"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-300"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* Stipend Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stipend (Optional)</label>
            <input
              type="number"
              name="stipend"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter stipend amount"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description *</label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter scholarship description"
              rows="4"
            ></textarea>
          </div>

          {/* Image */}
          <div className="p-4 w-full m-auto rounded-lg flex-grow">
            <div className="file_upload px-5 py-3 relative border-4 border-gray-300 rounded-lg dark:border-gray-600">
              <div className="flex flex-col w-max mx-auto text-center">
                <label>
                  <input
                    onChange={(e) =>
                      setUploadImage({
                        image: e.target.files[0],
                        url: URL.createObjectURL(e.target.files[0]),
                      })
                    }
                    className="text-sm cursor-pointer w-36 hidden"
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    hidden
                  />
                  <div className="bg-[#13405E] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3">
                    {shortImageName(uploadImage?.image)}
                  </div>
                </label>
              </div>
            </div>
          </div>
          {uploadImage && uploadImage?.image?.size && (
            <div className="flex gap-5 items-center">
              <img className="w-20" src={uploadImage?.url} alt="" />
              <p>Image Size: {uploadImage?.image?.size} Bytes</p>
            </div>
          )}

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Application Deadline *</label>
              <input
                type="date"
                name="applicationDeadline"
                defaultValue={new Date()}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Scholarship Post Date *</label>
              <input
                type="date"
                name="postDate"
                defaultValue={new Date()}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          {/* User Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Posted User Email *</label>
            <input
              type="email"
              name="postedUserEmail"
              value={user?.email}
              readOnly
              className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter email"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="btn w-full flex items-center justify-center bg-[#13405E] text-white"
            >
              <MdOutlineAddCircleOutline className="mr-2" />
              {loading ? 'Adding Scholarship...' : 'Add Scholarship'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddScholarship;
