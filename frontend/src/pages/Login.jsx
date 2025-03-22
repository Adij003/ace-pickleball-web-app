import React from "react";
import AceHeading from "../components/AceHeading";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBack } from "react-icons/io5";
import pickleball from "../assets/pickleball-ball-img.jpg";
import background from "../assets/background.webp";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleAuth from "../components/api";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      console.log("Google Auth Result: ", authResult);
      if (authResult["code"]) {
        const result = await GoogleAuth(authResult.code);
        console.log("Google Auth Success:", result);
        const { user } = result;
        const { email, name, picture } = user;
        const token = result.token;
        const obj = { email, name, token, picture };
  
        localStorage.setItem("user-info", JSON.stringify(obj));
  
        // Trigger the onLoginSuccess callback here
        onLoginSuccess();
        console.log("Login success, triggering onLoginSuccess");

        navigate("/", { state: { successMessage: "Login successful!" } });
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md"
      >
        <IoArrowBack />
        <span>Back</span>
      </button>
      <div className="flex-col">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96 border-amber-300 border-8 relative">
          <div className="flex justify-between">
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-gray-900">Login</h2>
              <h3 className="font-bold text-gray-900">To Ace Pickleball Club</h3>
            </div>
            <div>
              <img
                src={pickleball}
                className="h-20 rounded-3xl mb-4"
                alt="pickleball image"
              />
            </div>
          </div>

          <div className="my-4 pb-4">
            <AceHeading />
          </div>

          <button
            onClick={googleLogin}
            className="w-full bg-white text-white py-2 rounded-lg flex justify-center font-semibold shadow-md"
          >
            <div className="text-black">Sign In with Google</div>
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
