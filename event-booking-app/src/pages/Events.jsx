import React from "react";

const Events = ({ events, addBooking }) => {
  // Defensive check: ensure events is an array
  if (!Array.isArray(events) || events.length === 0) {
    return (
      <div className="min-h-screen p-10 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <h1 className="text-4xl font-bold text-center text-purple-700 dark:text-purple-300 mb-10">
          Upcoming Events
        </h1>
        <div className="text-center text-gray-600 dark:text-gray-400 py-20">
          <p className="text-xl">No events available</p>
        </div>
      </div>
    );
  }

  const handleBooking = (event) => {
    addBooking(event);
    alert(`✅ ${event?.title} added to your bookings!`);
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-purple-700 dark:text-purple-300 mb-4">
          Upcoming Events
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Discover and book amazing events near you
        </p>
      </div>

      {/* Events Grid - Shows ALL events (no slice) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden h-48">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition duration-300 hover:scale-110"
              />
              {event.price && (
                <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                  ₹{event.price}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {event.title}
              </h2>

              {/* Event Details */}
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                {event.date && (
                  <p className="flex items-center">
                    📅 {event.date}
                  </p>
                )}
                {event.time && (
                  <p className="flex items-center">
                    🕐 {event.time}
                  </p>
                )}
                {event.location && (
                  <p className="flex items-center">
                    📍 {event.location}
                  </p>
                )}
              </div>

              {/* Description */}
              {event.description && (
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
              )}

              {/* Book Now Button */}
              <button
                onClick={() => handleBooking(event)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition shadow-md"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;