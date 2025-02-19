import React, { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../../components/SocialLogin";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../context/ThemeContext";

const Login = () => {
  const { signInUser, forgetPasswordUser, loading, user, setLoading } = useContext(AuthContext);
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const { darkMode } = useContext(ThemeContext);

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  const handleSignInUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        toast.success(`Login Successful as ${result?.user?.email}`);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(`Invalid credentials: ${err?.message}`);
        setLoading(false);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current?.value;
    if (!email) {
      toast.error("Please provide a valid email address.");
      return;
    }
    forgetPasswordUser(email)
      .then(() => {
        toast.success("Reset email sent. Please check your inbox.");
      })
      .catch((err) => {
        toast.error(`Failed to send reset email: ${err.message}`);
      });
  };

  const handleRoleSelect = (role) => {
    const roleCredentials = {
      admin: { email: "admin@gmail.com", password: "Pas$word1" },
      moderator: { email: "moderator@gmail.com", password: "Pas$word1" },
      student: { email: "student@gmail.com", password: "Pas$word1" },
    };
    setCredentials(roleCredentials[role]);
  };

  return (
    <>
      <Helmet>
        <title>Login | ScholarshipHub</title>
      </Helmet>
      <div className="p-6 flex items-center justify-center bg-gradient-to-tr from-teal-800 via-slate-800 to-cyan-800 rounded-lg container mx-auto my-8">
        <div className="bg-white/10 backdrop-blur-sm p-10 rounded-lg shadow-lg text-white max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-6">Login Form</h2>

          {/* Role Selection Dropdown */}
          <div className="mb-4">
            <label className="block mb-2">Select Role</label>
            <select
              className="w-full p-2 rounded transition-colors duration-300
                        bg-white text-black dark:bg-gray-800 dark:text-white 
                        border border-gray-300 dark:border-gray-600 outline-none"
              onChange={(e) => handleRoleSelect(e.target.value)}
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="student">Student</option>
            </select>
          </div>


          <form onSubmit={handleSignInUser}>
            <div className="mb-4">
              <label className="block mb-2">Enter your email</label>
              <div className="flex items-center bg-white/20 p-2 rounded">
                <FaUser className="mr-2" />
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="Your email"
                  className="bg-transparent outline-none w-full text-white"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Enter your password</label>
              <div className="flex items-center bg-white/20 p-2 rounded">
                <FaLock className="mr-2" />
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Your password"
                  className="bg-transparent outline-none w-full text-white"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a onClick={handleForgetPassword} className="text-sm text-blue-300 hover:underline cursor-pointer">
                Forgot password?
              </a>
            </div>
            
            <button 
            className={`bg-gradient-to-tr ${darkMode ? 'from-sky-700 to-slate-800' : 'from-sky-900 to-slate-800'} text-white font-semibold btn w-full mb-4 border-none`}
            // className="btn btn-info w-full mb-4"
            >Log In
            </button>
          </form>

          {/* Social Login */}
          <SocialLogin />

          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/register">
              <button className="text-blue-300">Register</button>
            </Link>
          </p>
          <div className="mt-6">
            <marquee className="text-sm">Welcome to our Login Page!</marquee>
          </div>
          <div className="mt-4 text-center">
            <span className="text-xl font-semibold">
              <span className="typewriter">Type your credentials to log in.</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
