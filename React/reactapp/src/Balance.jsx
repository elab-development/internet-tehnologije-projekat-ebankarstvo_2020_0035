import React from "react";

import "./Balance.css";
function Balance() {
  return (
    <div className="balance-container">
      <div>
        <h4>Tekući račun</h4>
      </div>
      <div>
        <div className="div2">
          <h5>Raspoloživo</h5>
        </div>

        <div className="balance-amount">
          <b>15000</b>
        </div>
      </div>
    </div>
  );
}

export default Balance;
