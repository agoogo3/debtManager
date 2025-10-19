import React, { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";
import AddDebtorForm from "./AddDebtorForm";

const AddDebtorModal = () => {
  const { errMessage, setErrMessage } = useContext(DataContext);

  useEffect(() => {
    setErrMessage({ message: "", show: false });
  }, []);

  return (
    <div className="modal fade" tabIndex="-1" id="addDebtorModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h3 className="modal-title">Add New Debtor</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {errMessage.show && (
              <div
                className={`alert ${
                  errMessage.message == "" ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {errMessage.message == ""
                  ? "Debtor Added successfully!"
                  : errMessage.message}
              </div>
            )}
            <AddDebtorForm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDebtorModal;
