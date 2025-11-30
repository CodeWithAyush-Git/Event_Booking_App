import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Events from "./pages/Events";
import MyBookings from "./pages/MyBookings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ThankYou from "./pages/ThankYou";
import Footer from "./components/Footer";
import { events } from "./data/events";
import "./index.css";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events events={events} addBooking={() => {}} />} />
        <Route path="/my-bookings" element={<MyBookings currentUser={currentUser} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/admin" element={<Admin currentUser={currentUser} />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<h2 className="text-center mt-20 text-red-500 text-3xl">404 Page Not Found</h2>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;