import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiImageAdd } from 'react-icons/bi';
import { format, parseISO } from 'date-fns';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import DatePicker from 'react-datepicker';
import { imageUpload, shortImageName } from '../../../utilities/utilities';

const AddScholarship = () => {
 
	const axiosPublic = useAxiosPublic();
	const {user} = useAuth();
  // const [startDate, setStartDate] = useState(new Date());
  const [uploadImage, setUploadImage] = useState({image: { name: 'upload button'},});

	// const [scholarship, setScholarship] = useState();
  // const [startDate, setStartDate] = useState(new Date())

	const handleSubmit = async (e) => {
		e.preventDefault();
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
    
		// const applicationDeadline = format(parseISO(form.applicationDeadline.value), 'yyyy-MM-dd');
    // const deadline = startDate
    // const postDate = format(parseISO(form.postDate.value), 'yyyy-MM-dd');
    
		const postedUserEmail = user?.email;
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

		const scholarshipData = {
      scholarshipName, 
      universityName, 
      universityCountry, 
      universityCity, 
      universityRank,
      tuitionFees, 
      applicationFees, 
      serviceCharge, 
      applicationDeadline, 
      postDate, 
      postedUserEmail , 
      imageUrl};

    console.table(scholarshipData);

    
    
    
    // // 3. offered deadline is within sellers deadline validation
    // if (compareAsc(new Date(startDate), new Date(deadline)) === 1)
    //   return toast.error('Offer a date within deadline')

    // 1. Deadline crossed validation
    // if (compareAsc(new Date(), new Date(deadline)) === 1)
    //   return toast.error('Deadline Crossed, Bidding Forbidden!')
    
    // 2. Price within maximum price range validation
    // if (price > max_price)
    //   return toast.error('Offer less or at least equal to maximum price!')
    
    
    // 0. Check bid permissions validation
    // if (user?.email === buyer?.email)
    //   return toast.error('Action not permitted!');




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
		  const response = await axiosPublic.post(`/scholarships`, scholarshipData);
	  
		  if (response.status === 200 || response.status === 201) {
			toast.success('Scholarship added successfully!');
			form.reset();

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
    
              className="input input-bordered w-full"
              placeholder="Enter university name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">University Country *</label>
            <input
              type="text"
              name="universityCountry"
  
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
        
              className="input input-bordered w-full"
              placeholder="Enter city name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">University World Rank *</label>
            <input
              type="number"
              name="universityRank"
      
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
          {/* tuition fees  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tuition Fees (Optional)</label>
            <input
              type="number"
              name="tuitionFees"
             
              className="input input-bordered w-full"
              placeholder="Enter amount"
            />
          </div>
          {/* application fees  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Application Fees *</label>
            <input
              type="number"
              name="applicationFees"
              
              className="input input-bordered w-full"
              placeholder="Enter amount"
            />
          </div>
          {/* service Charge  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Charge *</label>
            <input
              type="number"
              name="serviceCharge"
             
              className="input input-bordered w-full"
              placeholder="Enter amount"
            />
          </div>
        </div>

        {/* Image Upload */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">University Logo/Image *</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
			  name='image'
           
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
        </div> */}

          {/* Image */}
          <div className=' p-4  w-full  m-auto rounded-lg flex-grow'>
              <div className='file_upload px-5 py-3 relative border-4  border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                      onChange={e =>
                        setUploadImage({
                          image: e.target.files[0],
                          url: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-500'>
                      {/* {uploadImage?.image?.name} */}
                      {shortImageName(uploadImage?.image)}
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {uploadImage && uploadImage?.image?.size && (
              <div className='flex gap-5 items-center'>
                <img className='w-20' src={uploadImage?.url} alt='' />
                <p>Image Size: {uploadImage?.image?.size} Bytes</p>
              </div>
            )}

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline *</label>
            {/* Date Picker Input Field */}
            {/* <DatePicker
                className='border p-2 rounded-md'
                selected={startDate}
                onChange={date => setStartDate(date)}
              /> */}

            <input
              type="date"
              name="applicationDeadline"
            
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Post Date *</label>

              {/* Date Picker Input Field */}
              {/* <DatePicker
                className='border p-2 rounded-md'
                selected={startDate}
                onChange={date => setStartDate(date)}
              /> */}


            <input
              type="date"
              name="postDate"
              defaultValue={new Date()}
              // selected={startDate}
              // onChange={date => setStartDate(date)}
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
			value={user?.email}
			readOnly
            
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
