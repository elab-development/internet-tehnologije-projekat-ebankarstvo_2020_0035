import React from "react";
import Transaction from "./Transaction";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiShoppingCart, CiUser, CiDumbbell } from "react-icons/ci";
function Transactions() {
  const transactionsData = [
    { amount: "$100", description: "Purchase at Store", icon: CiShoppingCart },
    { amount: "$50", description: "Market", icon: CiShoppingCart },
    { amount: "$30", description: "Milica Markovic", icon: CiUser },
    { amount: "$40", description: "Gym", icon: CiDumbbell },
  ];
  return (
    <div className="divTrans text-center ">
      <h5 className="transTitle d-felx ">Recent Transactions</h5>
      {transactionsData.map((transaction, index, icon) => (
        <Transaction
          key={index}
          amount={transaction.amount}
          description={transaction.description}
          icon={transaction.icon}
        />
      ))}
    </div>
  );
}

export default Transactions;
