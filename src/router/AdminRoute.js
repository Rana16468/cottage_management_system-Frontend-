import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider/AuthProvider";
import useAdmin from "../components/hook/useAdmin";

const AdminRoute = ({ children }) => {
  let location = useLocation();

  const { user, loading } = useContext(AuthContext);

  const [isAdmin] = useAdmin(user?.email);

  if (loading) {
    return <p className="text-3xl text-center text-red-500">Is Loading</p>;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
