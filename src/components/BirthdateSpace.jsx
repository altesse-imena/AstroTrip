import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BirthdateSpace = ({ birthdate: propBirthdate }) => {
  const [birthdate, setBirthdate] = useState(propBirthdate || '');
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApod = async (date) => {
    if (!date) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Format date to YYYY-MM-DD
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${formattedDate}`
      );
      
      setApodData(response.data);
    } catch (err) {
      console.error('Error fetching APOD:', err);
      setError('Failed to fetch data. The date might be in the future or invalid.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (birthdate) {
      fetchApod(birthdate);
    }
  }, [birthdate]);

  const handleDateChange = (e) => {
    setBirthdate(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Your Birthday in Space</h1>
        <p className="text-gray-300">
          See what the universe looked like on your special day
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="date"
            value={birthdate}
            onChange={handleDateChange}
            className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
            max={new Date().toISOString().split('T')[0]}
          />
          <Link to="/" className="btn bg-gray-700 hover:bg-gray-600 text-white">
            Back to Dashboard
          </Link>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-300">Loading cosmic data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {apodData && !loading && !error && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">{apodData.title}</h2>
            
            {apodData.media_type === 'image' ? (
              <img 
                src={apodData.url} 
                alt={apodData.title} 
                className="w-full h-auto rounded-lg mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x450?text=Image+Not+Available';
                }}
              />
            ) : (
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  src={apodData.url}
                  title={apodData.title}
                  className="w-full h-96 rounded-lg"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            )}
            
            <div className="text-gray-300 space-y-4">
              <p className="text-sm text-gray-400">
                Date: {new Date(apodData.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              
              <p>{apodData.explanation}</p>
              
              {apodData.copyright && (
                <p className="text-sm text-gray-400">
                  © {apodData.copyright}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdateSpace;
