import React from 'react';
import Banner from '../Banner/Banner';
import UpcomingScholarships from '../UpcomingScholarships/UpcomingScholarships';
import FAQsAndHelpCenter from '../FAQsAndHelpCenter/FAQsAndHelpCenter';
import Scholarships from '../Scholarships/Scholarships';
import { Helmet } from 'react-helmet-async';

const Home = () => {
	return (
		<div>
			<Helmet>
				<title>Home | ScholarshipHub</title>
			</Helmet>
			<Banner/>
			<Scholarships/>
			<UpcomingScholarships/>
			<FAQsAndHelpCenter/>
		</div>
	);
};

export default Home;