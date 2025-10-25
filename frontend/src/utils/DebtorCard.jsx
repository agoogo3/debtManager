import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";

const DebtorCard = ({ debtor }) => {
  const [debtOwed, setDebtOwed] = useState(0);
  const navigate = useNavigate()
  useEffect(() => {
    if (debtor && Array.isArray(debtor.debts)) {
      const debts = debtor.debts;

      const totalDebt = debts.reduce((a, b) => {
        return a +parseFloat( b.amount);
      }, 0);
      const totalPaid = debts.reduce((a, b) => {
        return a +parseFloat( b.paid);
      }, 0);
      const total = totalDebt - totalPaid
      setDebtOwed(total)

    }
  }, [debtor]);

  return (
    <div className="card bg-light debtor-card mt-4 shadow-lg mx-auto">
      <div className="d-flex">
        {debtor ? (
          <div className="card-body d-flex">
            <Avatar name={debtor.fullname} size={50} />
            <div className="details">
              <h5>{debtor.fullname}</h5>
              <p className="text-secondary">Id: {debtor.id}</p>
              <p className="text-secondary">Debt: ₵{debtOwed}</p>
            </div>
            <div className=" ms-2 my-auto ms-auto">
              <button className="btn btn-dark rounded-4" onClick={()=>navigate(`/debtor/${debtor.id}`)}>View profile</button>
            </div>
          </div>
        ) : (
          <div className="card-body">
            <Avatar name={"?"} size={60} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DebtorCard;
