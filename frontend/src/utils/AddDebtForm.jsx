import React, { useContext } from "react";
import DataContext from "../context/DataContext";

const AddDebtForm = () => {
  const { debtors, isLoading, handleAddDebt } = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    let forms = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
    // console.log(e.target.debtor.value)
    handleAddDebt(e);
  };

  return (
    <form className="needs-validation" noValidate onSubmit={handleSubmit}>
      <div className="form-floating">
        <select
          className="form-select mb-2 p-3 text-secondary"
          aria-label="Default select example"
          name="debtor"
          required
        >
          <option value={""}>Debtor Name</option>
          {debtors.length > 0 ? (
            debtors.map((debtor) => (
              <option key={debtor.id} value={debtor.id}>
                {debtor.fullname}
              </option>
            ))
          ) : (
            <option value={""} disabled>
              No Debtors Available
            </option>
          )}
        </select>
        <div className="invalid-feedback mb-1">Choose a debtor</div>
      </div>

      <div className="form-floating mb-2">
        <input
          type="number"
          className="form-control"
          id="amount"
          placeholder="Amount"
          name="amount"
          required
        />
        <label htmlFor="name">Amount</label>
        <div className="invalid-feedback">Field can not be empty</div>
      </div>
      <div className="form-floating mb-2">
        <input
          type="text"
          className="form-control"
          id="description"
          placeholder="Description"
          name="desc"
          required
        />
        <label htmlFor="name">Description</label>
        <div className="invalid-feedback">Field can not be empty</div>
      </div>
      <div className="gap-3 row">
        {isLoading ? (
          <button
            type="submit"
            className="btn btn-secondary w-75 rounded-3 p-3 mt-2 col"
            disabled
          >
            <div className="spinner-border col" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn-dark w-75 rounded-3 p-3 mt-2 col"
          >
            Add Debt
          </button>
        )}

        <input
          type="reset"
          className="btn btn-outline-danger w-75 rounded-3 p-3 mt-2 col"
          value="Cancel"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
    </form>
  );
};

export default AddDebtForm;
