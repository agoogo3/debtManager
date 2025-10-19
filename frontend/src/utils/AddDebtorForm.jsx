import React,{useContext} from "react";
import DataContext from "../context/DataContext";

const AddDebtorForm = () => {
  const {isLoading,handleAddDebtor} = useContext(DataContext)
   const handleSubmit = (e) => {
     e.preventDefault()
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
     handleAddDebtor(e)
     
   };
  return (
    <form className="form needs-validation" noValidate onSubmit={handleSubmit}>
      <div className="form-floating mb-2">
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Name"
          name="name"
          pattern="^[A-Za-z\s]+$"
          required
        />
        <label htmlFor="name">Fullname</label>
        <div className="invalid-feedback">Name can only contain letters</div>
      </div>
      <div className="form-floating mb-2">
        <input
          type="text"
          className="form-control"
          id="phone"
          placeholder="Phone"
          name="phone"
          maxLength={10}
          minLength={10}
          pattern="^0[0-9]+$"
          required
        />
        <label htmlFor="name">Phone Number (10)</label>
        <div className="invalid-feedback">Invalid phone number</div>
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
            Add Debtor
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

export default AddDebtorForm;
