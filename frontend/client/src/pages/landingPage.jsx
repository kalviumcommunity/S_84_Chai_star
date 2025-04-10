import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import "../styles/landingPage.css";
import axios from "../service/axios";

const LandingPage = ({ chaiwalas, error }) => {
  const [showList, setShowList] = useState(false);
  const navigate = useNavigate();

  const toggleChaiwalas = () => {
    setShowList((prev) => !prev);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/chaiwalas/${id}`);
      window.location.reload(); // Reload to refresh the updated list
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete chaiwala.");
    }
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">ChaiStar: Find & Rank the Best Chaiwalas!</h1>
      <p className="landing-description">
        Discover top-rated chai spots, vote for your favorite chaiwala, and explore the best chai experiences around you.
      </p>

      {/* Buttons */}
      <div className="landing-buttons">
        <Link to="/add-chaiwala" className="explore-button">Add New Chaiwala</Link>
        <Link to="/login" className="join-button">Join & Vote</Link>
      </div>

      <button onClick={toggleChaiwalas} className="show-chaiwalas-button">
        {showList ? "Hide Top Chaiwalas" : "Show Top Chaiwalas"}
      </button>

      <div className={`chaiwala-list-container ${showList ? "show" : ""}`}>
        <h2 className="chaiwala-list-title">🔥 Top Chaiwalas</h2>
        {error && <p className="error-message">Error: {error}</p>}
        {chaiwalas.length === 0 ? (
          <p className="no-chaiwala-message">No chaiwalas found. Be the first to rank one!</p>
        ) : (
          <ul className="chaiwala-list">
            {chaiwalas.map((chaiwala) => (
              <li key={chaiwala._id} className="chaiwala-item">
                <img src={chaiwala.image} alt={chaiwala.name} className="chaiwala-image" />
                <div className="chaiwala-info">
                  <strong>{chaiwala.name}</strong> - {chaiwala.location} - ⭐ {chaiwala.rating}
                  <div className="action-buttons">
                    <button onClick={() => navigate(`/update-chaiwala/${chaiwala._id}`)}>Edit</button>
                    <button onClick={() => handleDelete(chaiwala._id)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Features */}
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
