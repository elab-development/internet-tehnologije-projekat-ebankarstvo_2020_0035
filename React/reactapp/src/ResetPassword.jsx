import React, { useEffect, useState } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import axios from "axios";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [searchParams] = useSearchParams();
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(searchParams.get("email"));
    console.log(email);
    console.log(token);
  }, []);

  const handleClick = () => {
    axios
      .post("api/reset-password", {
        email: email,
        password: password,
        password_confirmation: repeatedPassword,
        token: token,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Password changed");
          navigate("/");
        } else alert("Error");
      });
  };

  return (
    <div className="container">
      <div className="labels">Enter password</div>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <div className="labels">Confirm password</div>
      <input
        type="password"
        onChange={(e) => setRepeatedPassword(e.target.value)}
      />
      <button type="button" class="btn btn-success" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default ResetPassword;
