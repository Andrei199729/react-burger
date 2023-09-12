import React, { FC } from "react";
import { Navigate, RouteProps, useLocation } from "react-router-dom";

import { MAIN_PATH, LOGIN_PATH } from "../../utils/constants";
import { useSelector } from "../../services/hooks";

type IProtected = {
  onlyUnauthorized: boolean;
  component: any;
} & RouteProps;

const Protected: FC<IProtected> = ({ onlyUnauthorized = false, component }) => {
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

export const Authorized: any = Protected;

export const Unauthorized = ({ component }: any) => {
  return <Protected onlyUnauthorized={true} component={component} />;
};
