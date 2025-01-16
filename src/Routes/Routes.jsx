
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
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
    ],
  },
  
]);
