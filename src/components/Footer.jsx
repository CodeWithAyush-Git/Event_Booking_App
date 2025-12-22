import React, { useRef, useState } from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const waveRef = useRef(null);
  const [email, setEmail] = useState("");

  const handleMouseMove = (e) => {
    if (waveRef.current) {
      const x = e.clientX / window.innerWidth;
      waveRef.current.style.backgroundPositionX = `${x * 100}px`;
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.info(`✉️ Footer Newsletter signup: ${email}`);
      alert(`Thanks for subscribing! Check your email.`);
      setEmail("");
      const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers));
      }
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 text-gray-900 dark:text-white py-16 px-8 transition-colors duration-700">
      {/* Animated Wave */}
      <div
        ref={waveRef}
        className="absolute inset-0 bg-[url('/wave.svg')] bg-repeat-x bg-bottom opacity-20 z-0"
        style={{ backgroundSize: '200% 100%' }}
        onMouseMove={handleMouseMove}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">EventBooking</h3>
            <p className="text-gray-800 dark:text-white/80 text-sm">Making events accessible to everyone. Discover, book, and enjoy amazing experiences.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-800 dark:text-white/80">
              <li><Link to="/" className="hover:text-purple-700 dark:hover:text-white transition font-medium">Home</Link></li>
              <li><Link to="/events" className="hover:text-purple-700 dark:hover:text-white transition font-medium">Events</Link></li>
              <li><Link to="/about" className="hover:text-purple-700 dark:hover:text-white transition font-medium">About</Link></li>
              <li><Link to="/contact" className="hover:text-purple-700 dark:hover:text-white transition font-medium">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Support</h4>
            <ul className="space-y-2 text-sm text-gray-800 dark:text-white/80">
              <li><a href="#" className="hover:text-purple-700 dark:hover:text-white transition font-medium">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-700 dark:hover:text-white transition font-medium">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-700 dark:hover:text-white transition font-medium">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-purple-700 dark:hover:text-white transition font-medium">Refund Policy</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Newsletter</h4>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-white/20 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-purple-600 dark:bg-white text-white dark:text-purple-600 rounded-lg font-semibold hover:scale-105 transition transform"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 dark:border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-sm text-gray-700 dark:text-white/70">© 2024 EventBooking. All rights reserved.</p>

            {/* Contact Info */}
            <div className="text-sm text-gray-800 dark:text-white/80 text-center font-medium">
              <p>📧 hello@eventbooking.com | 📞 +91 98765 43210</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="hover:scale-125 transition text-gray-800 dark:text-white/80 hover:text-purple-700 dark:hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:scale-125 transition text-gray-800 dark:text-white/80 hover:text-purple-700 dark:hover:text-white">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="hover:scale-125 transition text-gray-800 dark:text-white/80 hover:text-purple-700 dark:hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:scale-125 transition text-gray-800 dark:text-white/80 hover:text-purple-700 dark:hover:text-white">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
