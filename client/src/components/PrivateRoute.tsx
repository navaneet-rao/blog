// 
// src/components/PrivateRoute.tsx
// This component is a wrapper around the Route component from React Router.
// It checks if the user is authenticated and redirects to the login page if not.
// If the user is authenticated, it renders the children components.
//

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { token } = useContext(UserContext);
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
