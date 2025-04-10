import './App.css'; 
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { getChaiwalas } from './service/api';

import LandingPage from "./pages/landingPage";
import AddChaiwalaPage from "./pages/chaiwalaPage";
import UpdateChaiwalaPage from "./pages/UpdateChaiwala";

function App() {
  const [chaiwalas, setChaiwalas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChaiwalas = async () => {
      try {
        const chaiwalaData = await getChaiwalas();
        if (chaiwalaData && chaiwalaData.length > 0) {
          setChaiwalas(chaiwalaData);
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
    <Router>
  {/* Move navbar out of app-container */}
  <nav className="navbar">
    <Link to="/">🏠 Home</Link>
    <Link to="/add-chaiwala">➕ Add Chaiwala</Link>
  </nav>

  <div className="app-container">
    <Routes>
      <Route path="/" element={<LandingPage chaiwalas={chaiwalas} error={error} />} />
      <Route path="/add-chaiwala" element={<AddChaiwalaPage />} />
      <Route path="/update-chaiwala/:id" element={<UpdateChaiwalaPage />} />
    </Routes>
  </div>
</Router>

  );
}

export default App;
