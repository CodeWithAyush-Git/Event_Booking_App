import React, { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Edit2, Save, X, Calendar, DollarSign, Clock } from "lucide-react";

const Profile = ({ currentUser, setCurrentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [userBookings, setUserBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
      });

      // Load user's bookings from localStorage
      const allBookings = JSON.parse(localStorage.getItem("event_app_bookings") || "[]");
      const myBookings = allBookings.filter((b) => b.userId === currentUser.id);
      setUserBookings(myBookings);
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    // Validate
    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage("Name and email are required!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Update currentUser
    const updatedUser = {
      ...currentUser,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };
    setCurrentUser(updatedUser);

    // Save to localStorage
    const users = JSON.parse(localStorage.getItem("event_app_users") || "[]");
    const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));
    localStorage.setItem("event_app_users", JSON.stringify(updatedUsers));

    setMessage("Profile updated successfully!");
    setIsEditing(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser.name || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "",
    });
    setIsEditing(false);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Success/Error Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-white font-semibold ${message.includes("successfully") ? "bg-green-500" : "bg-red-500"}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{formData.name}</h1>
                <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm capitalize">
                  {currentUser.role === "admin" ? "Admin User" : "Regular User"}
                </p>
              </div>

              {/* Profile Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">{formData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">{formData.phone || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">Member since 2023</span>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`w-full px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                  isEditing
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                <Edit2 className="w-4 h-4" />
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>

            {/* Stats Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Bookings</span>
                  <span className="text-2xl font-bold text-purple-600">{userBookings.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Confirmed</span>
                  <span className="text-2xl font-bold text-green-600">
                    {userBookings.filter((b) => b.status === "Confirmed").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Cancelled</span>
                  <span className="text-2xl font-bold text-red-600">
                    {userBookings.filter((b) => b.status === "Cancelled").length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form / Booking History */}
          <div className="lg:col-span-2">
            {isEditing ? (
              // Edit Form
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Edit Profile</h2>
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Booking History
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Booking History</h2>

                {userBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 text-lg">No bookings yet</p>
                    <p className="text-gray-500 dark:text-gray-500">Start booking events to see them here!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {/* Event Info */}
                          <div className="md:col-span-2">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                              {booking.eventTitle}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {booking.eventDate}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                              <Clock className="w-4 h-4" />
                              {booking.eventTime}
                            </p>
                          </div>

                          {/* Price & Status */}
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Price</p>
                            <p className="text-xl font-bold text-purple-600 flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {booking.price}
                            </p>
                          </div>

                          <div className="flex flex-col justify-between">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Booking ID</p>
                            <p className="text-sm font-mono text-gray-800 dark:text-white">{booking.id}</p>
                            <div className="mt-2">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                  booking.status === "Confirmed"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                              >
                                {booking.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
