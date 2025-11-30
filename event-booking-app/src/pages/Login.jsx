import { useState } from "react";
import { users } from "../data/users";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      navigate("/"); // redirect to home
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-700">
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 w-full max-w-md overflow-hidden">
        {/* Floating Blobs */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-300 rounded-full blur-3xl opacity-25 animate-pulse"></div>

        <h2 className="text-3xl font-extrabold text-gray-700 dark:text-gray-200 mb-6 text-center animate-fadeIn">
          Admin Login
        </h2>

        <div className="mb-4 animate-fadeIn delay-100">
          <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
            <FaEnvelope /> Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6 animate-fadeIn delay-200">
          <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
            <FaLock /> Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transform transition duration-300 shadow-lg animate-fadeIn delay-300"
        >
          Login
        </button>

        <p className="text-center text-gray-500 dark:text-gray-300 mt-4 text-sm animate-fadeIn delay-400">
          Demo Admin: <br />
          <span className="font-medium">john@example.com / 123456</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
