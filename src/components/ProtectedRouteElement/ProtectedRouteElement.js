import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRouteElement = ({ element }) => {
  const { loggedIn } = useSelector((state) => state.user);
  return loggedIn ? element : <Navigate to="/login" replace />;
};
