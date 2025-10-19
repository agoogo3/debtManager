import React, { useEffect } from "react";
import Intersection from "./Intersection";

const Feature = () => {

  useEffect(()=>{
    const featuresDiv = document.querySelectorAll(".features");
    Intersection(featuresDiv,'show');
  },[])

  const features = [
    {
      id: "01",
      img: "track_debtors.png",
      desc: "Create and manage debts for each debtor, with payment history and balance updates",
    },
    {
      id: "02",
      img: "organize.png",
      desc: "No more notebooks or missed payments. Everything in one place, available 24/7.",
    },
    {
      id: "03",
      img: "follow_up.png",
      desc: "Know exactly who needs a reminder, and when. Coming soon: automated SMS alerts.",
    },
  ];
  
  return (
    <div className="container feature-wrapper row row-cols-1 row-cols-md-4 gap-5 justify-content-center">
      {features.map((feature) => (
        <div
          className="col features hidden card bg-danger-subtle"
          key={feature.id}
        >
          <span className="numbering">{feature.id}</span> <br />
          <div className="image_wrapper h-50">
            <img
              className="img-fluid h-100"
              src={`${feature.img}`}
              alt="Track debtors"
            />
          </div>
          <span className="feature_desc">{feature.desc}</span>
        </div>
      ))}
    </div>
  );
};

export default Feature;
