import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../service/axios";

const UpdateChaiwala = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/chaiwalas/${id}`).then((res) => {
      if (res.data.success) setFormData(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.error("Fetch failed", err);
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rating = Math.min(Math.max(Number(formData.rating), 1), 5);
    await axios.put(`/chaiwalas/${id}`, formData);
    navigate("/");
  };

  if (loading) return <p>Loading chaiwala data...</p>;

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={headingStyle}>Update Chaiwala</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder="Name"
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        placeholder="Location"
        onChange={handleChange}
        style={inputStyle}
      />
      <input
  type="number"
  name="rating"
  value={formData.rating}
  placeholder="Rating"
  onChange={handleChange}
  style={inputStyle}
  min="1"
  max="5"
/>

      <input
        type="text"
        name="image"
        value={formData.image}
        placeholder="Image URL"
        onChange={handleChange}
        style={inputStyle}
      />
   <button className="update-button">Update</button>

    </form>
  );
};

const formStyle = {
  maxWidth: "400px",
  margin: "30px auto",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};

const headingStyle = {
  textAlign: "center",
};

const inputStyle = {
  padding: "8px",
  fontSize: "16px",
  border: "1px solid #aaa",
  borderRadius: "4px",
};

export default UpdateChaiwala;
