
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../Layout/DashboardLayout";
import AddScholarship from "../pages/Dashboard/Common/AddScholarship";
import Profile from "../pages/Dashboard/Common/Profile";
import PrivateRoute from "./PrivateRoute";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import Payment from "../pages/Payment/Payment";
import ApplyScholarship from "../pages/Dashboard/Student/ApplyScholarship/ApplyScholarship";
import AllScholarship from "../pages/AllScholarship/AllScholarship";
import MyApplication from "../pages/Dashboard/Student/MyApplication/MyApplication";
import EditMyApplication from "../pages/Dashboard/Student/EditMyApplication/EditMyApplication";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/allScholarship", element: <AllScholarship/> },
      { path: "/scholarships/:id", element: ( <PrivateRoute><ScholarshipDetails /></PrivateRoute>),},
    ],
  },

  // dashboard related routes 
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "add-scholarship", element: <AddScholarship /> },
      { path: "profile", element: <Profile /> },
      { path: "payment/:id", element: <Payment/> },
      { path: "applyScholarship/:id", element: <ApplyScholarship/> },
      { path: "my-application", element: <MyApplication/> },
      { path: "edit-my-application/:id", element: <EditMyApplication/> },
      { path: "manage-users", element: <ManageUsers/> },
    ],
  },
  
]);
