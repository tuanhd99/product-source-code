import React, { Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LoadingArea from "src/common/loading/LoadingArea";
import LoginLayout from "src/layouts/LoginLayout/LoginLayout";
import { RouterPath } from "./utils";

const Login = React.lazy(() => import("src/pages/Login"));
const Register = React.lazy(() => import("src/pages/Register"));

export default function useRounteElement() {
  const routeElement = useRoutes([
    {
      path: RouterPath.Index,
      element: <Navigate to={RouterPath.Login} replace />
    },
    {
      path: RouterPath.Login,
      element: <LoginLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingArea />}>
              <Login />
            </Suspense>
          )
        }
      ]
    },
    {
      path: RouterPath.Register,
      element: <LoginLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingArea />}>
              <Register />
            </Suspense>
          )
        }
      ]
    }
  ]);
  return routeElement;
}
