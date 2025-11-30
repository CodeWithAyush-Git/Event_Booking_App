import { Link, useNavigate, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Header = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800 backdrop-blur-md shadow-md transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 md:p-6">
        <Link
          to="/"
          className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition"
        >
          EventBooking
        </Link>

        <nav className="flex gap-4 md:gap-6 items-center">
          {["/", "/events", "/my-bookings", "/profile", "/admin", "/contact", "/about"].map((path) => {
            if (path === "/admin" && currentUser?.role !== "admin") return null;
            if (path === "/profile" && !currentUser) return null;
            const label =
              path === "/" ? "Home" :
              path === "/events" ? "Events" :
              path === "/my-bookings" ? "My Bookings" :
              path === "/profile" ? "Profile" :
              path === "/admin" ? "Admin" :
              path === "/contact" ? "Contact" :
              "About";

            return (
              <Link
                key={path}
                to={path}
                className={`relative px-2 py-1 font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition ${
                  isActive(path) ? "text-purple-600 dark:text-purple-300" : ""
                }`}
              >
                {label}
                {isActive(path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-500 rounded-full animate-[fadeIn_0.5s]"></span>
                )}
              </Link>
            );
          })}

          {currentUser ? (
            <div className="flex gap-2 items-center ml-4">
              <span className="font-semibold text-gray-700 dark:text-gray-200">{currentUser.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition shadow-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-purple-500 text-white px-3 py-1 rounded-full hover:bg-purple-600 transition shadow-md ml-4"
            >
              Login
            </Link>
          )}

          {/* Dark Mode Toggle */}
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
