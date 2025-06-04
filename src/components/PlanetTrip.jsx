import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Planet data with some basic information
const PLANETS = [
  {
    id: 'mercury',
    name: 'Mercury',
    distance: 77, // in millions of km from Earth (average)
    travelTime: '3-4 months',
    description: 'The smallest planet in our solar system and closest to the Sun.',
    image: 'https://solarsystem.nasa.gov/system/feature_items/images/18_mercury_new.png'
  },
  {
    id: 'venus',
    name: 'Venus',
    distance: 41.4,
    travelTime: '4-6 months',
    description: 'Similar in size to Earth but with a toxic atmosphere of carbon dioxide.',
    image: 'https://solarsystem.nasa.gov/system/feature_items/images/43_venus_jg.png'
  },
  {
    id: 'mars',
    name: 'Mars',
    distance: 225,
    travelTime: '7-9 months',
    description: 'The most explored planet with a thin atmosphere and evidence of water.',
    image: 'https://solarsystem.nasa.gov/system/feature_items/images/20_mars.png'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    distance: 628,
    travelTime: '2-5 years',
    description: 'The largest planet with a Great Red Spot and 79 known moons.',
    image: 'https://solarsystem.nasa.gov/system/feature_items/images/16_jupiter_new.png'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    distance: 1275,
    travelTime: '7 years',
    description: 'Famous for its beautiful ring system made of ice and rock.',
    image: 'https://solarsystem.nasa.gov/system/feature_items/images/38_saturn_1600x900.jpg'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    distance: 2724,
    travelTime: '9-12 years',
    description: 'An ice giant that rotates on its side with a tilted magnetic field.',
    image: 'https://solarsystem.nasa.gov/system/feature_items/images/88_carousel_uranus.jpg'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    distance: 4347,
    travelTime: '12 years',
    description: 'The windiest planet with the strongest winds in the solar system.',
    image: 'https://solarsystem.nasa.gov/system/feature_items/images/82_carousel_neptune_1.jpg'
  },
  {
    id: 'pluto',
    name: 'Pluto',
    distance: 5800,
    travelTime: '9.5 years',
    description: 'A dwarf planet in the Kuiper belt with a heart-shaped glacier.',
    image: 'https://solarsystem.nasa.gov/system/feature_items/images/92_pluto_1.jpg'
  }
];

const PlanetTrip = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [launchDate, setLaunchDate] = useState('');
  const [tripDetails, setTripDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apodData, setApodData] = useState(null);

  // Set default selected planet to Mars on component mount
  useEffect(() => {
    const mars = PLANETS.find(planet => planet.id === 'mars');
    if (mars) {
      setSelectedPlanet(mars);
    }
  }, []);

  // Fetch a random space image from APOD
  useEffect(() => {
    const fetchRandomApod = async () => {
      try {
        // Get a random date between 1995-06-16 (APOD start date) and today
        const startDate = new Date('1995-06-16');
        const endDate = new Date();
        const randomDate = new Date(
          startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
        );
        
        const formattedDate = randomDate.toISOString().split('T')[0];
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${formattedDate}`
        );
        
        if (response.data.media_type === 'image') {
          setApodData(response.data);
        }
      } catch (err) {
        console.error('Error fetching APOD:', err);
      }
    };

    fetchRandomApod();
  }, []);

  const handlePlanetSelect = (planet) => {
    setSelectedPlanet(planet);
    setTripDetails(null); // Reset trip details when changing planet
  };

  const handleLaunch = (e) => {
    e.preventDefault();
    
    if (!selectedPlanet || !launchDate) {
      setError('Please select a planet and launch date');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Generate random mission details
      const missionId = `MSN-${Math.floor(Math.random() * 10000)}`;
      const crew = Math.floor(Math.random() * 5) + 3; // 3-7 crew members
      
      // Calculate arrival date based on travel time
      const launch = new Date(launchDate);
      const arrivalDate = new Date(launch);
      
      if (selectedPlanet.travelTime.includes('month')) {
        const months = parseInt(selectedPlanet.travelTime.split('-')[1] || selectedPlanet.travelTime.split('-')[0]);
        arrivalDate.setMonth(arrivalDate.getMonth() + months);
      } else if (selectedPlanet.travelTime.includes('year')) {
        const years = parseInt(selectedPlanet.travelTime.split('-')[1] || selectedPlanet.travelTime.split('-')[0]);
        arrivalDate.setFullYear(arrivalDate.getFullYear() + years);
      }
      
      setTripDetails({
        missionId,
        planet: selectedPlanet,
        launchDate: launch,
        arrivalDate,
        crew,
        distance: selectedPlanet.distance,
        travelTime: selectedPlanet.travelTime,
        status: 'Preparing for launch',
        supplies: {
          food: `${crew * 3 * 30 * (selectedPlanet.travelTime.includes('year') ? 12 : 1)} meals`,
          water: `${crew * 4 * 30 * (selectedPlanet.travelTime.includes('year') ? 12 : 1)} liters`,
          oxygen: `${crew * 24 * 30 * (selectedPlanet.travelTime.includes('year') ? 12 : 1)} hours`
        }
      });
      
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Planet Trip Simulator</h1>
        <p className="text-gray-300">
          Plan your journey to another planet in our solar system
        </p>
        <div className="mt-4">
          <Link to="/" className="btn bg-gray-700 hover:bg-gray-600 text-white">
            Back to Dashboard
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded relative mb-8" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1">
          <div className="card mb-6">
            <h2 className="text-xl font-bold mb-4">Select Destination</h2>
            <div className="grid grid-cols-2 gap-2">
              {PLANETS.map((planet) => (
                <button
                  key={planet.id}
                  onClick={() => handlePlanetSelect(planet)}
                  className={`p-2 rounded-lg transition-all ${selectedPlanet?.id === planet.id
                    ? 'bg-blue-900 border-2 border-blue-500'
                    : 'bg-gray-800 hover:bg-gray-700 border-2 border-transparent'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden">
                      <img
                        src={planet.image}
                        alt={planet.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/100?text=Planet';
                        }}
                      />
                    </div>
                    <div className="text-sm font-medium">{planet.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Launch Details</h2>
            <form onSubmit={handleLaunch}>
              {selectedPlanet && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-16 h-16 mr-4 rounded-full overflow-hidden">
                      <img
                        src={selectedPlanet.image}
                        alt={selectedPlanet.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedPlanet.name}</h3>
                      <p className="text-sm text-gray-400">
                        {selectedPlanet.distance} million km • {selectedPlanet.travelTime}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{selectedPlanet.description}</p>
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="launchDate" className="block text-sm font-medium text-gray-400 mb-1">
                  Launch Date
                </label>
                <input
                  type="date"
                  id="launchDate"
                  value={launchDate}
                  onChange={(e) => setLaunchDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating trajectory...
                  </span>
                ) : 'Launch Mission'}
              </button>
            </form>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2">
          {tripDetails ? (
            <div className="card h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Mission to {tripDetails.planet.name}</h2>
                  <p className="text-gray-400">Mission ID: {tripDetails.missionId}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                  {tripDetails.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Mission Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Launch Date:</span>
                      <span>{tripDetails.launchDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Estimated Arrival:</span>
                      <span>{tripDetails.arrivalDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Travel Distance:</span>
                      <span>{tripDetails.distance} million km</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Crew Size:</span>
                      <span>{tripDetails.crew} astronauts</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Supply Manifest</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Food Supply:</span>
                      <span>{tripDetails.supplies.food}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Water Supply:</span>
                      <span>{tripDetails.supplies.water}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">Oxygen Supply:</span>
                      <span>{tripDetails.supplies.oxygen}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Mission Progress</h3>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        {tripDetails.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        0%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                    <div 
                      style={{ width: '0%' }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-1000 ease-in-out"
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Mission Briefing</h3>
                <p className="text-gray-300 mb-4">
                  Your mission to {tripDetails.planet.name} will be one of the most ambitious space journeys ever attempted. 
                  The {tripDetails.distance} million kilometer journey will take approximately {tripDetails.travelTime}.
                </p>
                <p className="text-gray-300">
                  During your mission, you'll conduct experiments, take samples, and document your findings. 
                  Good luck, astronaut!
                </p>
              </div>
            </div>
          ) : (
            <div className="card h-full flex flex-col items-center justify-center text-center p-8">
              {apodData ? (
                <>
                  <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full border-4 border-blue-500">
                    <img 
                      src={apodData.url} 
                      alt={apodData.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/200?text=Space';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ready for Launch</h3>
                  <p className="text-gray-400 mb-6">
                    Select a destination and launch date to begin planning your space mission.
                  </p>
                  <div className="text-sm text-gray-500">
                    <p>"{apodData.title}"</p>
                    <p className="text-xs">NASA Astronomy Picture of the Day</p>
                  </div>
                </>
              ) : (
                <div className="animate-pulse">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gray-700 rounded-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-48 mb-4"></div>
                  <div className="h-3 bg-gray-700 rounded w-64"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanetTrip;