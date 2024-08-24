import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

const RequireAuth = () => {
  const { auth } = useContext(AuthContext);

  // Redirect to login if not authenticated
  return auth?.accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
