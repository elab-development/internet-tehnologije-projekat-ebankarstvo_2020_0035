import React, { useState } from "react";
import axios from "axios";

function TransferForm() {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/transferexch",
        {
          from_account_id: fromAccountId,
          to_account_id: toAccountId,
          amount,
        }
      );
      setMessage(response.data.message);
      setErrors({});
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
          setMessage("");
        } else {
          setMessage("Transfer failed. Please try again later.");
        }
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      } else {
        setMessage("Error creating transfer");
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <div>
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
          {errors.from_account_id && <p>{errors.from_account_id[0]}</p>}
        </div>
        <div>
          <label>To Account ID:</label>
          <input
            type="number"
            value={toAccountId}
            onChange={(e) => setToAccountId(e.target.value)}
            required
          />
          {errors.to_account_id && <p>{errors.to_account_id[0]}</p>}
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
          {errors.amount && <p>{errors.amount[0]}</p>}
        </div>
        <button type="submit">Transfer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TransferForm;
