import axios from "axios";

export default async function googleAuth(code) {
  try {
    const response = await axios.post(
      'http://localhost:5001/api/auth/google',
      { code },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error in Google Auth API:", error);
    throw error;
  }
};
