import React from "react";
import LandingPage from "./pages/landingpage";
import Chaicard from './components/chaiwalaCard' 
import "./App.css";

const dummyChaiwala = {
  name: "Sharma Ji Ki Chai",
  location: "Mumbai, India",
  rating: 4.8,
  image: "https://images.hindi.news18.com/ibnkhabar/uploads/2021/10/733738_FEATURE20210930_185024.jpg",
};

function App() {
  return (
    <div className="app-container">
      <LandingPage />
      <div className="chaiwala-section">
        <h2>Top Chaiwalas</h2>
        <Chaicard{...dummyChaiwala} />
      </div>
    </div>
  );
}

export default App;

