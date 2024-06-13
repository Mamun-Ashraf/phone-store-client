import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import UserProfile from "../pages/dashboard/UserProfile";
import ErrorPage from "../pages/ErrorPage";
import AllPhones from "../pages/dashboard/AllPhones";
import AddPhone from "../pages/dashboard/AddPhone";
import UpdatePhone from "../pages/dashboard/UpdatePhone";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <UserProfile />,
      },
      {
        path: "all-phones",
        element: <AllPhones />,
      },
      {
        path: "add-phone",
        element: <AddPhone />,
      },
      {
        path: "update-phone/:id",
        element: <UpdatePhone />,
      },
    ],
  },
]);
