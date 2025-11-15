import React from "react";

const CardHolder = ({ data, heading }) => {
  const reversedData = [...data].reverse()
  return (
    <div className="card shadow-lg col">
      <div
        className="card-body d-flex flex-column table-body h-80 "
        style={{ overflowY: "scroll" }}
      >
        <h5 className="card-title me-auto">{heading}</h5>
        <table
          className="table table-hover"
          style={{ textTransform: "capitalize" }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Debtor</th>
              <th scope="col">Debt</th>
              <th scope="col">Paid</th>
            </tr>
          </thead>
          <tbody>
            {reversedData.length >= 5
              ? reversedData.slice(0, 5).map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{item.id}</th>
                    <td>{item.debtor}</td>
                    <td>{item.debt}</td>
                    <td>{item.paid}</td>
                  </tr>
                ))
              : reversedData.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{item.id}</th>
                    <td>{item.debtor}</td>
                    <td>{item.debt}</td>
                    <td>{item.paid}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardHolder;
