import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = (props) => {
  const state = useSelector((state) => state.auth);
  return state.token !==null ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
