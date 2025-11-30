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
  const [userBookings, setUserBookings] = useState([]);

  const addBooking = (event) => {
    if (!currentUser) {
      alert("Please login first to book an event!");
      return;
    }

    const newBooking = {
      id: Date.now(),
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventImage: event.image,
      userId: currentUser.id,
      bookingDate: new Date().toLocaleDateString(),
      status: "Confirmed",
      price: event.price || 0,
    };

    setUserBookings([...userBookings, newBooking]);
    alert(`✅ Successfully booked ${event.title}!`);
  };

  const cancelBooking = (bookingId) => {
    setUserBookings(
      userBookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );
  };

  return (
    <Router>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/events" 
          element={<Events events={events} addBooking={addBooking} currentUser={currentUser} />} 
        />
        <Route 
          path="/my-bookings" 
          element={<MyBookings currentUser={currentUser} bookings={userBookings} cancelBooking={cancelBooking} />} 
        />
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