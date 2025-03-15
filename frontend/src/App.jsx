import Footer from "./components/Footer"
import AboutUs from "./pages/AboutUs"
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {


  return (
    <>
      <Router>
        <div className="container flex-col">
          <Routes>
            <Route path='/' element={<Home />} />

          </Routes>
        </div>
        <Footer />

      </Router>
    </>
  )
}

export default App
