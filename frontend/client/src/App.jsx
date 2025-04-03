import './App.css'; 
import LandingPage from "./pages/LandingPage";
import { useEffect, useState } from 'react';
import { getChaiwalas } from './service/api'; // Import API function

function App() {
  const [chaiwalas, setChaiwalas] = useState([]);
  const [error, setError] = useState(null);

  // Fetch chaiwalas data from the backend on load
  useEffect(() => {
    const fetchChaiwalas = async () => {
      try {
        const chaiwalaData = await getChaiwalas();
        if (chaiwalaData && chaiwalaData.length > 0) {
          setChaiwalas(chaiwalaData); // Store the data in state
        } else {
          setError('No chaiwalas found.');
        }
      } catch (err) {
        setError('Failed to fetch chaiwalas. Please try again later.');
        console.error('Error fetching chaiwalas:', err.message);
      }
    };

    fetchChaiwalas();
  }, []);

  return (
    <div className="landing-container">
      {error ? <p className="error-message">{error}</p> : <LandingPage chaiwalas={chaiwalas} />}
    </div>
  );
}

export default App;
