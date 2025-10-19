import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Register = () => {
  const {
    handleCreateAccount,
    passwordError,
    con_passwordError,
    usernameError,
    isLoading,
    errMessage,
    setErrMessage,
  } = useContext(DataContext);
  useEffect(() => {
    setErrMessage({ message: "", show: false });
  }, []);

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
    handleCreateAccount(e);
  };
  return (
    <div className="middle position-relative">
      <div className="container pic_head" style={{ width: "200px" }}>
        <img className="img-fluid " src="pic_head.png" alt="" />
      </div>
      <h1 className="heading" style={{ marginTop: "90px" }}>
        Take Control of Your Finances
      </h1>

      <div className="card form-card shadow-lg mx-auto">
        <div className="card-body">
          {errMessage.show && (
            <div
              className={`alert ${
                errMessage.message == "" ? "alert-success" : "alert-danger"
              }`}
              role="alert"
            >
              {errMessage.message == ""
                ? "Account created successfully!"
                : errMessage.message}
            </div>
          )}
          <form
            className="form needs-validation"
            noValidate
            onSubmit={handleSubmit}
          >
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
              <div className="invalid-feedback">
                Name can only contain letters
              </div>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className={`form-control ${usernameError ? "is-invalid" : ""}`}
                id="username"
                placeholder="Username"
                name="username"
                minLength={4}
                required
              />
              <label htmlFor="username">Username</label>
              <div className="invalid-feedback">Invalid username</div>
            </div>
            <div className="form-floating mb-2">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                name="email"
                required
              />
              <label htmlFor="email">Email</label>
              <div className="invalid-feedback">Please enter a valid email</div>
            </div>
            <div className="form-floating mb-2">
              <input
                type="password"
                className={`form-control ${passwordError ? "is-invalid" : ""}`}
                id="password"
                placeholder="Password"
                name="password"
                required
              />
              <label htmlFor="password">Password</label>
              <div className="invalid-feedback">
                Password must be at least 8 characters long, include an
                uppercase and a number
              </div>
            </div>
            <div className="form-floating mb-2">
              <input
                type="password"
                className={`form-control ${
                  con_passwordError ? "is-invalid" : ""
                }`}
                id="confirm_password"
                placeholder="confirm_Password"
                name="con_password"
                required
              />
              <label htmlFor="confirm_password">Confirm Password</label>
              <div className="invalid-feedback">Passwords do not much</div>
            </div>
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <input
                type="submit"
                className="btn btn-dark w-75 rounded-3 p-3 mt-2"
                value="Create Account"
              />
            )}
            <br />
            <br />
            <Link className="text-danger" to={"/login"}>
              Already have an account? Log in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
