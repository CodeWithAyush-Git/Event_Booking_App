import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import DarkModeToggle from "./DarkModeToggle";

const Header = ({ currentUser, setCurrentUser }) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const drawerRef = useRef(null);
  const previousActiveElement = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  // Manage focus trap and slide-in animation for mobile drawer
  useEffect(() => {
    if (!open) {
      setMounted(false);
      return;
    }

    // open === true
    previousActiveElement.current = document.activeElement;
    // mount then animate on next frame
    setMounted(false);
    requestAnimationFrame(() => setMounted(true));

    const drawerNode = drawerRef.current;
    const focusableSelector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const focusable = drawerNode ? Array.from(drawerNode.querySelectorAll(focusableSelector)).filter(el => !el.hasAttribute('disabled')) : [];
    if (focusable.length) focusable[0].focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }

      if (e.key === 'Tab' && focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      // restore focus
      try { previousActiveElement.current?.focus(); } catch (e) {}
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800 backdrop-blur-md shadow-md transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 md:p-6">
        <Link
          to="/"
          className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition"
        >
          EventBooking
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-4 md:gap-6 items-center">
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

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <DarkModeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className={`absolute right-0 top-0 w-64 h-full bg-white dark:bg-gray-800 shadow-xl p-6 transform ${mounted ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <Link to="/" className="text-xl font-bold text-purple-600 dark:text-purple-400">EventBooking</Link>
              <button onClick={() => setOpen(false)} className="text-gray-600 dark:text-gray-200">Close</button>
            </div>
            <nav className="flex flex-col gap-3">
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
                  <Link key={path} to={path} onClick={() => setOpen(false)} className="py-2 px-3 rounded-md font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    {label}
                  </Link>
                );
              })}

              <div className="mt-4">
                {currentUser ? (
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">{currentUser.name}</span>
                    <button onClick={() => { handleLogout(); setOpen(false); }} className="ml-auto bg-red-500 text-white px-3 py-1 rounded-full">Logout</button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setOpen(false)} className="block bg-purple-500 text-white px-3 py-2 rounded-md text-center">Login</Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
