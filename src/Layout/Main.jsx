import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer/Footer';
import Banner from '../pages/Home/Banner/Banner';

const Main = () => {
	return (
		<div>
			<div className='w-full'>
			<Navbar/>
			</div>
			<div className='container mx-auto pt-20'>
			<Outlet/>
			</div>
			<div className=''>
			<Footer/>
			</div>
		</div>
	);
};

export default Main;