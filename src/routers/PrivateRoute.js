import React from "react";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Redirect to="/auth/login" />;
};

export default PrivateRoute;
