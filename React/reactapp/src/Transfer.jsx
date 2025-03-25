import React, { useState, useEffect } from "react";
import axios from "axios";

function Transfer() {
  //const ErrorsData = new Errors({});
  //const [errorList, setErrorList] = useState({});
  const [accounts, setAccount] = useState([]);
  const [transfer, setTransfer] = useState({
    account_id: 0,
    to_account_number: "",
    amount: 0,
    category: 0,
  });

  const config = {
    method: "get",
    url: "api/accounts",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
    },
    body: {},
  };

  const configTransfer = {
    method: "post",
    url: "api/transaction",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
    },
    data: {
      number: transfer.to_account_number,
      amount: transfer.amount,
      category: transfer.category,
      account_id: transfer.account_id,
    },
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(transfer);
    axios
      .request(configTransfer)
      .then((response) => {
        alert(JSON.stringify(response.data.message));
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  const loadData = async () => {
    try {
      const response = await axios(config);
      setAccount(response.data.accounts);
      console.log(response.data.accounts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100 ">
      <div className="transfer bg-warning">
        <h2 className="mb-3 ">Money transfer</h2>
        <form action="" className="needs-validation">
          <div className="form-group  mb-2">
            <label htmlFor="mojbrojRacuna" className="form-label">
              Select your account
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setTransfer({
                  ...transfer,
                  account_id: parseInt(e.target.value),
                });
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
            <label htmlFor="kategorija " className="form-label">
              Select category
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setTransfer({
                  ...transfer,
                  category: parseInt(e.target.value),
                });
                console.log(e.target.value);
              }}
            >
              <option selected>-</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="form-group was-validated mb-2">
            <label htmlFor="brojRacuna" className="form-label">
              Account number
            </label>
            <input
              type="number"
              className="form-control"
              required
              onChange={(e) =>
                setTransfer({ ...transfer, to_account_number: e.target.value })
              }
            />
            <div className="invalid-feedback">
              Please enter the recipient's account number
            </div>
            <div className="form-group was-validated mb-2">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                className="form-control"
                required
                onChange={(e) => {
                  setTransfer({
                    ...transfer,
                    amount: parseInt(e.target.value),
                  });
                  console.log(e.target.value);
                }}
              />
              <div className="invalid-feedback">Please enter the amount</div>
            </div>
          </div>
          <button
            type="submit"
            className="btn d-block btn-warning mx-auto mt-2"
            onClick={(e) => handleClick(e)}
          >
            Make a transfer
          </button>
        </form>
      </div>
    </div>
  );
}

export default Transfer;
