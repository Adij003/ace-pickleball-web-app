import axios from "axios";

export default async function googleAuth(code) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  try {
    const response = await axios.post(
      `${BASE_URL}/auth/google`,
      { code },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error in Google Auth API:", error);
    throw error;
  }
};
