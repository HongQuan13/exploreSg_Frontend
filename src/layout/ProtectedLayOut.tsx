import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

export const ProtectedLayout = () => {
  const { authUser } = useAuthContext();

  if (!authUser) {
    return <Navigate to="/access/login" />;
  }

  return <Outlet />;
};
