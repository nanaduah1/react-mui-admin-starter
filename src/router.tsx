import { createBrowserRouter } from "react-router-dom";
import {
  ForgotPasswordPage,
  LoginPage,
  SetPasswordPage,
} from "./authentication/pages";
import Dashboard from "./admin";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/set-password", element: <SetPasswordPage /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

export default router;
