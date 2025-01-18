import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useRole = () => {

	const axiosSecure = useAxiosSecure();
	const {user, loading} = useAuth();

	const { data: role, isLoading } = useQuery({
		queryKey: ['role', user?.email],
		enabled: !loading && !!user?.email,
		queryFn: async()=>{
			const { data } = await axiosSecure.get(`/users/role/${user?.email}`);
			console.log(`Your role: ${data.role}. Your email ${user?.email}`);
			return data.role ;
		}
	})
	return [role, isLoading];
};

export default useRole;