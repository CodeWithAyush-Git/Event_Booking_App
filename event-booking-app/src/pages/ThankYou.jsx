import React from 'react';
import { CheckCircle } from 'lucide-react';

const ThankYou = () => {
  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-6">
      <div className="bg-white shadow-2xl rounded-3xl max-w-2xl w-full p-10 md:p-14 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={60} className="text-green-500" />
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Thank You!</h2>
        <p className="text-lg text-gray-600 mb-6">
          Your booking has been confirmed. We’re excited to see you at the event!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/events"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
          >
            Explore More Events
          </a>
          <a
            href="/"
            className="px-6 py-3 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition"
          >
            Go to Home
          </a>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
