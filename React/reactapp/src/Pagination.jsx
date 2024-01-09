import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { options, data1, data2, data3, data4 } from "./Bars";

function Pagination({ charts }) {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * 1;
  const endIndex = startIndex + 1;

  const currentChart = charts[startIndex];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Bar key={currentChart.id} options={options} data={currentChart.data} />

      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= charts.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const Charts = () => {
  const charts = [
    { id: "1", data: data1 },
    { id: "2", data: data2 },
    { id: "3", data: data3 },
    { id: "4", data: data4 },
  ];

  return (
    <div>
      <Pagination charts={charts} />
    </div>
  );
};

export default Charts;
