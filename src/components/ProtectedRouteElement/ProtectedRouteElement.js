import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ elementRouteAuth = false, component }) => {
  const { isAuthloggedIn, userData } = useSelector((state) => state.user);
  const location = useLocation();

  // if (!isAuthloggedIn) {
  //   return null;
  // }

  if (elementRouteAuth && userData) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!elementRouteAuth && !userData) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return component;
};

export const ProtectedRoute = Protected;
export const ProtectedRouteElement = ({ component }) => {
  <Protected elementRouteAuth={true} component={component} />;
};
