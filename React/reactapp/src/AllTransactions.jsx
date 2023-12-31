import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Transaction.css";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulate fetching transaction history from an API
    const fetchTransactions = async () => {
      try {
        const response = await fetch(" http://localhost:3001/transaction");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    // Call the fetchTransactions function when the component mounts
    fetchTransactions();

    // Cleanup: This function will be called when the component unmounts
    return () => {
      // Perform cleanup tasks, such as canceling ongoing requests
      console.log("Component unmounted. Cleanup tasks can go here.");
    };
  }, []);

  return (
    <div className="allTrans">
      <ul>
        <h2 className="history">Transaction History</h2>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.description} {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTransactions;
