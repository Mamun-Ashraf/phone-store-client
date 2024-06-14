import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ErrorPage from "../pages/ErrorPage";
import AllPhones from "../pages/dashboard/AllPhones";
import AddPhone from "../pages/dashboard/AddPhone";
import UpdatePhone from "../pages/dashboard/UpdatePhone";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./privateRoute";
import DashboardHome from "../pages/dashboard/DashboaedHome";
import ViewProfile from "../pages/userProfile/ViewProfile";
import EditProfile from "../pages/dashboard/EditProfile";

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
      {
        path: "view-profile",
        element: (
          <PrivateRoute>
            <ViewProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-profile/:id",
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://phone-store-server-2xjt.onrender.com//user/get/${params.id}`
          ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "add-phone",
        element: <AddPhone />,
      },
      {
        path: "update-phone/:id",
        element: <UpdatePhone />,
        loader: ({ params }) =>
          fetch(`https://phone-store-server-2xjt.onrender.com//${params.id}`),
      },
      {
        path: "all-phones",
        element: <AllPhones />,
      },
    ],
  },
]);
