import React from 'react';
import Banner from '../Banner/Banner';
import UpcomingScholarships from '../UpcomingScholarships/UpcomingScholarships';
import FAQsAndHelpCenter from '../FAQsAndHelpCenter/FAQsAndHelpCenter';

const Home = () => {
	return (
		<div>
			<Banner/>
			<UpcomingScholarships/>
			<FAQsAndHelpCenter/>
		</div>
	);
};

export default Home;