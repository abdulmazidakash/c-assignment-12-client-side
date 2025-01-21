import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import ScholarshipCard from '../../../components/ScholarshipCard';
import { Link } from 'react-router-dom';

const Scholarships = () => {

	const axiosPublic = useAxiosPublic();

	const { data: scholarships, isLoading} = useQuery({
		queryKey: ['top-scholarships'],
		queryFn: async() =>{
			//fetch
			const {data} = await axiosPublic.get(`/top-scholarships`);
			return data;

		},
	});

	console.log(scholarships);

	if(isLoading) return <LoadingSpinner/>

	return (
		<div className='container mx-auto '>

			 {/* Section Header */}
			 <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          		🚀 Top Scholarships
        	</h2>

			 {scholarships && scholarships.length > 0 ? 
			<div>
				<div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{scholarships.map(scholarship => <ScholarshipCard key={scholarship._id} scholarship={scholarship} />)}
				
			</div>
			<div className='text-center'>
				<Link to={'/allScholarship'} className='bg-gradient-to-tr from-sky-900 to-slate-800 text-white font-semibold btn my-4' >View All Scholarships</Link>
			</div>
			</div>
			
			: 
	 		 (<p>No data available</p>)}
		</div>
	);
};

export default Scholarships;

{/* <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'> */}