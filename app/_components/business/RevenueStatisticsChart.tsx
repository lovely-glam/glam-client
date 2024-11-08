"use client"
// components/RevenueStatisticsChart.tsx
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueStatisticsChart: React.FC = () => {
  const data = {
    labels: [
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
      '2021',
      '2022',
      '2023',
    ],
    datasets: [
      {
        label: 'Orders',
        data: [2000, 3000, 4000, 3000, 5000, 6000, 7000, 8000, 7500, 8200],
        backgroundColor: '#34b4eb',
      },
      {
        label: 'Revenue',
        data: [1000, 2000, 3000, 4000, 3500, 5000, 6000, 7000, 8000, 8500],
        backgroundColor: '#4ade80',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default RevenueStatisticsChart;
