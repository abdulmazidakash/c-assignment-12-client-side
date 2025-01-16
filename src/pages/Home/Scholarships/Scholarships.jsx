import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import ScholarshipCard from '../../../components/ScholarshipCard';

const Scholarships = () => {

	const axiosPublic = useAxiosPublic();

	const { data: scholarships, isLoading} = useQuery({
		queryKey: ['scholarships'],
		queryFn: async() =>{
			//fetch
			const {data} = await axiosPublic.get(`/scholarships`);
			return data;

		},
	});

	console.log(scholarships);

	if(isLoading) return <LoadingSpinner/>

	return (
		<div>
			 {scholarships && scholarships.length > 0 ? 
			<div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
				{scholarships.map(scholarship => <ScholarshipCard key={scholarship._id} scholarship={scholarship} />)}
			</div>
			: 
	 		 (<p>No data available</p>)}
		</div>
	);
};

export default Scholarships;

{/* <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'> */}