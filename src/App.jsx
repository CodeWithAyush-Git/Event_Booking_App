import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Events from "./pages/Events";
import MyBookings from "./pages/MyBookings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ThankYou from "./pages/ThankYou";
import Footer from "./components/Footer";
import { events } from "./data/events";
import { sendEmail } from "./utils/email";
import "./index.css";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userBookings, setUserBookings] = useState(() => {
    try {
      const raw = localStorage.getItem("event_app_bookings");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

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

    setUserBookings(prev => {
      const next = [...prev, newBooking];
      try { localStorage.setItem("event_app_bookings", JSON.stringify(next)); } catch (e) {}
      return next;
    });
    alert(`✅ Successfully booked ${event.title}!`);
    // send confirmation email (stub)
    if (currentUser && currentUser.email) {
      sendEmail(
        currentUser.email,
        `Booking Confirmed: ${event.title}`,
        `Hi ${currentUser.name},\n\nYour booking for ${event.title} on ${event.date} is confirmed. Booking ID: ${newBooking.id}`
      ).catch((e) => console.error("Email send failed", e));
    }
  };

  const cancelBooking = (bookingId) => {
    setUserBookings(prev => {
      const next = prev.map(booking =>
        booking.id === bookingId ? { ...booking, status: "Cancelled" } : booking
      );
      try { localStorage.setItem("event_app_bookings", JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };

  // keep localStorage in sync if userBookings changed elsewhere
  useEffect(() => {
    try { localStorage.setItem("event_app_bookings", JSON.stringify(userBookings)); } catch (e) {}
  }, [userBookings]);

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
        <Route 
          path="/profile" 
          element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} 
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