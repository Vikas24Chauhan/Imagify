import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuyCredit from "./pages/BuyCredit";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AppContext } from "./context/AppContext";

function App() {
  const { showLogin } = useContext(AppContext);
  return (
    <div className="px-2 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-100 to-orange-100">
      <BrowserRouter>
        <Navbar />
        {showLogin && <Login />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy-credit" element={<BuyCredit />} />
          <Route path="/result" element={<Result />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
