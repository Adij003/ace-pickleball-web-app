import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CourtBooking from "./pages/CourtBooking";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 450);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 450);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isDesktop) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black text-white text-lg font-bold">
        Please use a phone to view the website or use potrait mode
      </div>
    );
  }

  return (
    <Router>
      <div className="container flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking-details" element={<CourtBooking />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
