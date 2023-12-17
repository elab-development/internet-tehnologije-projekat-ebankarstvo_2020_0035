import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
function Login() {
  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100">
      <div className="login ">
        <h2 className="mb-3">Prijavite se</h2>
        <form action="" className="needs-validation">
          <div className="form-group was-validated mb-2">
            <label htmlFor="username" className="form-label">
              Korisničko ime
            </label>
            <input type="text" className="form-control" required />
            <div className="invalid-feedback">
              Molimo Vas da unesete korisničko ime
            </div>
          </div>
          <div className="form-group was-validated mb-2">
            <label htmlFor="password" className="form-label">
              Šifra
            </label>
            <input type="password" className="form-control" required />
            <div className="invalid-feedback">
              Molimo Vas da unesete lozinku
            </div>
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
