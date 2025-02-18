
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
import Statistics from "../pages/Dashboard/Common/Statistics";
import ManageScholarships from "../pages/Dashboard/Common/ManageScholarship/ManageScholarship";
import AllAppliedScholarships from "../pages/Dashboard/Common/AllAppliedScholarships/AllAppliedScholarships";
import MyReviews from "../pages/Dashboard/Student/MyReviews/MyReviews";
import AllReviews from "../pages/Dashboard/Common/AllReviews/AllReviews";
import AnalyticsChart from "../pages/Dashboard/Admin/AnalyticsChart/AnalyticsChart";
import AdminRoute from "./AdminRoute";
import CombinedRoute from "./CombinedRoute";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";

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
      { path: "/terms-and-conditions", element: <TermsAndConditions/> },
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

      // user related route 
      { index: true, element: <Statistics/>},
      { path: "profile", element: <Profile /> },
      { path: "payment/:id", element: <Payment/> },
      { path: "applyScholarship/:id", element: <ApplyScholarship/> },
      { path: "my-application", element: <MyApplication/> },
      { path: "edit-my-application/:id", element: <EditMyApplication/> },
      { path: "my-reviews", element: <MyReviews/> },

      
      // admin and moderator related route 
      { path: "add-scholarship", element: <CombinedRoute><AddScholarship /></CombinedRoute> },
      { path: "manage-scholarship", element: <CombinedRoute><ManageScholarships/></CombinedRoute> },
      { path: "all-applied-scholarship", element: <CombinedRoute><AllAppliedScholarships/></CombinedRoute> },
      { path: "all-reviews", element: <CombinedRoute><AllReviews/></CombinedRoute> },
     
      // only admin related route
      { path: "manage-users", element: <AdminRoute><ManageUsers/></AdminRoute> },
      { path: "analytics", element: <AdminRoute><AnalyticsChart/></AdminRoute> },
    ],
  },
  
]);
