import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { RouterPath } from "./utils";
import { AppContext } from "src/contexts/AppContext";
export interface IProtectedRoute {
  children: JSX.Element;
}

function ProtectedRoute({ children }: IProtectedRoute) {
  const { isAuthenticated } = useContext(AppContext);

  return isAuthenticated ? children : <Navigate to={RouterPath.Login} replace />;
}

export default ProtectedRoute;
