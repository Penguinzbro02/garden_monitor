import React, {useEffect, useState} from 'react';
import {Form} from '../plant_log';

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

const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    padding: '16px',
};

const gridItemStyle = {
    border: '1px solid #ccc',
    borderRadius: '6px',
    padding: '12px',
    background: '#f9f9f9',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const Log = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        let ignore = false;

        const fetchData = async () => {
            try {
                const res = await fetch('http://127.0.0.1:5000/data/logs.json');
                const data = await res.json();

                if (!ignore && Array.isArray(data)) {
                    if (data.length > 0) {
                        setRecords(data);
                    } else {
                        setRecords([]);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch logs.json:', err);
                setRecords([]);
            }
        };

        fetchData();
        return () => {
            ignore = true;
        };
    }, []);

    return (
        <div style={{padding: '24px'}}>
            <h1>Plant Log</h1>
            <Form onAddRecord={(newRecord) => setRecords(prev => [newRecord, ...prev])}/>

            <div style={gridContainerStyle}>
                {records.slice(0, 20).map((record, i) => (
                    <div key={i} style={gridItemStyle}>
                        <div><strong>Name:</strong> {record.name}</div>
                        <div><strong>Plant Start
                            Date:</strong> {record.plantStartDate ? new Date(record.plantStartDate).toLocaleDateString() : 'N/A'}
                        </div>
                        <div><strong>Height:</strong> {record.height || 'N/A'}</div>
                        <div>
                            <strong>Water:</strong> {record.water ? new Date(record.water).toLocaleDateString() : 'N/A'}
                        </div>
                        <div>
                            <strong>Fertilizer:</strong> {record.fertilizer ? new Date(record.fertilizer).toLocaleDateString() : 'N/A'}
                        </div>
                        <div><strong>Notes:</strong> {record.notes || 'N/A'}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Log;