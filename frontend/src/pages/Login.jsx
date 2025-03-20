import React from "react";
import AceHeading from "../components/AceHeading";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBack } from "react-icons/io5";
import pickleball from "../assets/pickleball-ball-img.jpg"
import background from "../assets/background.webp"
import { Link, useNavigate  } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: `url(${background})` }}
> 
   {/* Back Button */}
   <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md"
      >
      <IoArrowBack />  
        <span>Back</span>
      </button>
      <div className="flex-col">

      {/* <div className="mb-20">Back</div> */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 border-amber-300 border-8 relative">
        <div className="flex justify-between">
            <div className="mt-4">
            <h2 className="text-2xl font-bold text-gray-900">Login</h2>
            <h3 className=" font-bold text-gray-900">To Ace Pickleball Club</h3>
            </div>
            <div>
                <img src={pickleball} className="h-20 rounded-3xl mb-4" alt="pickleball image" />
            </div>
        </div>

        {/* <img src={background} alt="" /> */}
       
        <div className="my-4 pb-4" >
            
        <AceHeading /> 
        </div>
        
        <button className="w-full bg-white text-white py-2 rounded-lg flex justify-center font-semibold shadow-md ">
            <div className="text-black">
              <Link to='/booking-details'>
            Sign In with Google
              </Link>
            </div>
            <div className="mx-1 mt-1">

            <FcGoogle className="text-xl " />
            </div>
             </button>
        
        <p className="text-gray-500 text-center text-sm mt-4">
          Welcome to <span className="text-yellow-500 font-semibold hover:underline">Bhopal's best</span> Pickleball Club 
        </p>
      </div>
      </div>

    </div>
    
  );
};

export default Login;
