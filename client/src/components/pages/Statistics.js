import React, { useEffect, useState } from 'react';

function Statistics() {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    // Fetch statistics from the Python backend
    fetch('http://127.0.0.1:5000/api/statistics')
      .then((response) => response.json())
      .then((data) => setStatistics(data))
      .catch((error) => console.error('Error fetching statistics:', error));
  }, []);

  if (!statistics) {
    return <div>Loading statistics...</div>;
  }

  // Group plants into rows of 5 for a 2x5 layout
  const groupedPlants = [];
  for (let i = 0; i < statistics.sample_plants.length; i += 5) {
    groupedPlants.push(statistics.sample_plants.slice(i, i + 5));
  }

  return (
    <div>
      {/* Centered content */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block', textAlign: 'left' }}>
          <h1>Plant Statistics</h1>
          <p>Total Plants: {statistics.total_plants}</p>
          <h2>Families</h2>
          <ul>
            {Object.entries(statistics.families).map(([family, count]) => (
              <li key={family}>{family}: {count}</li>
            ))}
          </ul>
          <h2>Genera</h2>
          <ul>
            {Object.entries(statistics.genera).map(([genus, count]) => (
              <li key={genus}>{genus}: {count}</li>
            ))}
          </ul>
          <h2>Authors</h2>
          <ul>
            {Object.entries(statistics.authors).map(([author, count]) => (
              <li key={author}>{author}: {count}</li>
            ))}
          </ul>
          <p>Earliest Year: {statistics.earliest_year}</p>
          <p>Latest Year: {statistics.latest_year}</p>
        </div>
      </div>

      {/* Table for sample plants */}
      <h2>Sample Plants</h2>
      <table border="1">
        <tbody>
          {groupedPlants.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((plant, colIndex) => (
                <td key={colIndex}>
                  <div>
                    <strong>{plant.name}</strong>
                  </div>
                  {plant.image_url ? (
                    <img src={plant.image_url} alt={plant.name} width="100" />
                  ) : (
                    "No Image"
                  )}
                </td>
              ))}
              {/* Fill empty cells if the row has less than 5 items */}
              {row.length < 5 &&
                Array.from({ length: 5 - row.length }).map((_, index) => (
                  <td key={`empty-${index}`}></td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Statistics;