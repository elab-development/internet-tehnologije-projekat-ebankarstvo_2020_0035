import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleForgotPassword = () => {
    navigate("/forgotPassword");
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.status) {
          sessionStorage.setItem("auth_token", res.data.access_token);
          sessionStorage.setItem("role", res.data.role);
          navigate("/dashboard");
        }
      })
      .catch(() => {
        // Ukoliko nije, postavi isFormValid na false
        setIsFormValid(false);
        console.log(email, password);
      });
  }

  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100">
      <div className="login ">
        <h2 className="mb-3">Log in</h2>
        <form action="" className="needs-validation" onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className={`form-control ${!isFormValid ? "is-invalid" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {!isFormValid && (
              <div className="invalid-feedback">Invalid username</div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${!isFormValid ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isFormValid && (
              <div className="invalid-feedback">Invalid password</div>
            )}
          </div>
          <button
            type="submit"
            className="btn d-block btn-success mx-auto mt-2"
          >
            Log in
          </button>
          <div className="register-div">Don't have an account?</div>
          <button
            type="submit"
            className="btn d-block btn-danger mx-auto mt-2"
            onClick={handleRegisterClick}
          >
            Register
          </button>
          <div className="forgot-div" onClick={handleForgotPassword}>
            Forgot password?
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
