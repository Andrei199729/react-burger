import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ onlyUnauthorized = false, component }) => {
  const { isAuthloggedIn, userData } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isAuthloggedIn) {
    return null;
  }

  if (onlyUnauthorized && userData) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnauthorized && !userData) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return component;
};

export const Authorized = Protected;
export const Unauthorized = ({ component }) => {
  return <Protected onlyUnauthorized={true} component={component} />;
};
