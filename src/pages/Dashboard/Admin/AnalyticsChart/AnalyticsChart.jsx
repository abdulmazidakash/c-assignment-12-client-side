import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { FaChartBar, FaChartPie } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Registering ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const fetchAnalyticsData = async () => {
  const token = localStorage.getItem("token"); // Replace with your token logic
  const response = await axios.get("http://localhost:5000/analytics", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const AnalyticsChart = () => {
  // Use TanStack Query to fetch analytics data
  const { data, error, isLoading } = useQuery(["analytics"], fetchAnalyticsData);

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10">Error fetching analytics data</div>;
  }

  // Prepare Data for Charts
  const barData = {
    labels: Object.keys(data.categories),
    datasets: [
      {
        label: "Scholarship Categories",
        data: Object.values(data.categories),
        backgroundColor: ["#3b82f6", "#f97316", "#14b8a6"],
      },
    ],
  };

  const pieData = {
    labels: ["Users", "Reviews", "Scholarships"],
    datasets: [
      {
        data: [data.users, data.reviews, data.scholarships],
        backgroundColor: ["#3b82f6", "#f97316", "#14b8a6"],
      },
    ],
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Admin Analytics</h1>
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <FaChartBar /> Scholarship Categories
          </h2>
          <Bar data={barData} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <FaChartPie /> Overall Analytics
          </h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
