import React from "react";
import Balance from "./Balance";
import Transactions from "./Transactions";

function Dashboard() {
  return (
    <div>
      <Balance />
      <Transactions />
    </div>
  );
}

export default Dashboard;
