
const EventCard = ({ event }) => {
  
  const handleBooking = () => {
    // localStorage me save karna
    localStorage.setItem("selectedEvent", JSON.stringify(event));

    // Optional: Navigate to booking page if exists
    // window.location.href = "/booking";
    
    alert("Event added to booking!");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition hover:scale-105">
      <img src={event.image} alt={event.title} className="w-full h-40 md:h-48 object-cover" />
      
      <div className="p-5">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{event.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{event.date}</p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">{event.location}</p>

        {/* Book Now Button */}
        <button
          onClick={handleBooking}
          className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;
