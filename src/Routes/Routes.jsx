import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../Layout/DashboardLayout";
import AddScholarship from "../pages/Dashboard/Common/AddScholarship";
import Profile from "../pages/Dashboard/Common/Profile";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage/>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        }, 
        {
          path: 'login',
          element: <Login></Login>,
        },
        {
          path: 'register',
          element: <Register></Register>,
        }
      
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout/>,
      children: [
        {
          path: 'add-scholarship',
          element: <AddScholarship/>,
        },
        {
          path: 'profile',
          element: <Profile/>,
        },
      ]
    }
  ]);