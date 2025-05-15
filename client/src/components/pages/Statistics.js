import '../../styles.css';
import React, {useEffect, useState} from 'react';

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
            <div style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block', textAlign: 'left'}}>
                    <h1>Plant Statistics</h1>
                    <h2>Total Plants: {statistics.total_plants}</h2>
                    <p>Earliest Year: {statistics.earliest_year}</p>
                    <p>Latest Year: {statistics.latest_year}</p>

                    {/* Table for Families, Genera, and Authors */}
                    <h2>Statistics Overview</h2>
                    <table border="1" style={{width: '100%', textAlign: 'left'}}>
                        <thead>
                        <tr>
                            <th>Families</th>
                            <th>Genera</th>
                            <th>Authors</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(statistics.families).map((key, index) => (
                            <tr key={index}>
                                <td>{key}: {statistics.families[key]}</td>
                                <td>
                                    {Object.keys(statistics.genera)[index]
                                        ? `${Object.keys(statistics.genera)[index]}: ${statistics.genera[Object.keys(statistics.genera)[index]]}`
                                        : ''}
                                </td>
                                <td>
                                    {Object.keys(statistics.authors)[index]
                                        ? `${Object.keys(statistics.authors)[index]}: ${statistics.authors[Object.keys(statistics.authors)[index]]}`
                                        : ''}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
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
                                    <img src={plant.image_url} alt={plant.name} width="100"/>
                                ) : (
                                    "No Image"
                                )}
                            </td>
                        ))}
                        {/* Fill empty cells if the row has less than 5 items */}
                        {row.length < 5 &&
                            Array.from({length: 5 - row.length}).map((_, index) => (
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