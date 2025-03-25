import React, { useState } from "react";
import axios from "axios";
import "./TransferForm.css";

function TransferForm() {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/transfer", {
        from_account_id: fromAccountId,
        to_account_id: toAccountId,
        amount: amount,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error creating transfer");
    }
  };

  return (
    <div className="container">
      <h1>Make a Transfer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>From Account ID:</label>
          <input
            type="number"
            value={fromAccountId}
            onChange={(e) => setFromAccountId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>To Account ID:</label>
          <input
            type="number"
            value={toAccountId}
            onChange={(e) => setToAccountId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Transfer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TransferForm;
