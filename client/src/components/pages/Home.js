import React, { useEffect, useState } from 'react';

function getCurrentTime() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return {
        fullDate: `${day}, ${month} ${date}`,
        time: `${hours}:${minutes} ${ampm}`
    };
}

const Home = ({ user, onLogin, onLogout }) => {
    const [clock, setClock] = useState(getCurrentTime());
    const [plantLogs, setPlantLogs] = useState([]);

    const [todoList, setTodoList] = useState(() => { //should save to-do list contents past reloads
    const saved = localStorage.getItem("todoList");
        return saved ? JSON.parse(saved) : [];
    });
    const [newTodo, setNewTodo] = useState('');

    const alerts = ["Subscribe to our Newsletter!", "More features coming soon!", 
        "New update available! Restart to install."];

    useEffect(() => {
        const timer = setInterval(() => setClock(getCurrentTime()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => { //used for Plant Status, needs JSON that has plant start date, water date, and fertilizer date
    fetch('http://127.0.0.1:5000/api/plant-log')
        .then(res => res.json())
        .then(data => setPlantLogs(data))
        .catch(err => console.error("Error fetching plant logs", err));
}, []);

    useEffect(() => { //To do list info storage
    localStorage.setItem("todoList", JSON.stringify(todoList));
}, [todoList]);


    // Wrapper to center everything relative to the screen
    const centeredWrapperStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px'
    };

    const timeBoxStyle = {
        textAlign: 'center',
        color: '#222',
        fontFamily: 'Architects Daughter, cursive',
        userSelect: 'none',
        marginBottom: '50px', // adds space between time and cards
        transform: 'translateY(-300px)', // moves time box upward visually
    };

    const gridStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '100px',
        width: '150%'
    };

    const cardStyle = {
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        padding: '32px',
        width: '380px',
        height: '460px',
        fontFamily: 'Architects Daughter, cursive',
        fontSize: '1.1em',
        color: '#222',
        border: '1px solid #b2b2b2',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    };

    const cardTitleStyle = {
        fontWeight: 600,
        fontSize: '1.3em',
        marginBottom: '16px',
        textAlign: 'center',
        width: '100%',
        paddingBottom: '8px',
        borderBottom: '1px solid #e0e0e0'
    };

    return (
        <>
            <div style={centeredWrapperStyle}>
                <div style={timeBoxStyle}>
                    <div style={{ fontSize: '1.7em', marginBottom: '8px' }}>{clock.fullDate}</div>
                    <div style={{ fontSize: '3.2em', fontWeight: 600, letterSpacing: '1px' }}>{clock.time}</div>
                </div>

                <div style={gridStyle}>
                    <div style={cardStyle}>
                        <div style={cardTitleStyle}>Plant Status</div>
                        <ul style={{ paddingLeft: '20px', margin: '0', flex: 1 }}>
                            {plantLogs.map((plant, i) => (
                                <li key={i} style={{ marginBottom: '16px' }}>
                                    <strong>{plant.name}</strong><br />
                                    {plant.water && <>Last Watered: {new Date(plant.water).toLocaleDateString()}<br /></>}
                                    {plant.fertilizer && <>Last Fertilized: {new Date(plant.fertilizer).toLocaleDateString()}<br /></>}
                                    {plant.notes && <>Notes: {plant.notes}</>}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={cardStyle}>
                        <div style={cardTitleStyle}>To Do List</div>

                        <ul style={{ paddingLeft: '20px', margin: '0', flex: 1, width: '100%' }}>
                            {todoList.map((item, i) => (
                                <li key={i} style={{ margin: '8px 0' }}>{item}</li>
                            ))}
                        </ul>

                        <div style={{ display: 'flex', marginTop: 'auto', width: '100%' }}>
                            <input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Add new task"
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    fontSize: '1em',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    marginRight: '8px',
                                    fontFamily: 'inherit'
                                }}
                            />
                            <button
                                onClick={() => {
                                    if (newTodo.trim()) {
                                        setTodoList([...todoList, newTodo.trim()]);
                                        setNewTodo('');
                                    }
                                }}
                                style={{
                                    padding: '8px 16px',
                                    fontSize: '1em',
                                    border: 'none',
                                    borderRadius: '4px',
                                    backgroundColor: '#4CAF50',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit'
                                }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    <div style={cardStyle}>
                        <div style={cardTitleStyle}>Alerts</div>
                        <ul style={{ paddingLeft: '20px', margin: '0', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                            {alerts.map((item, i) => <li key={i} style={{ margin: '8px 0' }}>{item}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
