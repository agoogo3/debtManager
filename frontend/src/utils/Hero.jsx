import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="row row-cols-1 row-cols-md-2" style={{ height: "480px" }}>
      <div className="col txt-wrapper" style={{ height: "50px", zIndex: "2" }}>
        <p className="headline" data-aos="ease-in-out">
          All your debtors, one powerful tool.
        </p>
        <span className="text-secondary head-desc">
          Easily track who owes you, how much and when. Manage debts and
          payments with clarity and confidence
        </span>
        <br />
        <br />
        <button
          className="btn head-btn bg-light rounded-4 border-danger-subtle"
          onClick={(e) => navigate("/register")}
        >
          Join the creditors
        </button>
      </div>
      <div className="col column-2 position-relative  ">
        <div
          className="bg-danger-subtle position-absolute "
          style={{
            borderRadius: "100%",
            height: "150%",
            width: "150%",
            left: "100%",
            transform: "translateX(-50%)",
            bottom: "10%",
            zIndex: "1",
          }}
        ></div>
        <div className="img-holder d-none d-md-inline">
          <img src="phone.png" alt="Hero" className="img-fluid head-img" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
