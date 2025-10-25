import React, { useContext, useEffect, useRef } from "react";
import DataContext from "../context/DataContext";
import AddDebtorForm from "./AddDebtorForm";

const AddDebtorModal = () => {
  const { errMessage, setErrMessage } = useContext(DataContext);

  // Removing any error message when toggling modals
  const addDebtorModal = useRef("");
  useEffect(() => {
    const modal = addDebtorModal.current;
    if (!modal) return;
    const onShow = () => setErrMessage({ message: "", show: false });
    modal.addEventListener("show.bs.modal", onShow);
    return () => modal.removeEventListener("show.bs.modal", onShow);
  }, []);

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="addDebtorModal"
      ref={addDebtorModal}
    >
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
            <AddDebtorForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDebtorModal;
