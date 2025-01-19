{/* <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>

              {/* Date Picker Input Field */}
            //   <DatePicker
                // className='border p-2 rounded-md'
                // selected={startDate}
                // onChange={date => setStartDate(date)}
            //   />
// </div> */}

            {/* {deadline && (
            <span className='text-sm font-light text-gray-800 '>
              Deadline: {format(new Date(deadline), 'P')}
            </span>
          )} */}

          router.get('/top-scholarships', async (req, res) => {
            try {
              const scholarships = await Scholarship.find()
                .sort({ applicationFees: 1, scholarshipPostDate: -1 }) // Low fees, most recent first
                .limit(10); // Limit results to top 10
          
              res.status(200).json(scholarships);
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: 'Failed to fetch top scholarships', error });
            }
          });
          

  

          <div className="form-control mb-4">
          <label className="label">Upload Image</label>
         <input
         type="file"
         name="image"
         onChange={handleChange}
         className="file-input file-input-bordered"
         />
         {formData.image && (
         <img
           src={typeof formData.image === 'string' ? formData.image : URL.createObjectURL(formData.image)}
           alt="Preview"
           className="mt-2 w-20 h-20 object-cover"
         />)}
         </div>