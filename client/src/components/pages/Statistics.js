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

  return (
    <div>
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
  );
}

export default Statistics;