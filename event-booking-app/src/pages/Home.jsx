
import React from "react";
import EventCard from "../components/EventCard";
import { events } from "../data/events";

const Home = () => {
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

    </div>
  );
};

export default Home;