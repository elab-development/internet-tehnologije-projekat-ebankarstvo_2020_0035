import React from "react";

function Transfer() {
  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100 ">
      <div className="transfer bg-warning">
        <h2 className="mb-3 ">Transfer novca</h2>
        <form action="" className="needs-validation">
          <div className="form-group was-validated mb-2">
            <label htmlFor="recipient" className="form-label">
              Primalac
            </label>
            <input type="text" className="form-control" required />
            <div className="invalid-feedback">
              Molimo Vas da unesete primaoca
            </div>
          </div>
          <div className="form-group was-validated mb-2">
            <label htmlFor="brojRacuna" className="form-label">
              Broj racuna
            </label>
            <input type="password" className="form-control" required />
            <div className="invalid-feedback">
              Molimo Vas da unesete broj racuna primaoca
            </div>
            <div className="form-group was-validated mb-2">
              <label htmlFor="amount" className="form-label">
                Iznos
              </label>
              <input type="text" className="form-control" required />
              <div className="invalid-feedback">
                Molimo Vas da unesete iznos
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn d-block btn-warning mx-auto mt-2"
          >
            Izvrši transfer
          </button>
        </form>
      </div>
    </div>
  );
}

export default Transfer;
