import React from "react";

function Transfer() {
  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100 ">
      <div className="transfer bg-warning">
        <h2 className="mb-3 ">Money transfer</h2>
        <form action="" className="needs-validation">
          <div className="form-group was-validated mb-2">
            <label htmlFor="recipient" className="form-label">
              Recipient
            </label>
            <input type="text" className="form-control" required />
            <div className="invalid-feedback">Please enter the recipient</div>
          </div>
          <div className="form-group was-validated mb-2">
            <label htmlFor="brojRacuna" className="form-label">
              Account number
            </label>
            <input type="password" className="form-control" required />
            <div className="invalid-feedback">
              Please enter the recipient's account number
            </div>
            <div className="form-group was-validated mb-2">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input type="text" className="form-control" required />
              <div className="invalid-feedback">Please enter the amount</div>
            </div>
          </div>
          <button
            type="submit"
            className="btn d-block btn-warning mx-auto mt-2"
          >
            Make a transfer
          </button>
        </form>
      </div>
    </div>
  );
}

export default Transfer;
