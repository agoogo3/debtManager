import React,  { Fragment, useEffect } from "react";
import Intersection from "./Intersection";

const HowItWorks = () => {
  const data=[
    {
      head:'Connect Your debtors',
      desc:'Add debtor profiles in seconds - name, contact info and initial debts',
      img:'debtor_con.png'
    },
    {
      head:'Log debts and payments',
      desc:'Record amount, track repayments and let system calculate balances for you',
      img:'log_debts.png'
    },
    {
      head:'See the full picture',
      desc:'View a clean summary of all your debtors, amounts owed and total received',
      img:'full_picture.png'
    },
  ]
  useEffect(() => {
    const textWrapper = document.querySelectorAll(".text_wrapper");
    const imageWrapper = document.querySelectorAll(".img_wrapper");
    Intersection(textWrapper, "show");
    Intersection(imageWrapper, "show");
  }, []);
  return (
    <div className="container work-wrapper  bg-success-subtle card mt-5 d-flex flex-column align-items-center p-4">
      <span className="how-intro ">How Finledger works</span>
      
      <div className="container row row-cols-1 row-cols-md-3 justify-content-center gap-4">
        {data.map((info, index) => (
          <Fragment key={index} >
            <div className="text_wrapper hidden position-relative">
              <span className="info_head">{info.head}</span><br />
              <span className="info_desc">{info.desc}</span>
            </div>
            <div className="img_wrapper hidden-right" >
              <img className="img-fluid" src={`${info.img}`} alt="image" />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
