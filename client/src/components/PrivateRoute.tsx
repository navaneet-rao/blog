// src/components/PrivateRoute.tsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { token } = useContext(UserContext);
  console.log("Token in PrivateRoute:", token);
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
