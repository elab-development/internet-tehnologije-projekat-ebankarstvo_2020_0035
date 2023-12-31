import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();

    navigate("/dashboard");
  }
  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100">
      <div className="login ">
        <h2 className="mb-3">Log in</h2>
        <form action="" className="needs-validation" onSubmit={handleSubmit}>
          <div className="form-group was-validated mb-2">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input type="text" className="form-control" required />
            <div className="invalid-feedback">Please enter username</div>
          </div>
          <div className="form-group was-validated mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" required />
            <div className="invalid-feedback">Please enter password</div>
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
