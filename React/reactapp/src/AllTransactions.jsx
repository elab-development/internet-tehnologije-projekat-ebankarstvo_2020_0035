import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Transaction.css";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDescription, setFilterDescription] = useState("");

  useEffect(() => {
    // Simulira povlačenje istorije transakcija sa API-ja

    const fetchTransactions = async () => {
      try {
        const response = await fetch(" http://localhost:3001/transaction"); //Pokretanje json servera: json-server --watch example.json --port 3001
        const data = await response.json();
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    // Call the fetchTransactions function when the component mounts
    fetchTransactions();
  }, []);

  const TransactionsPerPage = 10;

  const indexOfLastTransaction = currentPage * TransactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - TransactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  //Ažurira stranicu kada kliknemo dugme za paginaciju.
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDescriptionFilterChange = (event) => {
    const descriptionFilterValue = event.target.value.toLowerCase();
    setFilterDescription(descriptionFilterValue);

    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(descriptionFilterValue)
    );

    setFilteredTransactions(filtered);
    setCurrentPage(1); // Resetuje stranicu kada se filter promeni
  };

  return (
    <div>
      <div className="allTrans">
        <ul>
          <h2 className="history">Transaction History</h2>
          {currentTransactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.description} {transaction.amount}
            </li>
          ))}
        </ul>
      </div>

      <div className="filter">
        <label>
          Filter by name:
          <input
            type="text"
            value={filterDescription}
            onChange={handleDescriptionFilterChange}
          />
        </label>
      </div>

      <div className="pagination">
        {Array.from(
          {
            length: Math.ceil(
              filteredTransactions.length / TransactionsPerPage
            ),
          },
          (_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AllTransactions;
