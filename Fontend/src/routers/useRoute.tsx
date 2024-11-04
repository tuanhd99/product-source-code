import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import LoadingArea from "src/common/loading/LoadingArea";
import LoginLayout from "src/layouts/LoginLayout/LoginLayout";
import ProtectedRoute from "./ProtectedRoute";
import { RouterPath } from "./utils";
import RestrictRoute from "./RestrictRoute";

const Login = React.lazy(() => import("src/pages/Login"));
const Register = React.lazy(() => import("src/pages/Register"));
const Home = React.lazy(() => import("src/pages/Home"));

export default function useRounteElement() {
  const routeElement = useRoutes([
    {
      path: RouterPath.Index,
      // element: <LoginLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingArea />}>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </Suspense>
          )
        }
      ]
    },
    {
      path: RouterPath.Login,
      element: <LoginLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingArea />}>
              <RestrictRoute>
                <Login />
              </RestrictRoute>
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
              <RestrictRoute>
                <Register />
              </RestrictRoute>
            </Suspense>
          )
        }
      ]
    }
  ]);
  return routeElement;
}
