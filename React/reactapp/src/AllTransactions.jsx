import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Transaction.css";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const TransactionsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:3001/transaction"); //json-server --watch example.json --port 3001
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      const nameMatch = transaction.description
        .toLowerCase()
        .includes(filterName.toLowerCase());
      const categoryMatch =
        filterCategory === "All" || transaction.category === filterCategory;
      return nameMatch && categoryMatch;
    });

    setFilteredTransactions(filtered);
    setCurrentPage(1); // Reset page when filters change
  }, [transactions, filterName, filterCategory]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNameFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  return (
    <div>
      <div className="filter">
        <label>
          Filter by name:
          <input
            type="text"
            value={filterName}
            onChange={handleNameFilterChange}
          />
        </label>
        <label>
          Filter by category:
          <select value={filterCategory} onChange={handleCategoryFilterChange}>
            <option value="All">All</option>
            <option value="Transfers">Transfers</option>
            <option value="Monthly payments">Monthly payments</option>
            <option value="Payments">Payments</option>
          </select>
        </label>
      </div>

      <div className="allTrans">
        <ul>
          <h2 className="history">Transaction History</h2>
          {filteredTransactions
            .slice(
              (currentPage - 1) * TransactionsPerPage,
              currentPage * TransactionsPerPage
            )
            .map((transaction) => (
              <li key={transaction.id}>
                {transaction.description} {transaction.amount}
              </li>
            ))}
        </ul>
      </div>

      <div className="pagination">
        {Array.from(
          {
            length: Math.ceil(
              filteredTransactions.length / TransactionsPerPage
            ),
          },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AllTransactions;
