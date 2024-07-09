import React, { useEffect, useState } from "react";
import Balance from "./Balance";
import Transactions from "./Transactions";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState(0);
  const [name, setName] = useState("");

  const config = {
    method: "get",
    url: "api/user",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
    },
  };

  const handleClick = (id) => {
    setAccount(id);
    setName(user.name);
    console.log(account);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await axios(config);
      setUser(response.data.data);
      console.log(user);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div className="container">
        {isLoading ? (
          <div
            class="spinner-border text-secondary"
            role="status"
            style={{ position: "relative", zIndex: "1" }}
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <p className="header">Welcome {user?.name}</p>
        )}

        <div>
          {isLoading ? (
            <div
              class="spinner-border text-secondary"
              role="status"
              style={{ position: "relative", zIndex: "1" }}
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="balance-container">
              {user?.accounts.map((account, index) => (
                <Balance
                  key={index}
                  name={account.title}
                  amount={account.balance}
                  onClick={() => handleClick(account.id)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="transactions">
          {isLoading ? (
            <div
              class="spinner-border text-secondary"
              role="status"
              style={{ position: "relative", zIndex: "1" }}
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <Transactions account={account} name={name} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
