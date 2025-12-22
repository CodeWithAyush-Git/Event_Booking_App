import React, { useState } from "react";
import { events as initialEvents } from "../data/events";
import { users as initialUsers } from "../data/users";
import { bookings as initialBookings } from "../data/bookings";
import { getAllReviews, deleteReview, getAverageRating } from "../data/reviews";

const Admin = ({ currentUser }) => {
  if (!currentUser?.role || currentUser.role !== "admin") {
    return (
      <p className="p-8 text-red-500 font-semibold dark:text-red-400">
        Access Denied. Admins only.
      </p>
    );
  }

  const [eventList, setEventList] = useState(initialEvents);
  const [bookingList] = useState(initialBookings);
  const [userList] = useState(initialUsers);
  const [reviewsList, setReviewsList] = useState(getAllReviews());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState({});
  const [sentEmails, setSentEmails] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sentEmails') || '[]'); } catch { return []; }
  });

  const openModal = (event = {}) => {
    setEditEvent(event);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const saveEvent = () => {
    if (!editEvent.title || !editEvent.date) return alert("Title and Date required");
    if (editEvent.id) {
      setEventList(eventList.map(ev => (ev.id === editEvent.id ? editEvent : ev)));
    } else {
      setEventList([...eventList, { ...editEvent, id: eventList.length + 1 }]);
    }
    closeModal();
  };

  const deleteEvent = (id) => setEventList(eventList.filter(ev => ev.id !== id));

  const handleDeleteReview = (id) => {
    if (!window.confirm("Delete this review?")) return;
    deleteReview(id);
    setReviewsList(getAllReviews());
  };

  const refreshEmails = () => {
    try { setSentEmails(JSON.parse(localStorage.getItem('sentEmails') || '[]')); } catch { setSentEmails([]); }
  };


  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 transition">
      <h1 className="text-4xl font-bold text-purple-700 dark:text-purple-300 mb-8 text-center">
        Admin Dashboard
      </h1>

      {/* Events */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400">Manage Events</h2>
          <button
            onClick={() => openModal()}
            className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 transition"
          >
            + Add Event
          </button>
        </div>

        <table className="w-full table-auto border-collapse bg-white dark:bg-gray-900 shadow-xl rounded-lg text-gray-800 dark:text-gray-200">
          <thead className="bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-200">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {eventList.map(ev => (
              <tr key={ev.id} className="text-center hover:bg-purple-50 dark:hover:bg-gray-800 transition">
                <td className="border px-4 py-2">{ev.id}</td>
                <td className="border px-4 py-2">{ev.title}</td>
                <td className="border px-4 py-2">{ev.date}</td>
                <td className="border px-4 py-2 flex justify-center gap-2">
                  <button onClick={() => openModal(ev)} className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500">
                    Edit
                  </button>
                  <button onClick={() => deleteEvent(ev.id)} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reviews & Ratings */}
      <div className="mt-12 mb-12">
        <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Reviews & Ratings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3">Average Rating Per Event</h3>
            <ul className="space-y-2">
              {eventList.map(ev => (
                <li key={ev.id} className="flex justify-between items-center">
                  <span>{ev.title}</span>
                  <span className="font-bold text-yellow-500">★ {getAverageRating(ev.id) || 0}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3">Recent Reviews</h3>
            <div className="space-y-3 max-h-64 overflow-auto">
              {reviewsList.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
              ) : (
                reviewsList.map(r => (
                  <div key={r.id} className="border rounded p-3 bg-gray-50 dark:bg-gray-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{r.userName} <span className="text-yellow-500">★{r.rating}</span></div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{r.comment}</div>
                        <div className="text-xs text-gray-400 mt-1">Event ID: {r.eventId} • Review ID: {r.id}</div>
                      </div>
                      <div>
                        <button onClick={() => handleDeleteReview(r.id)} className="text-red-500">Delete</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sent Emails */}
        <div className="mt-6 bg-white dark:bg-gray-900 rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Sent Emails (email stub)</h3>
            <button onClick={refreshEmails} className="text-sm text-purple-600">Refresh</button>
          </div>

          <div className="max-h-56 overflow-auto space-y-2">
            {sentEmails.length === 0 ? (
              <p className="text-gray-500">No emails sent yet.</p>
            ) : (
              sentEmails.map((m, idx) => (
                <div key={idx} className="border rounded p-2 bg-gray-50 dark:bg-gray-800">
                  <div className="text-sm font-semibold">To: {m.to}</div>
                  <div className="text-xs text-gray-500">{new Date(m.date).toLocaleString()}</div>
                  <div className="mt-1 text-sm">{m.subject}</div>
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{m.body}</div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Bookings */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-4">All Bookings</h2>
        <table className="w-full table-auto border-collapse bg-white dark:bg-gray-900 shadow-xl rounded-lg text-gray-800 dark:text-gray-200">
          <thead className="bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-200">
            <tr>
              <th className="border px-4 py-2">Booking ID</th>
              <th className="border px-4 py-2">Event</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingList.map(b => (
              <tr key={b.id} className="text-center hover:bg-purple-50 dark:hover:bg-gray-800 transition">
                <td className="border px-4 py-2">{b.id}</td>
                <td className="border px-4 py-2">{b.event}</td>
                <td className="border px-4 py-2">{b.userName}</td>
                <td className="border px-4 py-2">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Users */}
      <div>
        <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-4">All Users</h2>
        <table className="w-full table-auto border-collapse bg-white dark:bg-gray-900 shadow-xl rounded-lg text-gray-800 dark:text-gray-200">
          <thead className="bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-200">
            <tr>
              <th className="border px-4 py-2">User ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {userList.map(u => (
              <tr key={u.id} className="text-center hover:bg-purple-50 dark:hover:bg-gray-800 transition">
                <td className="border px-4 py-2">{u.id}</td>
                <td className="border px-4 py-2">{u.name}</td>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl w-96">
            <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">
              {editEvent.id ? "Edit Event" : "Add Event"}
            </h3>
            <input
              type="text"
              placeholder="Title"
              className="border p-2 rounded w-full mb-3 dark:bg-gray-700 dark:text-gray-200"
              value={editEvent.title || ""}
              onChange={e => setEditEvent({ ...editEvent, title: e.target.value })}
            />
            <input
              type="date"
              className="border p-2 rounded w-full mb-3 dark:bg-gray-700 dark:text-gray-200"
              value={editEvent.date || ""}
              onChange={e => setEditEvent({ ...editEvent, date: e.target.value })}
            />
            <div className="flex justify-end gap-3 mt-3">
              <button onClick={closeModal} className="px-4 py-1 rounded border">Cancel</button>
              <button onClick={saveEvent} className="px-4 py-1 rounded bg-purple-500 text-white hover:bg-purple-600 transition shadow-md">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
