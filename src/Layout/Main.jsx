import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer/Footer';

const Main = () => {
	return (
		<div>
			<div className='w-full'>
			<Navbar/>
			</div>
			<div className='pt-20'>
			<Outlet/>
			</div>
			<Footer/>
		</div>
	);
};

export default Main;