import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "MONTHLY CHANGES",
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

export const data1 = {
  labels: ["January", "December", "November"],
  datasets: [
    {
      label: "Savings",
      data: [300, 550, -400],
      backgroundColor: "rgb(255,255,51)",
    },
    {
      label: "Salary",
      data: [500, -300, 800],
      backgroundColor: "rgb(255,179,26)",
    },
    {
      label: "Private account",
      data: [500, 350, -400],
      backgroundColor: "rgb(53,162,235)",
    },
  ],
};

export const data2 = {
  labels: ["October", "September", "August"],
  datasets: [
    {
      label: "Savings",
      data: [200, -150, 100],
      backgroundColor: "rgb(255,255,51)",
    },
    {
      label: "Salary",
      data: [-100, 200, 290],
      backgroundColor: "rgb(255,179,26)",
    },
    {
      label: "Private account",
      data: [100, -150, 200],
      backgroundColor: "rgb(53,162,235)",
    },
  ],
};

export const data3 = {
  labels: ["July", "June", "May"],
  datasets: [
    {
      label: "Savings",
      data: [-120, 400, 200],
      backgroundColor: "rgb(255,255,51)",
    },
    {
      label: "Salary",
      data: [300, 220, 400],
      backgroundColor: "rgb(255,179,26)",
    },
    {
      label: "Private account",
      data: [230, 300, -400],
      backgroundColor: "rgb(53,162,235)",
    },
  ],
};

export const data4 = {
  labels: ["April", "March", "February"],
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
      <Bar options={options} data={data1} />
      <Bar options={options} data={data2} />
      <Bar options={options} data={data3} />
      <Bar options={options} data={data4} />
    </div>
  );
}

export default Statistics;
