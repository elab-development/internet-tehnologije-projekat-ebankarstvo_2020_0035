import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Mesečne promene",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["November", "December", "January"];

export const data = {
  labels,
  datasets: [
    {
      label: "Savings",
      data: [300, 300, -400],
      backgroundColor: "rgb(255,255,51)",
    },
    {
      label: "Salary",
      data: [500, -300, 800],
      backgroundColor: "rgb(255,179,26)",
    },
    {
      label: "Private account",
      data: [500, 300, -400],
      backgroundColor: "rgb(53,162,235)",
    },
  ],
};

function Statistics() {
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}

export default Statistics;
