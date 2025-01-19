import React from 'react';

const FeedbackModal = () => {
	return (
		<div>
			 <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Provide Feedback</h3>
            <textarea
              className="textarea textarea-bordered w-full mt-2"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <div className="modal-action">
              <button
                onClick={handleSubmitFeedback}
                className="btn btn-sm btn-primary"
              >
                Submit
              </button>
              <button
                onClick={() => setIsFeedbackModalOpen(false)}
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

export default FeedbackModal;