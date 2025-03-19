import React from "react";
import "../styles/ChaiwalaCard.css";


const ChaiwalaCard = ({ name, location, rating, image }) => {
  return (
    <div className="chaiwala-card">
      <img src={image} alt={name} className="chaiwala-image" />
      <h2 className="chaiwala-name">{name}</h2>
      <p className="chaiwala-location">{location}</p>
      <p className="chaiwala-rating">⭐ {rating}/5</p>
    </div>
  );
};

export default ChaiwalaCard;
