
import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { events } from "../data/events";
import { bookings } from "../data/bookings";
import { getAllReviews, getAverageRating } from "../data/reviews";
import { Music, Palette, Code, Star, Users, CheckCircle, Clock, DollarSign, Mail } from "lucide-react";

const Home = () => {
  const [email, setEmail] = useState("");
  const [stats, setStats] = useState({ events: 0, bookings: 0, reviews: 0, avgRating: 0 });

  useEffect(() => {
    // Load stats
    const allReviews = getAllReviews();
    const totalRating = events.reduce((sum, event) => sum + getAverageRating(event.id), 0);
    const avgRating = events.length > 0 ? (totalRating / events.length).toFixed(1) : 0;

    setStats({
      events: events.length,
      bookings: bookings.length,
      reviews: allReviews.length,
      avgRating: avgRating,
    });
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.info(`✉️ Newsletter signup: ${email}`);
      alert(`Thanks for subscribing! Check your email for updates.`);
      setEmail("");
      // Store in localStorage for persistence
      const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers));
      }
    }
  };

  const categories = [
    { name: "Music", icon: Music, color: "purple", count: 2 },
    { name: "Art", icon: Palette, color: "pink", count: 2 },
    { name: "Tech", icon: Code, color: "blue", count: 2 },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-700 overflow-hidden">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">

        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Concert crowd with lights and atmosphere" 
          className="absolute inset-0 w-full h-full object-cover brightness-75 dark:brightness-50"
        />

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10 dark:from-black/60 dark:to-black/30"></div>

        {/* Hero Content */}
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white dark:text-purple-400 mb-6 animate-fadeInDown drop-shadow-xl">
            Experience Events Like Never Before
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 dark:text-gray-300 mb-8 animate-fadeInUp drop-shadow-md">
            Discover, Book & Enjoy amazing events near you. Make every moment unforgettable.
          </p>
          <div className="flex justify-center gap-6 animate-fadeInUp delay-300">
            <button className="px-8 py-3 bg-purple-500 dark:bg-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:scale-105 transform transition duration-300">
              Explore Events
            </button>
            <button className="px-8 py-3 bg-white dark:bg-gray-700 text-purple-600 rounded-2xl font-semibold shadow-md hover:scale-105 transform transition duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Animated Floating Blobs */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-pink-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-yellow-300 rounded-full opacity-25 blur-2xl animate-pulse"></div>
      </section>

      {/* Featured Events Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-purple-700 dark:text-purple-400 mb-12 text-center animate-fadeIn">
          Featured Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.slice(0, 3).map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 dark:from-purple-900 dark:via-pink-900 dark:to-purple-950 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur p-8 rounded-xl text-center transform hover:scale-105 transition">
              <div className="text-4xl font-bold text-white mb-2">{stats.events}+</div>
              <p className="text-white/80 text-lg">Events Listed</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-8 rounded-xl text-center transform hover:scale-105 transition">
              <div className="text-4xl font-bold text-white mb-2">{stats.bookings}+</div>
              <p className="text-white/80 text-lg">Bookings Made</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-8 rounded-xl text-center transform hover:scale-105 transition">
              <div className="text-4xl font-bold text-white mb-2">{stats.reviews}</div>
              <p className="text-white/80 text-lg">Reviews & Ratings</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-8 rounded-xl text-center transform hover:scale-105 transition">
              <div className="flex justify-center mb-2">
                <span className="text-4xl font-bold text-yellow-300">{stats.avgRating}</span>
                <Star className="w-10 h-10 text-yellow-300 fill-yellow-300 ml-1" />
              </div>
              <p className="text-white/80 text-lg">Avg Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-purple-700 dark:text-purple-400 mb-12 text-center">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className={`bg-gradient-to-br from-${cat.color}-100 to-${cat.color}-50 dark:from-${cat.color}-900 dark:to-${cat.color}-800 p-8 rounded-xl text-center cursor-pointer transform hover:scale-105 transition shadow-lg`}
              >
                <Icon className={`w-16 h-16 mx-auto mb-4 text-${cat.color}-600 dark:text-${cat.color}-400`} />
                <h3 className={`text-2xl font-bold text-${cat.color}-700 dark:text-${cat.color}-300 mb-2`}>{cat.name}</h3>
                <p className={`text-${cat.color}-600 dark:text-${cat.color}-400 mb-4`}>{cat.count} events</p>
                <button className={`px-6 py-2 bg-${cat.color}-600 hover:bg-${cat.color}-700 text-white rounded-lg font-semibold transition`}>
                  Explore
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Book With Us Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-purple-700 dark:text-purple-400 mb-12 text-center">Why Book With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md">
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Instant Confirmation</h3>
              <p className="text-gray-600 dark:text-gray-300">Get your booking confirmed immediately. No waiting, no hassle.</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md">
              <Clock className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300">Our team is always ready to help with any questions or issues.</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md">
              <DollarSign className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Best Prices</h3>
              <p className="text-gray-600 dark:text-gray-300">Guaranteed lowest prices on all events. No hidden charges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-white/80 text-lg mb-8">Get the latest events delivered to your inbox every week.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 dark:bg-gray-800 dark:text-white"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 rounded-lg font-semibold hover:scale-105 transform transition shadow-lg flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default Home;