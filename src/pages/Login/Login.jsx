import React, { useContext, useRef } from "react";
import toast  from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa";

import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../../components/SocialLogin";

const Login = () => {

  const { signInUser, forgetPasswordUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();
  const from = location?.state || '/';
  // console.log(location);


const handleSignInUser = e =>{
  e.preventDefault();

  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;

  console.table({email, password});

  //firebase signIn
  signInUser(email, password)
  .then(result =>{
    // console.log(result);
    console.log('sign in', result?.user?.email);

    toast.success(`Login Successful ${result?.user?.email}`)
    navigate(from);
  })
  .catch(err =>{
    toast.error(`please use valid email and password. ${err?.message}`)
    // console.log(err.message)
  })
 

};

const handleForgetPassword = () => {
  const email = emailRef.current?.value;
  // console.log(email);

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



  return (
    <div
      className="p-6 flex items-center justify-center bg-gradient-to-tr from-teal-800 via-slate-800 to-cyan-800 rounded-lg  container mx-auto my-8"
    >
      <div className="bg-white/10 backdrop-blur-sm p-10 rounded-lg shadow-lg text-white w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Login Form</h2>
        <form onSubmit={handleSignInUser}>
          <div className="mb-4">
            <label className="block mb-2">Enter your email</label>
            <div className="flex items-center bg-white/20 p-2 rounded">
              <FaUser className="mr-2" />
              <input
                type="email"
                name="email"
                ref={emailRef}
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
            <label >
            <a onClick={handleForgetPassword}  className="text-sm text-blue-300 hover:underline cursor-pointer">
              Forgot password?
            </a>
            </label>
          </div>
          <button className="btn btn-info w-full mb-4">Log In</button>
        </form>

          {/* social login component  */}
          <SocialLogin></SocialLogin>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to='/register'>
		  <button className="text-blue-300">
            Register
          </button>
		  </Link>
        </p>
        <div className="mt-6">
          <marquee className="text-sm">Welcome to our Login Page!</marquee>
        </div>
        <div className="mt-4 text-center">
          <span className="text-xl font-semibold">
            <span className="typewriter">
              Type your credentials to log in.
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;