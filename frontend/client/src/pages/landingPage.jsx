import React, { useState } from "react";
import "../styles/landingPage.css";

const LandingPage = () => {
  const [chaiwalas, setChaiwalas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showList, setShowList] = useState(false);

  const toggleChaiwalas = async () => {
    if (showList) {
      setShowList(false); // Hide list
    } else {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:3000/api/chaiwalas"); // Adjust the URL if needed
        if (!response.ok) throw new Error("Failed to fetch chaiwalas");

        const data = await response.json();
        setChaiwalas(data.data);
        setShowList(true); // Show list after fetching
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">ChaiStar: Find & Rank the Best Chaiwalas!</h1>
      <p className="landing-description">
        Discover top-rated chai spots, vote for your favorite chaiwala, and explore the best chai experiences around you.
      </p>

      {/* Explore & Join Buttons */}
      <div className="landing-buttons">
        <a href="/explore" className="explore-button">Explore Chaiwalas</a>
        <a href="/login" className="join-button">Join & Vote</a>
      </div>

      {/* Show/Hide Top Chaiwalas Button */}
      <button onClick={toggleChaiwalas} className="show-chaiwalas-button">
        {loading ? "Loading..." : showList ? "Hide Top Chaiwalas" : "Show Top Chaiwalas"}
      </button>

      {/* Chaiwala Rankings Section with Animation */}
      <div className={`chaiwala-list-container ${showList ? "show" : ""}`}>
        <h2 className="chaiwala-list-title">🔥 Top Chaiwalas</h2>

        {error && <p className="error-message">Error: {error}</p>}
        {chaiwalas.length === 0 && !loading ? (
          <p className="no-chaiwala-message">No chaiwalas found. Be the first to rank one!</p>
        ) : (
          <ul className="chaiwala-list">
            {chaiwalas.map((chaiwala) => (
              <li key={chaiwala._id} className="chaiwala-item">
                <img src={chaiwala.image} alt={chaiwala.name} className="chaiwala-image" />
                <div className="chaiwala-info">
                  <strong>{chaiwala.name}</strong> - {chaiwala.location} - ⭐ {chaiwala.rating}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Features Section */}
      <div className="features-container">
        <div className="feature-card">
          <h2 className="feature-title">Find Local Chai</h2>
          <p className="feature-description">Browse chaiwalas near you and read authentic reviews.</p>
        </div>
        <div className="feature-card">
          <h2 className="feature-title">Rank & Vote</h2>
          <p className="feature-description">Vote for your favorite chaiwala and help others discover the best chai.</p>
        </div>
        <div className="feature-card">
          <h2 className="feature-title">Share & Enjoy</h2>
          <p className="feature-description">Share your chai experiences with friends and fellow chai lovers.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
