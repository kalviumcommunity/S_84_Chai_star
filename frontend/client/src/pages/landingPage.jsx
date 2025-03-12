import React from "react";
import "../styles/landingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">ChaiStar: Find & Rank the Best Chaiwalas!</h1>
      <p className="landing-description">
        Discover top-rated chai spots, vote for your favorite chaiwala, and explore the best chai experiences around you.
      </p>
      <div className="landing-buttons">
        <a href="/explore" className="explore-button">Explore Chaiwalas</a>
        <a href="/login" className="join-button">Join & Vote</a>
      </div>
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
