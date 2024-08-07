import React from "react";
import "./Balance.css";

const Balance = ({ name, amount, onClick }) => {
  return (
    <div className="balance-container" onClick={onClick}>
      <div className="name">{name}</div>
      <div>
        <div className="div2">
          <h5>Balance</h5>
        </div>
        <div className="balance-amount">{amount}</div>
      </div>
    </div>
  );
};

export default Balance;
