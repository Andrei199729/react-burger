import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { MAIN_PATH, LOGIN_PATH } from "../../utils/constants";

const Protected = ({ onlyUnauthorized = false, component }) => {
  const { userData } = useSelector((state) => state.user);
  const location = useLocation();

  if (onlyUnauthorized && userData) {
    const { from } = location.state || { from: { pathname: MAIN_PATH } };
    return <Navigate to={from} />;
  }

  if (!onlyUnauthorized && !userData) {
    return <Navigate to={LOGIN_PATH} state={{ from: location }} />;
  }
  return component;
};

export const Authorized = Protected;
export const Unauthorized = ({ component }) => {
  return <Protected onlyUnauthorized={true} component={component} />;
};
