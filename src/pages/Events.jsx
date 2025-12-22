import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getReviewsForEvent, addReview, getAverageRating } from "../data/reviews";

const Events = ({ events, addBooking, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(1000);
  const navigate = useNavigate();

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = event.price <= priceRange;
    const matchesCategory = filterCategory === "All" || event.category === filterCategory;
    return matchesSearch && matchesPrice && matchesCategory;
  });

  const handleBooking = (event) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    addBooking(event);
  };

  // reviews state mapped by event id for quick lookup
  const [reviewsMap, setReviewsMap] = useState({});

  useEffect(() => {
    const map = {};
    events.forEach(ev => {
      map[ev.id] = getReviewsForEvent(ev.id);
    });
    setReviewsMap(map);
  }, [events]);

  const handleAddReview = (eventId, rating, comment) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const rev = addReview({ eventId, userId: currentUser.id, userName: currentUser.name, rating, comment });
    setReviewsMap(prev => ({ ...prev, [eventId]: [rev, ...(prev[eventId] || [])] }));
    alert("Thanks for your review!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-purple-700 dark:text-purple-300 mb-4">
            Upcoming Events
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Discover and book amazing events near you
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                🔍 Search Events
              </label>
              <input
                type="text"
                placeholder="Search by event name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                💰 Max Price: ₹{priceRange}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                🎭 Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="All">All Categories</option>
                <option value="Music">🎵 Music</option>
                <option value="Art">🎨 Art</option>
                <option value="Tech">💻 Tech</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
            Found {filteredEvents.length} event(s)
          </p>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No events match your search criteria. Try adjusting filters!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden h-40 md:h-48">
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
                <div className="p-4 md:p-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {event.title}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-yellow-500 font-bold">★ {getAverageRating(event.id) || 0}</div>
                    <div className="text-sm text-gray-500">({(reviewsMap[event.id] || []).length} reviews)</div>
                  </div>

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
                    {currentUser ? "Book Now" : "Login to Book"}
                  </button>

                  {/* Reviews list + form */}
                  <div className="mt-4">
                    <details className="text-sm">
                      <summary className="cursor-pointer text-purple-600">See reviews</summary>
                      <div className="mt-3 space-y-3">
                        {(reviewsMap[event.id] || []).map(r => (
                          <div key={r.id} className="border rounded p-2 bg-gray-50 dark:bg-gray-700">
                            <div className="font-semibold">{r.userName} <span className="text-yellow-500">★{r.rating}</span></div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">{r.comment}</div>
                          </div>
                        ))}

                        <div className="mt-2">
                          <label className="block text-sm mb-1">Your rating</label>
                          <select id={`rating-${event.id}`} className="w-full mb-2 p-2 rounded border">
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                          </select>
                          <textarea id={`comment-${event.id}`} placeholder="Write a quick review" className="w-full p-2 rounded border mb-2"></textarea>
                          <button
                            onClick={() => {
                              const rating = document.getElementById(`rating-${event.id}`).value;
                              const comment = document.getElementById(`comment-${event.id}`).value;
                              if (!comment) return alert("Please write a comment");
                              handleAddReview(event.id, rating, comment);
                              document.getElementById(`comment-${event.id}`).value = "";
                            }}
                            className="bg-indigo-600 text-white px-3 py-1 rounded"
                          >
                            Submit Review
                          </button>
                        </div>
                      </div>
                    </details>
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

export default Events;