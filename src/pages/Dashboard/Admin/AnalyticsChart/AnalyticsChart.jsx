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

// Register ChartJS components
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

  console.log(adminStats);

  if (isLoading) {
    return <div className="text-center mt-10 text-blue-600 font-semibold">Loading data...</div>;
  }

  if (isError || !adminStats.subjectCategories) {
    return <div className="text-center mt-10 text-red-500 font-semibold">Error fetching data!</div>;
  }

  // Chart data preparation
  const barDataCategories = {
    labels: Object.keys(adminStats.subjectCategories || {}),
    datasets: [
      {
        label: "Scholarship Categories",
        data: Object.values(adminStats.subjectCategories || {}),
        backgroundColor: ["#6366F1", "#F43F5E", "#22C55E", "#EAB308", "#3B82F6"],
      },
    ],
  };

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

  // Chart responsiveness options
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
    <div className="p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center text-indigo-600">
        Admin Analytics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        

        {/* Bar Chart for Subject Categories */}
        <div className="bg-white shadow-md rounded-lg p-4 border border-indigo-200">
          <h2 className="text-lg md:text-2xl font-semibold flex items-center gap-3 mb-4 text-green-500">
            <FaChartBar /> Subject Categories
          </h2>
          <div className="relative h-64 md:h-80">
            <Bar data={barDataSubjectCategories} options={chartOptions} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-md rounded-lg p-4 border border-indigo-200">
          <h2 className="text-lg md:text-2xl font-semibold flex items-center gap-3 mb-4 text-purple-500">
            <FaChartPie /> Overall Analytics
          </h2>
          <div className="relative h-64 md:h-80">
            <Pie data={pieData} options={chartOptions} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-gray-600">
            <div className="flex items-center gap-2">
              <FaUsers className="text-green-500" /> <span>Users</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClipboardList className="text-orange-500" /> <span>Applications</span>
            </div>
            <div className="flex items-center gap-2">
              <FaAward className="text-blue-500" /> <span>Scholarships</span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-purple-500" /> <span>Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
