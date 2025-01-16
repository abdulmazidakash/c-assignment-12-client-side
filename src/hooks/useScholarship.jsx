import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useParams } from "react-router-dom";

const useScholarship = () => {
//   const { id } = useParams(); // Destructure the `id` from useParams
  const axiosSecure = useAxiosSecure();

  const { refetch, data: scholarship = {}, isLoading, isError, error } = useQuery({
    queryKey: ['scholarship'], // Ensure the queryKey matches your dependency
    queryFn: async () => {
    //   if (!id) throw new Error("Scholarship ID is missing."); // Guard against missing ID
      const { data } = await axiosSecure.get(`/scholarships`);
      return data;
    },
    // enabled: !!id, // Prevent the query from running if `id` is undefined or null
  });

  return { scholarship, refetch, isLoading, isError, error };
};

export default useScholarship;
