import React from "react";
import { Link } from "react-router-dom";
const Not_found = () => {
  return (
    <div className="middle">
      <h1 className="display-1">404 Not found</h1>
      <Link to={'/'}>Go to Homepage</Link>
    </div>
  );
};

export default Not_found;
