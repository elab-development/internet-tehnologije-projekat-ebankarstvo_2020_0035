import React, { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleClick = () => {
    axios
      .post("api/forgot-password", { email: email })
      .then(alert("Check your email."));
  };

  return (
    <>
      <div className="container">
        <p>
          Please enter your email adress below and we'll send you a link to set
          a new password
        </p>
        <input
          class="form-control"
          type="text"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" onClick={handleClick} class="btn btn-primary">
          Sumbit
        </button>
      </div>
    </>
  );
};

export default ForgotPassword;
