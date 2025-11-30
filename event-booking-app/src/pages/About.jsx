import React from "react";


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
