import React from 'react'
import { useEffect, useState } from 'react'
import { Form } from '../plant_log'
const Log = () => {
    const [column, setColumn] = useState([]) // stores the keys of the logs object
    const [records, setRecords] = useState([]) // stores all logs object from file

    useEffect(() => {
        fetch('http://127.0.0.1:5000/data/logs.json')
            .then(res => res.json())
            .then(data => {
                setColumn(Object.keys(data[0]));
                setRecords(data);
            })
    }, [])
    return (
        <div>
            <h1>Plant Log</h1>
            <Form />
            <ul>
                {records.map((record, i) => (
                    <li key={i}>
                        <div><strong>Name:</strong> {record.name}</div>
                        <div><strong>Plant Start Date:</strong> {record.plantStartDate}</div>
                        <div><strong>Height:</strong> {record.height || 'N/A'}</div>
                        <div><strong>Water:</strong> {record.water || 'N/A'}</div>
                        <div><strong>Fertilizer:</strong> {record.fertilizer || 'N/A'}</div>
                        <div><strong>Photo:</strong> {record.photo || 'N/A'}</div>
                        <div><strong>Notes:</strong> {record.notes || 'N/A'}</div>
                    </li>
                ))}
            </ul>

        </div>

    );

};

export default Log;