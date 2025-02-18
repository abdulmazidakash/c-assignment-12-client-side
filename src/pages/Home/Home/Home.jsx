import React from 'react';
import Banner from '../Banner/Banner';
import UpcomingScholarships from '../UpcomingScholarships/UpcomingScholarships';
import FAQsAndHelpCenter from '../FAQsAndHelpCenter/FAQsAndHelpCenter';
import Scholarships from '../Scholarships/Scholarships';
import { Helmet } from 'react-helmet-async';
import FeaturedUniversities from '../FeaturedUniversities/FeaturedUniversities';
import Testimonials from '../Testimonials/Testimonials';
import HowItWorks from '../HowItWorks/HowItWorks';
import Newsletter from '../NewsLetter/NewsLetter';
import ContactUs from '../ContactUs/ContactUs';

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
			<FeaturedUniversities/>
			<Testimonials/>
			<HowItWorks/>
			<Newsletter/>
			<ContactUs/>
		</div>
	);
};

export default Home;