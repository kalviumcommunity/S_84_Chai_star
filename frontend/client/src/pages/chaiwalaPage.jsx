import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addChaiwala } from "../service/api";
import "../styles/chaiwalaPage.css";

const AddChaiwalaPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: 5,
    image: "",
    created_by: "", // simple text field
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleRatingClick = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.created_by) {
      setError("Please enter Created By field.");
      return;
    }

    try {
      await addChaiwala(formData);
      navigate("/"); // Redirect after adding
    } catch (err) {
      console.error(err);
      setError("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Chaiwala</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Chaiwala Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        {/* Created By (Simple Text Field) */}
        <input
          type="text"
          name="created_by"
          placeholder="Created By"
          value={formData.created_by}
          onChange={handleChange}
          required
        />

        {/* Rating Section */}
        <div className="rating-container">
          Rating:
          <div className="rating-options">
            {[1, 2, 3, 4, 5].map((value) => (
              <label
                key={value}
                className={`rating-box ${formData.rating === value ? "selected" : ""}`}
                onClick={() => handleRatingClick(value)}
              >
                {value}
              </label>
            ))}
          </div>
        </div>

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit">Add Chaiwala</button>
      </form>
    </div>
  );
};

export default AddChaiwalaPage;
