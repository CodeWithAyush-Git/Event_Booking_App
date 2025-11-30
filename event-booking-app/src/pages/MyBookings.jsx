import React from "react";

const MyBookings = ({ currentUser, bookings = [], cancelBooking }) => {
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Please Login
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to login to see your bookings
          </p>
          <a
            href="/login"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // Get user's bookings
  const userBookings = bookings.filter(b => b.userId === currentUser.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            My Bookings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {currentUser.name}! 👋
          </p>
        </div>

        {/* Bookings Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Bookings</p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {userBookings.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Confirmed</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {userBookings.filter(b => b.status === "Confirmed").length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Cancelled</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {userBookings.filter(b => b.status === "Cancelled").length}
            </p>
          </div>
        </div>

        {/* Bookings List */}
        {userBookings.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              You haven't booked any events yet 😔
            </p>
            <a
              href="/events"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Explore Events
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {userBookings.map((booking) => (
              <div
                key={booking.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition ${
                  booking.status === "Cancelled" ? "opacity-60" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                    <div className="md:w-1/4 h-48 md:h-auto overflow-hidden">
                    <img
                      src={booking.eventImage}
                      alt={booking.eventTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                    <div className="flex-1 p-4 md:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                          {booking.eventTitle}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          📅 {booking.eventDate}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full font-semibold text-sm ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    {/* Booking Details */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div>
                        <p className="font-semibold">Booking Date</p>
                        <p>{booking.bookingDate}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Price</p>
                        <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                          ₹{booking.price}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Booking ID</p>
                        <p className="text-xs">{booking.id}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    {booking.status === "Confirmed" && (
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to cancel this booking? This cannot be undone."
                            )
                          ) {
                            cancelBooking(booking.id);
                            alert("Booking cancelled successfully!");
                          }
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
