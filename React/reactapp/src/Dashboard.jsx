import React from "react";
import Balance from "./Balance";
import Transactions from "./Transactions";
import AllTransactions from "./AllTransactions";

function Dashboard() {
  return (
    <div>
      <Balance />
      <Transactions />
      <AllTransactions />
    </div>
  );
}

export default Dashboard;
