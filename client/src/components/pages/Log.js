import React, { useEffect, useState } from 'react';
import { Form } from '../plant_log';

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

const Log = () => {
    const [columns, setColumns] = useState([]);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        let ignore = false;

        const fetchData = async () => {
            try {
                const res = await fetch('http://127.0.0.1:5000/data/logs.json');
                const data = await res.json();

                if (!ignore && Array.isArray(data)) {
                    if (data.length > 0) {
                        setColumns(Object.keys(data[0]));
                        setRecords(data);
                    } else {
                        setColumns([]);
                        setRecords([]);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch logs.json:', err);
                setRecords([]);
            }
        };

        fetchData();
        return () => { ignore = true; };
    }, []);

    return (
        <div style={{ padding: '24px' }}>
            <h1>Plant Log</h1>
            <Form />

            <ul style={{ padding: 0, listStyle: 'none' }}>
                {records.slice(0, 20).map((record, i) => (
                    <li key={i} style={{
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        padding: '12px',
                        marginBottom: '12px',
                        background: '#f9f9f9'
                    }}>
                        <div><strong>Name:</strong> {record.name}</div>
                        <div><strong>Plant Start Date:</strong> {record.plantStartDate}</div>
                        <div><strong>Height:</strong> {record.height || 'N/A'}</div>
                        <div><strong>Water:</strong> {record.water || 'N/A'}</div>
                        <div><strong>Fertilizer:</strong> {record.fertilizer || 'N/A'}</div>
                        <div><strong>Notes:</strong> {record.notes || 'N/A'}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Log;
