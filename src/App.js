import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BirthdateSpace from './components/BirthdateSpace';
import ISSTracker from './components/ISSTracker';
import PlanetTrip from './components/PlanetTrip';
import Dashboard from './components/Dashboard';
import AboutMe from './components/AboutMe';

function App() {
  const [userData, setUserData] = useState({
    birthdate: '',
    location: null,
  });

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserData(prev => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleBirthdateChange = (date) => {
    setUserData(prev => ({
      ...prev,
      birthdate: date
    }));
  };

  return (
      <div className="min-h-screen flex flex-col">
        <header>
          <nav>
            <div className="flex items-center justify-center py-4">
              <Link to="/" className="text-3xl font-bold text-white">ASTROTRIP</Link>
            </div>
            <div className="flex space-x-4 items-center justify-center py-4">
              <Link to="/birthday" className="text-lg text-white">BIRTHDAY IN SPACE</Link>
              <Link to="/iss-tracker" className="text-lg text-white">ISS TRACKER</Link>
              <Link to="/planet-trip" className="text-lg text-white">PLANET TRIP</Link>
              <Link to="/about" className="text-lg text-white">ABOUT ME</Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow">
          <div className="stars"></div>
          <div className="twinkling"></div>
          <div style={{ paddingTop: '100px' }}>
            <Routes>
              <Route path="/" element={<Dashboard userData={userData} onBirthdateChange={handleBirthdateChange} />} />
              <Route path="/birthday" element={<BirthdateSpace birthdate={userData.birthdate} />} />
              <Route path="/iss-tracker" element={<ISSTracker location={userData.location} />} />
              <Route path="/planet-trip" element={<PlanetTrip />} />
              <Route path="/about" element={<AboutMe />} />
            </Routes>
          </div>
        </main>

        <footer>
          <div className="container text-center text-white py-4">
            <p> {new Date().getFullYear()} ASTROTRIP | DATA PROVIDED BY NASA APIS</p>
          </div>
        </footer>
      </div>
  );
}

export default App;
