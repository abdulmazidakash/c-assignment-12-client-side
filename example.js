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



         ///

         const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let reviewsCollection;

client.connect((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB", err);
    return;
  }
  const db = client.db("reviewsDB");
  reviewsCollection = db.collection("reviews");
  console.log("Connected to MongoDB");
});

// Routes

// Get reviews by userId
app.get("/reviews/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await reviewsCollection.find({ userId }).toArray();
    res.json(reviews);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a new review
app.post("/reviews", async (req, res) => {
  try {
    const review = req.body;
    const result = await reviewsCollection.insertOne(review);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a review by ID
app.patch("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await reviewsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a review by ID
app.delete("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await reviewsCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


//   const fetchAnalyticsData = async () => {
// 	const token = localStorage.getItem("token"); // Replace with your token logic
// 	const response = await axios.get("http://localhost:5000/admin-stats", {
// 	  headers: {
// 		Authorization: `Bearer ${token}`,
// 	  },
// 	});
// 	return response.data;
//   };


app.get('/admin-stats', async (req, res) => {
  try {
    // Count documents in different collections
    const users = await usersCollection.estimatedDocumentCount();
    const applications = await applyScholarshipCollection.estimatedDocumentCount();
    const scholarships = await scholarshipCollection.estimatedDocumentCount();
    const reviews = await reviewCollection.estimatedDocumentCount();

    // // Aggregate scholarship categories
    // const categoriesAggregation = await scholarshipCollection.aggregate([
    // 	{ $match: { category: { $exists: true, $ne: null } } },
    // 	{ $group: { _id: "$category", count: { $sum: 1 } } },
    // 	{ $project: { _id: 0, category: "$_id", count: 1 } }
    // ]).toArray();

    // Aggregate subject categories (e.g., Agriculture, Engineering, etc.)
    const subjectCategoriesAggregation = await scholarshipCollection.aggregate([
      { $match: { subjectCategory: { $exists: true, $ne: null } } }, // Only consider valid subject categories
      { $group: { _id: "$subjectCategory", count: { $sum: 1 } } },
      { $project: { _id: 0, subjectCategory: "$_id", count: 1 } }
    ]).toArray();

    // Convert the aggregations into objects with category names as keys
    // const categories = categoriesAggregation.reduce((acc, curr) => {
    // 	acc[curr.category] = curr.count;
    // 	return acc;
    // }, {});

    const subjectCategories = subjectCategoriesAggregation.reduce((acc, curr) => {
      acc[curr.subjectCategory] = curr.count;
      return acc;
    }, {});

    res.send({
      users,
      applications,
      scholarships,
      reviews,          // Scholarship categories object
      subjectCategories    // Subject categories object (Agriculture, Engineering, etc.)
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).send({ error: 'Failed to fetch admin stats' });
  }
});