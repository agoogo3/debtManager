import React, { useContext, useEffect, useRef, useState } from "react";
import AddDebtForm from "./AddDebtForm";
import DataContext from "../context/DataContext";

const AddDebtModal = () => {
  const { errMessage, setErrMessage } = useContext(DataContext);

  // Removing any error message when toggling modals
  const addDebtModal = useRef(null);
  useEffect(() => {
    const modal = addDebtModal.current;
    if (!modal) return;

    const onShow = () => setErrMessage({ message: "", show: false });
    modal.addEventListener("show.bs.modal", onShow);

    return () => modal.removeEventListener("show.bs.modal", onShow);
  }, []);

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="addDebtModal"
      ref={addDebtModal}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h3 className="modal-title">Add New Debt</h3>
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
                  ? "Debt Added successfully!"
                  : errMessage.message}
              </div>
            )}
            <AddDebtForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDebtModal;
