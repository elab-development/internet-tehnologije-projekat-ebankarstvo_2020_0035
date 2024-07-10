import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import dayjs from "dayjs";
import axios from "axios";
import isBetween from "dayjs/plugin/isBetween";
import "./Statistics.css";

function Statistics() {
  const [accounts, setAccount] = useState([]);
  const [accountId, setAccountId] = useState(0);
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const configMonthly = {
    method: "get",
    url: `api/userTransactions?account_id=${accountId}&start_date= ${dayjs()
      .subtract(30, "days")
      .format("YYYY-MM-DD")}&end_date=${dayjs()
      .add(1, "days")
      .format("YYYY-MM-DD")}`,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
    },
  };

  const configQuarterly = {
    method: "get",
    url: `api/userTransactions?account_id=${accountId}&start_date= ${dayjs()
      .subtract(3, "month")
      .format("YYYY-MM-DD")}&end_date=${dayjs()
      .add(1, "days")
      .format("YYYY-MM-DD")}`,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
    },
  };

  const configYearly = {
    method: "get",
    url: `api/userTransactions?account_id=${accountId}&start_date= ${dayjs()
      .subtract(12, "month")
      .format("YYYY-MM-DD")}&end_date=${dayjs()
      .add(1, "days")
      .format("YYYY-MM-DD")}`,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
    },
  };

  const configAccounts = {
    method: "get",
    url: "api/myAccounts",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
    },
    body: {},
  };
  const loadDataAccounts = async () => {
    try {
      const response = await axios(configAccounts);
      setAccount(response.data.accounts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadDataYearly = async () => {
    dayjs.extend(isBetween);
    setIsLoading(true);
    try {
      const response = await axios(configYearly);
      const finalArray = [["month", "expenses"]];
      const day = dayjs("2024-01-01");
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      for (let i = 0; i < 12; i++) {
        let value = 0;
        response.data.map((res) => {
          if (
            dayjs(res.created_at).isBetween(
              day.add(i, "month"),
              day.add(1 + i, "month")
            )
          ) {
            value += res.amount;
          }
        });
        finalArray.push([months[i], value]);
      }
      setStats(finalArray);
      console.log(stats);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadDataQuarterly = async () => {
    dayjs.extend(isBetween);
    setIsLoading(true);
    try {
      const response = await axios(configQuarterly);
      const finalArray = [["weeks", "expenses"]];
      const day = dayjs().subtract(3, "month");
      for (let i = 0; i < 12; i++) {
        let value = 0;
        response.data.map((res) => {
          if (
            dayjs(res.created_at).isBetween(
              day.add(i, "week"),
              day.add(1 + i, "week")
            )
          ) {
            console.log("aa");
            value += res.amount;
          }
        });
        finalArray.push(["Week " + (i + 1), value]);
      }
      setStats(finalArray);
      console.log(stats);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await axios(configMonthly);
      const fill = {};
      const finalArray = [["date", "expenses"]];
      response.data.map((res) => {
        console.log(res);
        if (fill[dayjs(res.created_at).format("YYYY-MM-DD")] === undefined)
          fill[dayjs(res.created_at).format("YYYY-MM-DD")] = res.amount;
        else fill[dayjs(res.created_at).format("YYYY-MM-DD")] += res.amount;
      });
      for (let key in fill) {
        finalArray.push([key, fill[key]]);
      }
      setStats(finalArray);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    loadDataAccounts();
  }, []);

  const handleClickMonthly = () => {
    loadData();
  };

  const handleClickQuarterly = () => {
    loadDataQuarterly();
  };

  const handleClickYearly = () => {
    loadDataYearly();
  };

  const options = {
    title: "Monthly spending",
    hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "50%", height: "70%" },
    colors: ["orange"],
  };
  return (
    <div className="container">
      <label htmlFor="mojbrojRacuna" className="form-label">
        Select your account
      </label>
      <select
        class="form-select"
        aria-label="Default select example"
        onChange={(e) => {
          setAccountId(parseInt(e.target.value));
          console.log(e.target.value);
        }}
      >
        <option selected>-</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.title} - {account.type} - {account.number}
          </option>
        ))}
      </select>
      <div className="buttonDiv">
        <button
          type="button"
          class="btn btn-primary"
          onClick={handleClickMonthly}
        >
          Show monthly
        </button>
        <button
          type="button"
          class="btn btn-primary"
          onClick={handleClickQuarterly}
        >
          Show quarterly
        </button>
        <button
          type="button"
          class="btn btn-primary"
          onClick={handleClickYearly}
        >
          Show yearly
        </button>
      </div>
      <div className="chart">
        {isLoading ? (
          <div
            class="spinner-border text-secondary"
            role="status"
            style={{ position: "relative", zIndex: "1" }}
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <Chart
            className="chart"
            chartType="Bar"
            width="100%"
            height="400px"
            data={stats}
            options={options}
          />
        )}
      </div>
    </div>
  );
}

export default Statistics;
