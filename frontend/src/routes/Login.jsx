import React, { useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";

const Login = () => {
  const { handleLogin, errMessage, isLoading,setErrMessage } = useContext(DataContext);
  useEffect(() => {
    setErrMessage({ message: "", show: false });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    let forms = document.querySelectorAll(".validation");
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
    handleLogin(e);
  };
  return (
    <div className="middle position-relative">
      <div className="container pic_head" style={{ width: "200px" }}>
        <img className="img-fluid " src="pic_head.png" alt="" />
      </div>
      <h1 className="heading" style={{ marginTop: "90px" }}>
        Welcome Back! <br />
        Your Finance
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
                ? "Log in successful!"
                : errMessage.message}
            </div>
          )}
          <form className="form validation" noValidate onSubmit={handleSubmit}>
            <div className="form-floating mb-2">
              <input
                type="text"
                className={`form-control`}
                id="username"
                placeholder="Username"
                name="username"
                required
              />
              <label htmlFor="username">Username</label>
              <div className="invalid-feedback">Field can not be empty</div>
            </div>
            <div className="form-floating mb-2">
              <input
                type="password"
                className={`form-control`}
                id="password"
                placeholder="Password"
                name="password"
                required
              />
              <label htmlFor="password">Password</label>
              <div className="invalid-feedback">Field can not be empty</div>
            </div>
            <Link to={"/register"}>Forgot Password?</Link>
            <br />
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <input
                type="submit"
                className="btn btn-dark w-75 rounded-3 p-3 mt-2"
                value="Log In"
              />
            )}
            <br />
            <br />
            <Link to={"/register"}>Don't have an account? Sign up</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
