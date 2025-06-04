import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BirthdateSpace from './components/BirthdateSpace';
import ISSTracker from './components/ISSTracker';
import PlanetTrip from './components/PlanetTrip';
import Dashboard from './components/Dashboard';
import './index.css';

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
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-secondary via-dark to-black">
        {/* Galaxy-inspired animated stars background */}
        <div className="stars-container fixed inset-0 z-0 overflow-hidden">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>

        {/* Header with Stripe-inspired design */}
        <header className="sticky top-0 backdrop-blur-xl bg-secondary/70 border-b border-subtle/10 w-full z-50">
          <nav className="container py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-bg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">A</span>
                </div>
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  AstroTrip
                </Link>
              </div>
              <div className="hidden md:flex space-x-1 items-center">
                <Link to="/birthday" className="px-4 py-2 text-light hover:text-accent rounded-stripe transition-all">
                  Birthday in Space
                </Link>
                <Link to="/iss-tracker" className="px-4 py-2 text-light hover:text-accent rounded-stripe transition-all">
                  ISS Tracker
                </Link>
                <Link to="/planet-trip" className="px-4 py-2 text-light hover:text-accent rounded-stripe transition-all">
                  Planet Trip
                </Link>
                <Link to="/" className="ml-4 btn">
                  Dashboard
                </Link>
              </div>
              <button className="md:hidden text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </nav>
        </header>

        {/* Hero section for homepage */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={
              <>
                <section className="section pt-20 pb-32 relative overflow-hidden">
                  <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent via-primary to-light bg-clip-text text-transparent">
                        Explore the Cosmos
                      </h1>
                      <p className="text-xl md:text-2xl text-light/80 mb-8">
                        Your personal journey through space begins here.
                        Discover the universe from your birthdate to distant planets.
                      </p>
                      <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/birthday" className="btn">
                          Find Your Cosmic Birthday
                        </Link>
                        <Link to="/iss-tracker" className="btn-secondary">
                          Track the ISS
                        </Link>
                      </div>
                    </div>
                    
                    {/* Feature cards with Stripe-inspired design */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="dark-card transform hover:-translate-y-1 transition-all">
                        <div className="h-12 w-12 rounded-full bg-gradient-bg flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Birthdate in Space</h3>
                        <p className="text-light/70">Discover what the cosmos looked like on your birthday with NASA's Astronomy Picture of the Day.</p>
                      </div>
                      
                      <div className="dark-card transform hover:-translate-y-1 transition-all">
                        <div className="h-12 w-12 rounded-full bg-gradient-bg flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">ISS Tracker</h3>
                        <p className="text-light/70">Follow the International Space Station in real-time and see when it will pass over your location.</p>
                      </div>
                      
                      <div className="dark-card transform hover:-translate-y-1 transition-all">
                        <div className="h-12 w-12 rounded-full bg-gradient-bg flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Planet Trip</h3>
                        <p className="text-light/70">Simulate a journey to other planets in our solar system and plan your interplanetary mission.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
                  <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl"></div>
                </section>
                
                {/* Dashboard preview section */}
                <section className="section bg-secondary/30 backdrop-blur-sm relative">
                  <div className="container">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                      <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-light">Your Space Dashboard</h2>
                        <p className="text-light/80 mb-8">Access all your cosmic data in one place. Track your favorite celestial events, plan your space journeys, and discover new wonders of the universe.</p>
                        <Link to="/" className="btn inline-flex items-center gap-2">
                          Go to Dashboard
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                      <div className="md:w-1/2">
                        <div className="card p-6 shadow-stripe-lg border border-subtle/20 bg-white/5 backdrop-blur-xl">
                          <div className="h-64 rounded-stripe bg-secondary/50 flex items-center justify-center">
                            <p className="text-light/50 text-lg">Dashboard Preview</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            } />
            <Route path="/birthday" element={<BirthdateSpace birthdate={userData.birthdate} />} />
            <Route path="/iss-tracker" element={<ISSTracker location={userData.location} />} />
            <Route path="/planet-trip" element={<PlanetTrip />} />
          </Routes>
        </div>

        <footer className="bg-secondary/80 backdrop-blur-md py-8 relative z-10 mt-auto border-t border-subtle/10">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <Link to="/" className="text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  AstroTrip
                </Link>
                <p className="text-light/60 text-sm mt-2">Explore the cosmos from your browser</p>
              </div>
              <div className="flex gap-8">
                <div>
                  <h4 className="text-light font-medium mb-2">Features</h4>
                  <ul className="space-y-1">
                    <li><Link to="/birthday" className="text-light/60 hover:text-accent text-sm">Birthday in Space</Link></li>
                    <li><Link to="/iss-tracker" className="text-light/60 hover:text-accent text-sm">ISS Tracker</Link></li>
                    <li><Link to="/planet-trip" className="text-light/60 hover:text-accent text-sm">Planet Trip</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-light font-medium mb-2">Resources</h4>
                  <ul className="space-y-1">
                    <li><a href="#" className="text-light/60 hover:text-accent text-sm">NASA APIs</a></li>
                    <li><a href="#" className="text-light/60 hover:text-accent text-sm">Space Facts</a></li>
                    <li><a href="#" className="text-light/60 hover:text-accent text-sm">About</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-subtle/10 mt-8 pt-8 text-center text-light/40 text-sm">
              <p>Powered by NASA APIs | Made with ❤️ for space enthusiasts | © {new Date().getFullYear()} AstroTrip</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
