import React, { useEffect, useState } from "react";
import Transaction from "./Transaction";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Transactions({ account, name }) {
  const [allTransactions, setAllTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [filterCategory, setFilterCategory] = useState(0);

  const config = {
    method: "get",
    url: "api/accounts/transactions/" + account + "?page=" + page,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
    },
  };

  const TransactionsPerPage = 3;

  const loadData = async () => {
    try {
      const response = await axios(config);
      setAllTransactions(response.data.allTransactions);
      setTransactions(response.data.paginatedTransactions.data);
      setPagination(response.data.paginatedTransactions);
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

  useEffect(() => {
    const filtered = allTransactions.filter((transaction) => {
      const nameMatch = transaction.title
        .toLowerCase()
        .includes(filterName.toLowerCase());
      const categoryMatch =
        filterCategory === 0 || transaction.category_id === filterCategory;
      return nameMatch && categoryMatch;
    });
    console.log(filtered);
    setTransactions(filtered);
    setCurrentPage(1);
  }, [filterName, filterCategory]);

  const handleNameFilterChange = (event) => {
    console.log(allTransactions);
    setFilterName(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    console.log(allTransactions);
    console.log(event.target.value);
    setFilterCategory(parseInt(event.target.value));
  };

  return (
    <div className="divTrans text-center ">
      {transactions ? (
        <div>
          <div className="filter">
            <label>
              Filter by name:
              <input
                type="text"
                value={filterName}
                onChange={(event) => handleNameFilterChange(event)}
              />
            </label>
            <label>
              Filter by category:
              <select
                value={filterCategory}
                onChange={(event) => handleCategoryFilterChange(event)}
              >
                <option value="0">All</option>
                <option value="1">Payment</option>
                <option value="2">Credit</option>
                <option value="3">Transfer</option>
              </select>
            </label>
          </div>
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
      {!filterName && filterCategory === 0 ? (
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
      ) : null}
    </div>
  );
}

export default Transactions;
