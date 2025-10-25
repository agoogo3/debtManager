import React,{useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';


function Header() {
  const {logout,user} = useContext(DataContext)
  const navigate = useNavigate()
  return (
    <header style={{ zIndex: "5" }}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to={"#"}>
            Finledger
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="navbar-nav ms-auto"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <li
                className="nav-ibtem"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
              >
                <Link className="nav-link active" aria-current="page" to={"#"}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"#"}>
                  Debtors
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"#"}>
                  Debt
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <button
                    className="btn btn-outline-dark rounded-5 "
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-dark rounded-5 "
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header
