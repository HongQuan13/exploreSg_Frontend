import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

interface IProps {
  fallbackRoute: string;
}

export const NonProtectedLayout = ({ fallbackRoute }: IProps) => {
  const { authUser } = useAuthContext();

  if (authUser) {
    return <Navigate to={fallbackRoute} />;
  }

  return <Outlet />;
};
