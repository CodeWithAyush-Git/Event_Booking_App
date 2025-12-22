import React, { useState } from "react";
import { Heart, Zap, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50 p-6 md:p-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-4 animate-fadeIn">
          About EventBooking
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed animate-fadeIn delay-200">
          We make organizing and attending events seamless, fun, and stress-free. Our platform allows you to explore upcoming events, book tickets, and manage your bookings with ease.
        </p>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 animate-fadeIn">
          <h2 className="text-4xl font-bold text-purple-600">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our goal is to connect people with amazing experiences and make event planning effortless. We prioritize user experience, speed, and security to provide the best platform for event enthusiasts.
          </p>

          <h2 className="text-4xl font-bold text-purple-600 mt-8">Our Team</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            A passionate group of designers, developers, and event planners dedicated to delivering top-notch service and innovative solutions.
          </p>

          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition transform">
            Join Our Team
          </button>
        </div>

        <div className="animate-fadeIn delay-200">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Our Team"
            className="rounded-3xl shadow-xl w-full object-cover h-96"
          />
        </div>
      </div>  

      {/* Core Values Section */}
      <div className="max-w-7xl mx-auto mt-24">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <Heart className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Trust</h3>
            <p className="text-gray-600">We believe in building lasting relationships with our customers through transparency and reliability.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <Zap className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Speed</h3>
            <p className="text-gray-600">Fast booking, instant confirmations, and quick customer support—we respect your time.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <Shield className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Security</h3>
            <p className="text-gray-600">Your data and payments are protected with industry-leading security standards.</p>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="max-w-7xl mx-auto mt-24">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8 mb-24">
          {[
            { name: "Ayush Kumar", role: "Full Stack Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
            { name: "Sarah Jane", role: "UI/UX Designer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
            { name: "Mike Chen", role: "Backend Developer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
            { name: "Emma Wilson", role: "Product Manager", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
          ].map((member, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105">
              <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-purple-600 font-semibold">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto mt-24 mb-24">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">Our Journey</h2>
        <div className="space-y-8">
          {[
            { year: "2020", title: "Founded EventBooking", desc: "Started with a vision to simplify event bookings" },
            { year: "2021", title: "First 1000 Users", desc: "Reached our first thousand happy customers" },
            { year: "2022", title: "Expanded to 5 Categories", desc: "Added Music, Art, Tech, Sports, and more" },
            { year: "2023", title: "Admin Dashboard Launch", desc: "Empowered event organizers with analytics" },
            { year: "2024", title: "Reviews & Ratings", desc: "Community-driven quality assurance" },
          ].map((milestone, idx) => (
            <div key={idx} className="flex gap-6 items-start">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">{idx + 1}</div>
                {idx < 4 && <div className="w-1 h-20 bg-purple-300 mt-2"></div>}
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                <h3 className="text-2xl font-bold text-purple-700 mb-1">{milestone.year}</h3>
                <p className="text-xl font-semibold text-gray-800 mb-2">{milestone.title}</p>
                <p className="text-gray-600">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fun Facts / Stats Section */}
      <div className="max-w-7xl mx-auto mt-24 grid md:grid-cols-3 gap-12 text-center animate-fadeIn delay-400">
        <div className="bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition transform">
          <h3 className="text-5xl font-extrabold text-purple-600 mb-2">500+</h3>
          <p className="text-gray-700 font-medium">Events Hosted</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition transform">
          <h3 className="text-5xl font-extrabold text-purple-600 mb-2">10K+</h3>
          <p className="text-gray-700 font-medium">Happy Users</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition transform">
          <h3 className="text-5xl font-extrabold text-purple-600 mb-2">150+</h3>
          <p className="text-gray-700 font-medium">Venues Partnered</p>
        </div>
      </div>
    </div>
  );
};

export default About;
