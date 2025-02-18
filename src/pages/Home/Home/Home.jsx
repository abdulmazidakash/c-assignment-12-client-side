import React from 'react';
import Banner from '../Banner/Banner';
import UpcomingScholarships from '../UpcomingScholarships/UpcomingScholarships';
import FAQsAndHelpCenter from '../FAQsAndHelpCenter/FAQsAndHelpCenter';
import Scholarships from '../Scholarships/Scholarships';
import { Helmet } from 'react-helmet-async';
import Testimonials from '../Testimonials/Testimonials';
import Newsletter from '../NewsLetter/NewsLetter';
import ContactUs from '../ContactUs/ContactUs';
import MeetOurTeam from '../MeetOurTeam/MeetOurTeam';

const Home = () => {
	return (
		<div>
			<Helmet>
				<title>Home | ScholarshipHub</title>
			</Helmet>
			<Banner/>
			<Scholarships/>
			<UpcomingScholarships/>
			<MeetOurTeam/>
			<Testimonials/>
			<FAQsAndHelpCenter/>
			<Newsletter/>
			<ContactUs/>
		</div>
	);
};

export default Home;