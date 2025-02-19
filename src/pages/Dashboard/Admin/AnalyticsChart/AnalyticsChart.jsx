import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar, Pie } from "react-chartjs-2";
import { FaChartBar, FaChartPie, FaUsers, FaClipboardList, FaAward, FaStar } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AnalyticsChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data: adminStats = {}, isLoading, isError } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const response = await axiosSecure.get("/admin-stats");
      return response.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  if (isError || !adminStats.subjectCategories) {
    return <div className="text-center mt-10 text-red-500 font-semibold">Error fetching data!</div>;
  }

  const barDataSubjectCategories = {
    labels: Object.keys(adminStats.subjectCategories || {}),
    datasets: [
      {
        label: "Subject Categories",
        data: Object.values(adminStats.subjectCategories || {}),
        backgroundColor: ["#F87171", "#60A5FA", "#34D399", "#FACC15", "#A78BFA"],
      },
    ],
  };

  const pieData = {
    labels: ["Users", "Applications", "Scholarships", "Reviews"],
    datasets: [
      {
        data: [
          adminStats.users,
          adminStats.applications,
          adminStats.scholarships,
          adminStats.reviews,
        ],
        backgroundColor: ["#22C55E", "#F97316", "#3B82F6", "#8B5CF6"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
   <>
   <Helmet>
    <title>Admin Stats | ScholarshipHub</title>
   </Helmet>
    <div className="p-4 dark:bg-gray-900">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
        Admin Analytics
      </h1>
       {/* New Card Section (Page Top) */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Users Card */}
          <div className="bg-green-500 text-white rounded-lg shadow-md p-4 flex items-center gap-4">
            <FaUsers className="text-3xl" />
            <div>
              <p className="text-lg font-semibold">Users</p>
              <p className="text-2xl font-bold">{adminStats.users}</p>
            </div>
          </div>

          {/* Applications Card */}
          <div className="bg-orange-500 text-white rounded-lg shadow-md p-4 flex items-center gap-4">
            <FaClipboardList className="text-3xl" />
            <div>
              <p className="text-lg font-semibold">Applications</p>
              <p className="text-2xl font-bold">{adminStats.applications}</p>
            </div>
          </div>

          {/* Scholarships Card */}
          <div className="bg-blue-500 text-white rounded-lg shadow-md p-4 flex items-center gap-4">
            <FaAward className="text-3xl" />
            <div>
              <p className="text-lg font-semibold">Scholarships</p>
              <p className="text-2xl font-bold">{adminStats.scholarships}</p>
            </div>
          </div>

          {/* Reviews Card */}
          <div className="bg-purple-500 text-white rounded-lg shadow-md p-4 flex items-center gap-4">
            <FaStar className="text-3xl" />
            <div>
              <p className="text-lg font-semibold">Reviews</p>
              <p className="text-2xl font-bold">{adminStats.reviews}</p>
            </div>
          </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-indigo-200 dark:border-gray-700">
          <h2 className="text-lg md:text-2xl font-semibold flex items-center gap-3 mb-4 text-green-500 dark:text-green-400">
            <FaChartBar /> Subject Categories
          </h2>
          <div className="relative h-64 md:h-80">
            <Bar data={barDataSubjectCategories} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-indigo-200 dark:border-gray-700">
          <h2 className="text-lg md:text-2xl font-semibold flex items-center gap-3 mb-4 text-purple-500 dark:text-purple-400">
            <FaChartPie /> Overall Analytics
          </h2>
          <div className="relative h-64 md:h-80">
            <Pie data={pieData} options={chartOptions} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <FaUsers className="text-green-500 dark:text-green-400" /> <span>Users</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClipboardList className="text-orange-500 dark:text-orange-400" /> <span>Applications</span>
            </div>
            <div className="flex items-center gap-2">
              <FaAward className="text-blue-500 dark:text-blue-400" /> <span>Scholarships</span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-purple-500 dark:text-purple-400" /> <span>Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default AnalyticsChart;
