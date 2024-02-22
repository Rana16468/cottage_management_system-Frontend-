import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider/AuthProvider";

const PrivateRouter = ({ children }) => {
  let location = useLocation();

  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p className="text-3xl text-center text-red-500">Is Loading</p>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRouter;
