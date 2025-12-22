import React, { useState } from "react";
import { events } from "../data/events";

const Booking = ({ currentUser }) => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [userName, setUserName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [message, setMessage] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedEvent || !userName || !email) {
      setMessage("Please fill all fields!");
      return;
    }

    // Here you can push booking to state or API
    console.log("Booking done:", { selectedEvent, userName, email });
    setMessage(`Successfully booked for "${selectedEvent}"!`);
    // Reset form if needed
    setSelectedEvent("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Book Your Event</h2>
        {message && <p className="mb-4 text-center text-green-600 font-medium">{message}</p>}
        <form onSubmit={handleBooking} className="flex flex-col gap-4">
          <label className="font-medium">Select Event</label>
          <select
            className="border p-2 rounded focus:ring-2 focus:ring-purple-400"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            <option value="">-- Choose Event --</option>
            {events.map((ev) => (
              <option key={ev.id} value={ev.title}>
                {ev.title} ({ev.date})
              </option>
            ))}
          </select>

          <label className="font-medium">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="border p-2 rounded focus:ring-2 focus:ring-purple-400"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label className="font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 rounded focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-5 py-2 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 hover:shadow-xl mt-4"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
