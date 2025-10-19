import React, { useEffect, useState } from "react";
import { useContext } from "react";
import DataContext from "../context/dataContext";

const Dash_head = () => {
  const { debts, debtors } = useContext(DataContext);
  const [totalDebts, setTotalDebts] = useState(0)
  const [totalDebtsPaid, setTotalDebtsPaid] = useState(0)
  useEffect(() => {
    const totalDebts = debts.reduce((a, b) => {
      return a + parseFloat(b.amount);
    }, 0);
    const totalDebtsPaid = debts.reduce((a, b) => {
      return a + parseFloat(b.paid);
    }, 0);
    setTotalDebts(totalDebts)
    setTotalDebtsPaid(totalDebtsPaid)
  }, [debts,debtors]);

  return (
    <div>
      <div className="h-50 d-sm-flex d-md-none">
        <div className="container-fluid h-100  phone_container  h-50">
          <div className="row row-cols-2 pt-5">
            <div className="col">
              <p style={{ textAlign: "left", paddingLeft: "15px" }}>
                Total Debts
              </p>
              <h4 style={{ textAlign: "left", paddingLeft: "15px" }}>
                GHC {totalDebts}
              </h4>
            </div>
            <div className="col">
              <p>Total Debts Paid</p>
              <h4>GHC {totalDebtsPaid}</h4>
            </div>
          </div>
          <span className="text-secondary" style={{ paddingLeft: "15px" }}>
            Total Number of Debtors
          </span>
          <br />
          <span style={{ paddingLeft: "15px" }}>{debtors.length}</span>
          <br />
          <br />
          <div className="d-flex gap-2 btn-container">
            <button
              className="btn btn-light debt-btn mx-auto"
              data-bs-toggle="modal"
              data-bs-target="#addDebtModal"
            >
              Add New Debt
            </button>
            <button
              className="btn btn-light debt-btn mx-auto"
              data-bs-toggle="modal"
              data-bs-target="#addDebtorModal"
            >
              Add New Debtor
            </button>
          </div>
          <div className="card bg-light debtor-card mt-4 shadow-lg mx-auto">
            <div className="card-body">Debtor Card</div>
          </div>
        </div>
      </div>
      {/* Large container */}
      <div className="container large_container d-none d-md-inline">
        <div className="row p-5 dash-head-row gap-4">
          <div className="col shadow card bg-dark text-white">
            <p style={{ paddingLeft: "15px" }}>Total Debts</p>
            <h4 style={{ paddingLeft: "15px" }}>GHC {totalDebts}</h4>
          </div>
          <div className="col shadow card bg-primary text-white">
            <p style={{ paddingLeft: "15px" }}>Total Debts Paid</p>
            <h4 style={{ paddingLeft: "15px" }}>GHC {totalDebtsPaid}</h4>
          </div>
          <div className="col shadow card bg-secondary text-white">
            <p style={{ paddingLeft: "15px" }}>Total Debts Paid</p>
            <h4 style={{ paddingLeft: "15px" }}>{debtors.length}</h4>
          </div>
        </div>
        <div
          className="button-group d-flex gap-3"
          style={{ textAlign: "left" }}
        >
          <button
            className="btn btn-outline-dark "
            data-bs-toggle="modal"
            data-bs-target="#addDebtModal"
          >
            Add New Debt
          </button>
          <button
            className="btn btn-outline-dark "
            data-bs-toggle="modal"
            data-bs-target="#addDebtorModal"
          >
            Add New Debtor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dash_head;
