import React, { useState } from "react";
import axios from "axios";

const TransferForm = () => {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("/api/transfer", {
        from_account_id: fromAccountId,
        to_account_id: toAccountId,
        amount: amount,
      });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(`Transfer failed: ${error.response.data.message}`);
      } else {
        setMessage("Transfer failed: No response received from server");
      }
    }
  };

  return (
    <form onSubmit={handleTransfer}>
      <div>
        <label>From Account ID:</label>
        <input
          type="text"
          value={toAccountId}
          onChange={(e) => setToAccountId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>To Account ID:</label>
        <input
          type="text"
          value={fromAccountId}
          onChange={(e) => setFromAccountId(e.target.value)}
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
      {message && <p>{message}</p>}
    </form>
  );
};

export default TransferForm;
