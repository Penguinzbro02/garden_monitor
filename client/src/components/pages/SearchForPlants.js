import React, { useState, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';

const TREFLE_API_KEY = '';
const TREFLE_BASE_URL = 'http://127.0.0.1:5000/api/plants';

const logoutBtnStyle = {
    position: 'fixed',
    top: 20,
    right: 24,
    zIndex: 200,
    background: '#fff',
    color: '#222',
    border: '1px solid #7fa6b6',
    borderRadius: '6px',
    padding: '8px 16px',
    fontFamily: 'Architects Daughter, cursive',
    fontSize: '1.1em',
    cursor: 'pointer',
    fontWeight: 600
};

const SearchForPlants = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dropdown, setDropdown] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const inputRef = useRef();

    
    // Debounced fetch for autocomplete
    const debouncedFetch = useCallback(
        debounce(async (val) => {
            try {
                const resp = await fetch(`${TREFLE_BASE_URL}?q=${encodeURIComponent(val)}&token=${TREFLE_API_KEY}`);
                if (!resp.ok) throw new Error('Failed to fetch results');
                const data = await resp.json();
                console.log('Autocomplete results:', data.data.length);
                setDropdown(data.data.slice(0, 10)); // Limit to 10 items
            } catch (err) {
                console.error(err);
                setError('Error fetching plant data.');
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );

    const handleInputChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        setSelectedPlant(null);
        setError('');
        setDropdown([]);
        if (val.length < 2) return;
        setLoading(true);
        debouncedFetch(val);
    };

    const handleSelect = (plant) => {
        setSelectedPlant(plant);
        setQuery(plant.common_name || plant.scientific_name);
        setDropdown([]);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResults([]);
        setSelectedPlant(null);
        try {
            const resp = await fetch(`${TREFLE_BASE_URL}?q=${encodeURIComponent(query)}&token=${TREFLE_API_KEY}`);
            if (!resp.ok) throw new Error('Failed to fetch results');
            const data = await resp.json();
            console.log('Search results:', data.data.length);
            setResults(data.data || []);
            if (data.data.length > 0) {
                setSelectedPlant(data.data[0]);
            } else {
                setError('No results found.');
            }
        } catch (err) {
            console.error(err);
            setError('Error fetching plant data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <button style={logoutBtnStyle} onClick={() => window.location.href = '/Login'}>Log Out</button>
            <h2 style={{ marginTop: '48px', fontFamily: 'Architects Daughter, cursive' }}>Search for Plants</h2>
            <form onSubmit={handleSearch} style={{ display: 'flex', margin: '16px 0', position: 'relative', width: '360px' }} autoComplete="off">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for Plants"
                    value={query}
                    onChange={handleInputChange}
                    style={{
                        width: '100%',
                        height: '36px',
                        fontSize: '1.1em',
                        border: '1px solid #7fa6b6',
                        borderRadius: '4px',
                        padding: '0 12px',
                        outline: 'none',
                        fontFamily: 'inherit',
                        background: '#fff',
                        boxSizing: 'border-box',
                        verticalAlign: 'middle',
                        marginRight: '0',
                    }}
                />
                <button type="submit" style={{
                    height: '36px',
                    width: '40px',
                    border: '1px solid #7fa6b6',
                    borderRadius: '0 4px 4px 0',
                    background: '#fff',
                    cursor: 'pointer',
                    verticalAlign: 'middle',
                    marginLeft: '-40px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    position: 'absolute',
                    right: '0',
                    top: '20px',
                }}>
                    <img src="/search-icon.png" alt="Search" style={{ width: '22px', height: '22px' }} />
                </button>
                {dropdown.length > 0 && (
                    <ul style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: '38px',
                        background: '#fff',
                        border: '1px solid #7fa6b6',
                        borderTop: 'none',
                        zIndex: 10,
                        maxHeight: '200px',
                        overflowY: 'auto',
                        listStyle: 'none',
                        margin: 0,
                        padding: 0
                    }}>
                        {dropdown.map(plant => (
                            <li key={plant.id}
                                style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}
                                onClick={() => handleSelect(plant)}
                            >
                                <span style={{ fontWeight: 'bold' }}>{plant.common_name || plant.scientific_name}</span>
                                <span style={{ marginLeft: 8, color: '#888' }}>{plant.scientific_name}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </form>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div style={{ marginTop: '24px', width: '90%', maxWidth: '700px' }}>
                {selectedPlant && (
                    <textarea
                        readOnly
                        value={
                            `Common Name: ${selectedPlant.common_name || 'N/A'}\n` +
                            `Scientific Name: ${selectedPlant.scientific_name || 'N/A'}\n` +
                            `Family: ${selectedPlant.family_common_name || 'N/A'}\n` +
                            `Year Discovered: ${selectedPlant.year || 'N/A'}\n` +
                            (selectedPlant.image_url ? `Image: ${selectedPlant.image_url}\n` : '') +
                            `More info: https://trefle.io/plants/${selectedPlant.id}`
                        }
                        style={{
                            width: '100%',
                            minHeight: '130px',
                            fontFamily: 'monospace',
                            fontSize: '1em',
                            padding: '12px',
                            border: '1px solid #7fa6b6',
                            borderRadius: '4px',
                            background: '#f7faf7'
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default SearchForPlants;
