import React from "react";

import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const child = props.child;
  const isLoggedIn = sessionStorage.getItem("token") ? true : false;

  if (isLoggedIn) {
    return child;
  }
  return <Navigate replace={true} to="/login" />;
};

export default PrivateRoute;
