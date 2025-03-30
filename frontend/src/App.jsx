import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CourtBooking from "./pages/CourtBooking";
import CheckoutPage from "./pages/CheckoutPage";
import GoogleAuth from "./pages/GoogleAuth";
import Login from "./pages/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import RefreshHandler from "./pages/RefreshHandler";
import NotFound from "./pages/NotFound";
import AboutUsNavbar from "./pages/AboutUsNavbar";
import BookingHistory from "./pages/BookingHistory";
import MembershipDetails from "./pages/MembershipDetails";
import UpcomingDetials from "./pages/UpcomingDetials";
import Gallery from "./pages/Gallery";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFail from "./pages/PaymentFail";
import AdminPage from "./pages/AdminPage";
import ViewAllBookings from "./pages/ViewAllBookings";
import ViewSlots from "./pages/ViewSlots"
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  

  // Load authentication state from localStorage if needed
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    // console.log("Auth Status from LocalStorage:", authStatus);
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Persist login state
    console.log("User authenticated and state updated");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false"); // Clear login state
  };

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 450);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 450);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("Updated isAuthenticated this is from app.jsx:", isAuthenticated);
  }, [isAuthenticated]);

  if (isDesktop) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black text-white text-lg font-bold">
        Please use a phone to view the website or use portrait mode
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div>
        <Router>
          <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
          <div className="container flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={<Login onLoginSuccess={handleLoginSuccess} />}
              />

              <Route path="/booking-details" element={<CourtBooking />} />
              <Route path="/checkout" element={isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" />} />
              <Route
                path="/booking-confirmation"
                element={isAuthenticated ? <PaymentSuccess /> : <Navigate to="/login" />}
              />
              <Route
                path="/booking-failed"
                element={isAuthenticated ? <PaymentFail /> : <Navigate to="/login" />}
              />
              <Route
                path="/admin"
                element={isAuthenticated ? <AdminPage isAuthenticated={isAuthenticated} /> : <Navigate to="/login" />}
              />
               <Route
                path="/all-bookings"
                element={isAuthenticated ? <ViewAllBookings isAuthenticated={isAuthenticated} /> : <Navigate to="/login" />}
              />
               <Route
                path="/change-slots"
                element={isAuthenticated ? <ViewSlots isAuthenticated={isAuthenticated} /> : <Navigate to="/login" />}
              />
             

              

              <Route path="/auth/callback" element={<GoogleAuth />} />
              <Route path="/history" element={<BookingHistory />} />
              <Route path="/membership" element={<MembershipDetails />} />
              <Route path="/events" element={<UpcomingDetials />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about-us" element={<AboutUsNavbar />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;