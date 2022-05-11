import React from "react";
import { Redirect } from "react-router-dom";

const PublicRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? <Redirect to="/" /> : children;
};

export default PublicRoute;
