import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import DataContext from "../context/DataContext";

const ProtectedRoute = () => {
  const { user } = useContext(DataContext);

  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
