import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage"; // ✅ Correct casing
import MessagePage from "../components1/MessagePage"; // ✅ Correct casing
import AuthLayout from "@/layout/AuthLayout";
// Define routes
import ForgotPassword from "@/pages/ForgotPassword";
const router = createBrowserRouter([
  

  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "register",
        element: <AuthLayout><RegisterPage /></AuthLayout>,
      },
      {
        path: "email",
        element: <AuthLayout><CheckEmailPage /></AuthLayout>,
      },
      {
        path: "password",
        element: <AuthLayout><CheckPasswordPage /></AuthLayout>,
      },
      {
        path:"forgot-password",
        element:<AuthLayout><ForgotPassword></ForgotPassword></AuthLayout>
      },
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            path: ":userId",
            element: <MessagePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
