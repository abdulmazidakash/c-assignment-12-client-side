import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {

	const axiosSecure = useAxiosSecure();
	const {user, loading} = useAuth();
	const { data: role, isLoading} = useQuery({
		queryKey: ['role', user?.email],
		queryFn: async() =>{
			const { data } = axiosSecure.get(`/users/role/user?.email`);
			return data;
		}
	});
	return [role, isLoading]
};

export default useRole;