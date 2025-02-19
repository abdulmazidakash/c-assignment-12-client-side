import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../../components/SocialLogin";
import { imageUpload, saveUser } from "../../utilities/utilities";
import { BsFileEarmarkImageFill } from "react-icons/bs";
import { ThemeContext } from "../../context/ThemeContext";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    // const formData = new FormData()
    // formData.append('image', image)

    const photoURL = await imageUpload(image)

    console.table({ name, email, password, image });


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long."
      );
      return;
    }
  

  
  try {
    //2. User Registration
    const result = await createUser(email, password)
    // console.log(result)

    //3. Save username & profile photo
    const updateUser = await updateUserProfile( name, photoURL)
    console.log('update user profile', updateUser);

    //save the user info in db if the user in new
    navigate('/')
   await saveUser({...result?.user, displayName: name, photoURL})
    toast.success(`SignUp Successful ${name}`)
  } catch (err) {
    console.log(err)
    toast.error(err?.message)
  }
}


  return (
    <div className="flex items-center justify-center bg-gradient-to-tr from-slate-950  via-cyan-950 to-rose-800 text-white rounded-lg p-6 container mx-auto my-8">
      <div className="bg-white/10 backdrop-blur-sm p-10 rounded-lg shadow-lg text-white w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block mb-2">Enter your name</label>
            <div className="flex items-center bg-white/20 p-2 rounded">
              <FaUser className="mr-2 text-teal-400" />
              <input
                type="text"
                placeholder="Your name"
                name="name"
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Enter your photoURL</label>
            <div className="flex items-center bg-white/20 p-2 rounded">
              <BsFileEarmarkImageFill className="mr-2 text-purple-400" />
              <input
              required
              type='file'
              id='image'
              name='image'
              accept='image/*'
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Enter your email</label>
            <div className="flex items-center bg-white/20 p-2 rounded">
              <FaEnvelope className="mr-2 text-blue-400" />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Enter your password</label>
            <div className="flex items-center bg-white/20 p-2 rounded">
              <FaLock className="mr-2 text-red-400" />
              <input
                type="password"
                name="password"
                placeholder="Your password"
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
          </div>
          <button 
          className={`bg-gradient-to-tr ${darkMode ? 'from-sky-700 to-slate-800' : 'from-sky-900 to-slate-800'} text-white font-semibold btn w-full mb-4 border-none`}
          // className="btn btn-accent w-full mb-4"
          >Register</button>
        </form>

        {/* social login component */}
        <SocialLogin></SocialLogin>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-300">
            Log In
          </Link>
        </p>
        <div className="mt-6">
          <marquee className="text-sm">
            Welcome to our Registration Page! Let's get started.
          </marquee>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;