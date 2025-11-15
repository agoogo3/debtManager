import React, { useContext, useEffect, useState } from "react";
import ChartHolder from "./ChartHolder";
import CardHolder from "./CardHolder";
import DataContext from "../context/DataContext";

const DashBody = () => {
  const { debtors, debts } = useContext(DataContext);
  const [debtFlow, setDebtFlow] = useState([]);
  const [updatedDebtFlow, setUpdatedDebtFlow] = useState([]);

  useEffect(() => {
    // Calculating the debt owed by each individual debtor to project on a chart
    const updatedData = [];
    let totalDebts = 0;
    let paidDebts = 0;
    let total = 0;
    debtors.forEach((debtor) => {
      const exists = updatedData.some((data) => debtor.id == data.id);
      if (!exists) {
        totalDebts = debtor.debts.reduce((a, b) => {
          return a + parseFloat(b.amount);
        }, 0);
        paidDebts = debtor.debts.reduce((a, b) => {
          return a + parseFloat(b.paid);
        }, 0);
        total = totalDebts - paidDebts;
        updatedData.push({ id: debtor.id, Name: debtor.fullname, Debt: total });
      }
    });
    setDebtFlow(updatedData);
  }, [debtors]);

  useEffect(() => {
    let updatedDebt = [];

    debts.forEach((debt) => {
      const match = debtors.find((debtor) => debtor.id == debt.debtor);
      if (match) {
        updatedDebt.push({
          id: debt.id,
          debtor: match.fullname,
          debt: debt.amount,
          paid: debt.paid,
        });
      }
    });
    setUpdatedDebtFlow(updatedDebt)
  }, [debtors, debts]);

  return (
    <div className="container">
      <div className=" dash row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-5 ms-1 gap-3">
        <ChartHolder heading={"Debt Flow"} data={debtFlow} />
        <CardHolder heading={"Current Debts"} data={updatedDebtFlow} />
      </div>
    </div>
  );
};

export default DashBody;
