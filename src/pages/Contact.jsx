import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhoneAlt, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center p-6 overflow-hidden">
      {/* Floating gradient circles */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, -25, 0], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      />

      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-white/70 backdrop-blur-2xl shadow-2xl rounded-3xl p-8 w-full max-w-2xl border border-white/40"
      >
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">
          Get in Touch 💌
        </h1>
        <p className="text-center text-gray-600 mb-8">
          We’d love to hear from you! Fill out the form and we’ll respond as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center bg-white/80 rounded-2xl px-4 py-3 shadow-inner">
            <FaUser className="text-purple-500 mr-3 text-xl" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          <div className="flex items-center bg-white/80 rounded-2xl px-4 py-3 shadow-inner">
            <FaEnvelope className="text-purple-500 mr-3 text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          <div className="flex items-center bg-white/80 rounded-2xl px-4 py-3 shadow-inner">
            <FaPhoneAlt className="text-purple-500 mr-3 text-xl" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          <div className="bg-white/80 rounded-2xl px-4 py-3 shadow-inner">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
              className="w-full bg-transparent outline-none text-gray-700 resize-none"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <FaPaperPlane /> Send Message
          </motion.button>

          {sent && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-green-600 text-center font-medium mt-3"
            >
              ✅ Message Sent Successfully!
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
