import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/contexts/AppContext";
import { RouterPath } from "./utils";

export interface IRestrictRoute {
  children: JSX.Element;
}
function RestrictRoute({ children }: IRestrictRoute) {
  const { isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(RouterPath.Index);
    }
  }, [isAuthenticated, navigate]);
  return <>{children}</>;
}

export default RestrictRoute;
