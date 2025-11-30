import React, { useRef } from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const waveRef = useRef(null);

  const handleMouseMove = (e) => {
    const x = e.clientX / window.innerWidth;
    waveRef.current.style.backgroundPositionX = `${x * 100}px`;
  };

  return (
    <div
      className="relative overflow-hidden bg-[#a883ff] text-white py-16 px-8"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Wave */}
      <div
        ref={waveRef}
        className="absolute inset-0 bg-[url('/wave.svg')] bg-repeat-x bg-bottom opacity-30 z-0"
        style={{ backgroundSize: '200% 100%' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Newsletter */}
        <div>
          <p className="text-sm uppercase tracking-widest">Stay Up to Date</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mt-2">
            get our <br />
            <span className="font-extrabold text-black">newsletter</span>
          </h2>
          <div className="mt-6 flex items-center space-x-2 border-b border-white pb-2">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent placeholder-white text-white outline-none flex-1"
            />
            <button className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition">
              →
            </button>
          </div>
        </div>

        {/* Contact */}
        <div className="md:col-span-2 text-right">
          <p className="text-sm uppercase tracking-widest">Get in Touch</p>
          <p className="text-2xl font-semibold mt-3">hello@yourmail.com</p>
          <p className="text-xl mt-1">+91 98765 43210</p>
          <p className="mt-3">Sector 10, Your City</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 mt-12 border-t border-white/30 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
          <span>Disclaimer</span>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <FaFacebook className="hover:scale-125 transition" />
          <FaLinkedin className="hover:scale-125 transition" />
          <FaInstagram className="hover:scale-125 transition" />
          <FaYoutube className="hover:scale-125 transition" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
