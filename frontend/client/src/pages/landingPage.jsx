import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../service/axios";
import "../styles/landingPage.css";

const LandingPage = ({ chaiwalas, error }) => {
  const [showList, setShowList] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    rating: "",
    created_by: "",
  });
  const [filteredChaiwalas, setFilteredChaiwalas] = useState([]);
  const navigate = useNavigate();

  const toggleChaiwalas = () => {
    setShowList((prev) => !prev);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/chaiwalas/${id}`);
      window.location.reload();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete chaiwala.");
    }
  };

  useEffect(() => {
    const filtered = chaiwalas.filter((chaiwala) => {
      const matchesName = chaiwala.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesLocation = chaiwala.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesRating = filters.rating ? chaiwala.rating === parseInt(filters.rating) : true;
      const matchesCreator = filters.created_by
        ? (chaiwala.created_by || "").toLowerCase().includes(filters.created_by.toLowerCase())
        : true;

      return matchesName && matchesLocation && matchesRating && matchesCreator;
    });

    setFilteredChaiwalas(filtered);
  }, [filters, chaiwalas]);

  return (
    <div className="landing-container">
      <h1 className="landing-title">ChaiStar: Find & Rank the Best Chaiwalas!</h1>
      <p className="landing-description">
        Discover top-rated chai spots, vote for your favorite chaiwala, and explore the best chai experiences around you.
      </p>

      <div className="landing-buttons">
        <Link to="/add-chaiwala" className="explore-button">Add New Chaiwala</Link>
        <Link to="/login" className="join-button">Join & Vote</Link>
      </div>

      <button onClick={toggleChaiwalas} className="show-chaiwalas-button">
        {showList ? "Hide Top Chaiwalas" : "Show Top Chaiwalas"}
      </button>

      {showList && (
        <div className="chaiwala-list-container show">
          <h2 className="chaiwala-list-title">🔥 Top Chaiwalas</h2>

          {/* Filter Line */}
          <div className="filters-inline">
            <select
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            >
              <option value="">Name</option>
              {chaiwalas.map((chaiwala) => (
                <option key={chaiwala._id} value={chaiwala.name}>
                  {chaiwala.name}
                </option>
              ))}
            </select>

            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            >
              <option value="">Location</option>
              {chaiwalas.map((chaiwala) => (
                <option key={chaiwala._id} value={chaiwala.location}>
                  {chaiwala.location}
                </option>
              ))}
            </select>

            <select
              value={filters.rating}
              onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            >
              <option value="">Rating⭐</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} ⭐
                </option>
              ))}
            </select>

            <select
              value={filters.created_by}
              onChange={(e) => setFilters({ ...filters, created_by: e.target.value })}
            >
              <option value="">Created By</option>
              {chaiwalas.map((chaiwala) => (
                <option key={chaiwala._id} value={chaiwala.created_by}>
                  {chaiwala.created_by || "Unknown"}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="error-message">Error: {error}</p>}
          {filteredChaiwalas.length === 0 ? (
            <p className="no-chaiwala-message">No chaiwalas found. Be the first to rank one!</p>
          ) : (
            <ul className="chaiwala-list">
              {filteredChaiwalas.map((chaiwala) => (
                <li key={chaiwala._id} className="chaiwala-item">
                  <img src={chaiwala.image} alt={chaiwala.name} className="chaiwala-image" />
                  <div className="chaiwala-info">
                    <strong>{chaiwala.name}</strong> - {chaiwala.location} - ⭐ {chaiwala.rating}
                    {chaiwala.created_by && (
                      <p className="creator-text">By: {chaiwala.created_by}</p>
                    )}
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
      )}

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
