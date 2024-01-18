import React from "react";
import Balance from "./Balance";
import Transactions from "./Transactions";
import AllTransactions from "./AllTransactions";

function Dashboard() {
  const balanceData = [
    { name: "Savings", amount: "5 000" },
    { name: "Salary", amount: "15 000" },
    { name: "Private account", amount: "10 000" },
  ];

  return (
    <div>
      <div>
        {balanceData.map((balance, index) => (
          <Balance key={index} name={balance.name} amount={balance.amount} />
        ))}
      </div>
      <Transactions />
      <AllTransactions />
    </div>
  );
}

export default Dashboard;
