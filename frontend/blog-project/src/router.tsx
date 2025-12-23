import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./core/components/layouts/MainLayout";
import RegisterForm from './core/components/users/RegisterForm';
import LoginForm from "./core/components/users/LoginForm";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: <LoginForm onClose={() => console.log("Close")} />
      },
      {
        path: "/register",
        element: <RegisterForm />
      }
    ],
  },
]);

export default router;