import React from 'react';
import Banner from '../Banner/Banner';
import UpcomingScholarships from '../UpcomingScholarships/UpcomingScholarships';
import FAQsAndHelpCenter from '../FAQsAndHelpCenter/FAQsAndHelpCenter';
import Scholarships from '../Scholarships/Scholarships';

const Home = () => {
	return (
		<div>
			<Banner/>
			<Scholarships/>
			<UpcomingScholarships/>
			<FAQsAndHelpCenter/>
		</div>
	);
};

export default Home;