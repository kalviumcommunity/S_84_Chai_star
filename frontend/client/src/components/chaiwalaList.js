import { useEffect, useState } from "react";

const ChaiwalaList = () => {
  const [chaiwalas, setChaiwalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChaiwalas = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/chaiwalas"); // Adjust URL if needed
        if (!response.ok) throw new Error("Failed to fetch chaiwalas");
        
        const data = await response.json();
        setChaiwalas(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChaiwalas();
  }, []);

  if (loading) return <p>Loading chaiwalas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Chaiwala Rankings</h2>
      {chaiwalas.length === 0 ? (
        <p>No chaiwalas found.</p>
      ) : (
        <ul>
          {chaiwalas.map(chaiwala => (
            <li key={chaiwala._id}>
              <strong>{chaiwala.name}</strong> - {chaiwala.location} - ⭐ {chaiwala.rating}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChaiwalaList;
