import React, { useEffect, useState } from "react";
import Transaction from "./Transaction";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
function Transactions({ account, name }) {
  const [transactions, setTransacations] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState(1);

  const config = {
    method: "get",
    url: "api/accounts/transactions/" + account + "?page=" + page,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
    },
  };

  const loadData = async () => {
    try {
      const response = await axios(config);
      setTransacations(response.data.data);
      setPagination(response.data);
      console.log(response.data);
      console.log("gas");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    loadData();
  }, [account, page]);

  const paginatePage = async (link) => {
    console.log(link);
    const page = new URL(link);
    setPage(page.searchParams.get("page"));
    loadData();
  };
  return (
    <div className="divTrans text-center ">
      {transactions ? (
        <div>
          <h5 className="transTitle d-flex">Recent Transactions</h5>
          {transactions.map((transaction, index) => (
            <Transaction
              key={index}
              transaction={transaction}
              isSender={transaction.sender_name === name}
            />
          ))}
        </div>
      ) : (
        <p>LOADING</p>
      )}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pagination.links?.map((link) => (
            <li
              onClick={() => paginatePage(link.url)}
              className={`page-item ${link.active ? "active" : ""}`}
            >
              <a className="page-link">
                {link.label.replace("&laquo;", "<<").replace("&raquo;", ">>")}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Transactions;
