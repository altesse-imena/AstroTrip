import { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ userData, onBirthdateChange }) => {
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBirthdateChange(birthdate);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to AstroTrip</h1>
        <p className="text-xl text-gray-300">Your personal space exploration companion</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">🌌 Birthday in Space</h2>
          <p className="text-gray-300 mb-4">Discover what the universe looked like on your special day.</p>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 mb-2"
              required
            />
            <button type="submit" className="btn btn-primary w-full">
              Explore
            </button>
          </form>
          {userData.birthdate && (
            <Link to="/birthday" className="text-blue-400 hover:text-blue-300 text-sm">
              View your birthday in space →
            </Link>
          )}
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">🛰️ ISS Tracker</h2>
          <p className="text-gray-300 mb-4">Track the International Space Station in real-time as it orbits Earth.</p>
          <Link to="/iss-tracker" className="btn btn-primary w-full block text-center">
            Track ISS
          </Link>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">🚀 Planet Trip</h2>
          <p className="text-gray-300 mb-4">Plan your virtual journey to other planets in our solar system.</p>
          <Link to="/planet-trip" className="btn btn-primary w-full block text-center">
            Start Journey
          </Link>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-4">About AstroTrip</h2>
        <p className="text-gray-300 mb-4">
          AstroTrip brings the wonders of space closer to you. Using NASA's open APIs, we provide real-time space data,
          beautiful astronomical images, and interactive experiences to satisfy your curiosity about the cosmos.
        </p>
        <p className="text-gray-400 text-sm">
          All data is provided by NASA's open APIs. This is a non-commercial project for educational purposes.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
