import React from "react";
import "./Transaction.css";
import TransactionIcon from "./TransactionIcon";
const Transaction = ({ amount, description, icon }) => {
  return (
    <div className="trans">
      <div className="desc">
        <div>{icon && <TransactionIcon icon={icon} />}</div>
        <div>{description}</div>
      </div>
      <div className="amount">{amount}</div>
    </div>
  );
};

export default Transaction;
