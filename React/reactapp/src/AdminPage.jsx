import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const config = {
    method: "get",
    url: "api/users",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
    },
  };

  const loadData = async () => {
    try {
      const response = await axios(config);
      setUsers(response.data.data);
      console.log(users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleClick = (id) => {
    axios
      .delete("api/users/" + id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
        },
      })
      .then(loadData());
  };
  return (
    <>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="col">{user.name}</th>
                <th scope="col">{user.email}</th>
                <th>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => handleClick(user.id)}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminPage;
