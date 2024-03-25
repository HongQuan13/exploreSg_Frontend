import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

interface IProps {
  fallbackRoute: string;
}

export const NonProtectedLayout = ({ fallbackRoute }: IProps) => {
  const { authUser } = useAuthContext();
  console.log(authUser, "authUser");

  if (authUser) {
    return <Navigate to={fallbackRoute} />;
  }

  return <Outlet />;
};
