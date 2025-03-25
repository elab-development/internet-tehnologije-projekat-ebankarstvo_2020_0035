import React from "react";
import "./Transaction.css";
import TransactionIcon from "./TransactionIcon";
const Transaction = ({ transaction, icon, isSender }) => {
  return (
    <div className="trans">
      <div>
        <div>{icon && <TransactionIcon icon={icon} />}</div>
        <div className="desc">{transaction.title}</div>
        {isSender ? (
          <div className="person">{transaction.recipient_name} </div>
        ) : (
          <div className="person">{transaction.sender_name} </div>
        )}
      </div>
      {isSender ? (
        <div className="amount" style={{ color: "red" }}>
          {transaction.amount}
        </div>
      ) : (
        <div className="amount" style={{ color: "green" }}>
          +{transaction.amount}
        </div>
      )}
    </div>
  );
};

export default Transaction;
