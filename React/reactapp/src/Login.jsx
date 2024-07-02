import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();

    const expectedUsername = "admin";
    const expectedPassword = "admin";

    if (username === expectedUsername && password === expectedPassword) {
      // Ukoliko je uspešno, prebaci na dashboard
      navigate("/dashboard");
    } else {
      // Ukoliko nije, postavi isFormValid na false
      setIsFormValid(false);
    }
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
        </form>
      </div>
    </div>
  );
}

export default Login;
