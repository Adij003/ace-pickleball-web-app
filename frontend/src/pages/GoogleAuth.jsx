'use client';

import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import googleAuth from "../components/api"; 

const GoogleAuth = () => {
  useEffect(() => {
    const handleGoogleAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          const response = await googleAuth(code);

          if (response?.data?.token) {
            const decodedToken = jwtDecode(response.data.token);
            console.log("User Info:", decodedToken);
            toast.success("Google Authentication Successful");
          } else {
            toast.error("Failed to retrieve authentication token.");
          }
        } catch (error) {
          console.error("Google Auth Error:", error.message);
          toast.error("Google Authentication Failed");
        }
      }
    };

    handleGoogleAuth();
  }, []);

  return <div>Google Auth Successful PickelBall</div>;
};

export default GoogleAuth;
