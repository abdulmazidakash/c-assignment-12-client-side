import React, { useContext } from 'react';
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';


const SocialLogin = () => {

	const navigate = useNavigate();
	const location = useLocation();
	console.log(location);

	const {googleSignIn} = useContext(AuthContext);
	const from = location?.state || '/';

	const handleGoogleLogin = () => {
		// গুগল লগইন ফাংশনালিটি এখানে যুক্ত করতে হবে
	
		googleSignIn()
		  .then(res =>{
			console.log(res?.user);
			toast.success(`Google login successful! ${res?.user?.displayName}`);
			navigate(from);
		  })
		  .catch(err =>{
			console.log(err.message);
			toast.error(`please use valid email. ${err?.message}`)
		  })
	
	  };
	return (
		<div>
			<button
				onClick={handleGoogleLogin}
				className="flex items-center justify-center bg-white text-black rounded p-2 w-full font-semibold hover:bg-gray-200 transition"
			>
				<FcGoogle className="mr-2 text-xl" />
				Sign in with Google
			</button>
		</div>
	);
};

export default SocialLogin;