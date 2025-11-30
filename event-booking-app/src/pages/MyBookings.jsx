import React, { useState, useEffect } from "react";
import { bookings as allBookings } from "../data/bookings";

const MyBookings = ({ currentUser }) => {
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setUserBookings(allBookings.filter(b => b.userId === currentUser.id));
    }
  }, [currentUser]);

  const cancelBooking = (id) => {
    setUserBookings(
      userBookings.map(b => (b.id === id ? { ...b, status: "Cancelled" } : b))
    );
  };

  if (!currentUser) {
    return <p className="p-8">Please login to see your bookings.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {userBookings.length === 0 ? (
        <p className="text-gray-700">You have no bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Event</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {userBookings.map(b => (
                <tr key={b.id} className="text-center">
                  <td className="border px-4 py-2">{b.event}</td>
                  <td className="border px-4 py-2">{b.date}</td>
                  <td className={`border px-4 py-2 font-semibold ${b.status === "Cancelled" ? "text-red-500" : "text-green-500"}`}>
                    {b.status}
                  </td>
                  <td className="border px-4 py-2">
                    {b.status !== "Cancelled" && (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        onClick={() => cancelBooking(b.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
