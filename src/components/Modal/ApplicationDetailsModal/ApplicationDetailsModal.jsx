import React from 'react';

const ApplicationDetailsModal = () => {
	return (
		<div>
			 <div className="modal modal-open">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Application Details</h3>
					<p className="mt-2">
					<strong>University:</strong> {selectedApplication.universityName}
					</p>
					<p>
					<strong>Degree:</strong> {selectedApplication.degreeCategory}
					</p>
					<p>
					<strong>Scholarship Category:</strong>{" "}
					{selectedApplication.scholarshipCategory}
					</p>
					<p>
					<strong>Application Status:</strong> {selectedApplication.status}
					</p>
					<div className="modal-action">
					<button
						onClick={() => setIsDetailsModalOpen(false)}
						className="btn btn-sm btn-error"
					>
						Close
					</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ApplicationDetailsModal;