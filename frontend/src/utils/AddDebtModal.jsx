import React,{useContext,useEffect} from "react";
import AddDebtForm from "./AddDebtForm";
import DataContext from "../context/DataContext";


const AddDebtModal = () => {
  const {errMessage,setErrMessage} = useContext(DataContext)

   useEffect(() => {
      setErrMessage({ message: "", show: false });
    }, []);

  return (
    <div className="modal fade" tabIndex="-1" id="addDebtModal">
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
