import React from "react";

const UpdateScholarshipModal = ({
  selectedScholarship,
  setIsModalOpen,
  handleApplicationEdit,
}) => {
  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

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
    };

	console.log(updatedData);

    handleApplicationEdit(updatedData); // Pass data to parent for update
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-2xl font-bold mb-4">Edit Scholarship</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Scholarship Name */}
          <div>
            <label className="block font-medium mb-1">Scholarship Name</label>
            <input
              type="text"
              name="scholarshipName"
              defaultValue={selectedScholarship.scholarshipName}
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Subject Category */}
          <div>
            <label className="block font-medium mb-1">Subject Category</label>
            <input
              type="text"
              name="subjectCategory"
              defaultValue={selectedScholarship.subjectCategory}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Scholarship Category */}
          <div>
            <label className="block font-medium mb-1">Scholarship Category</label>
            <input
              type="text"
              name="scholarshipCategory"
              defaultValue={selectedScholarship.scholarshipCategory}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Degree Category */}
          <div>
            <label className="block font-medium mb-1">Degree Category</label>
            <input
              type="text"
              name="degreeCategory"
              defaultValue={selectedScholarship.degreeCategory}
              className="input input-bordered w-full"
              required
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
