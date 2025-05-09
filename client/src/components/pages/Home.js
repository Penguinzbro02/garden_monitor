import React, { useEffect, useState } from 'react';
import Login from "./Login";
import Logout from "./Logout";

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

    useEffect(() => {
        const timer = setInterval(() => setClock(getCurrentTime()), 1000);
        return () => clearInterval(timer);
    }, []);

    const openGoogleCalendar = () => {
        if (user && user.email) {
            const calendarUrl = `https://calendar.google.com/calendar/u/0/r?authuser=${user.email}`;
            window.open(calendarUrl, "_blank"); // Open Google Calendar in a new tab
        }
    };

    // 👇 Wrapper to center everything relative to the screen
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
        marginBottom: '50px', // 👈 adds space between time and cards
        transform: 'translateY(-300px)', // 👈 moves time box upward visually
    };

    const logoutBtnStyle = {
        position: 'fixed',
        top: 20,
        right: 30,
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

    const userNameStyle = {
        position: "fixed",
        top: 20,
        right: 150,
        zIndex: 200,
        fontFamily: "Architects Daughter, cursive",
        fontSize: "1.1em",
        color: "#222",
        fontWeight: 600,
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

    const calendarBtnStyle = {
        position: "fixed",
        top: 20,
        right: 300,
        zIndex: 200,
        background: "#fff",
        color: "#222",
        border: "1px solid #7fa6b6",
        borderRadius: "6px",
        padding: "8px 16px",
        fontFamily: "Architects Daughter, cursive",
        fontSize: "1.1em",
        cursor: "pointer",
        fontWeight: 600,
    };

    const plantStatus = ["Water your plants", "Change your compost", "Etc"];
    const todoList = ["Tend to your pumpkins", "Change your compost", "Water plants"];
    const alerts = ["Water your plants", "Change your compost", "Etc"];

    return (
        <>
            <div>
                {user && (
                    <div style={userNameStyle}>
                        Hello {user.givenName} {user.familyName}
                    </div>
                )}
                {user ? (
                    <>
                        <button style={calendarBtnStyle} onClick={openGoogleCalendar}>
                            Open Calendar
                        </button>
                        <Logout onLogout={onLogout} buttonStyle={logoutBtnStyle} />
                    </>
                ) : (
                    <Login onLogin={onLogin} buttonStyle={logoutBtnStyle} />
                )}

            </div>

            <div style={centeredWrapperStyle}>
                <div style={timeBoxStyle}>
                    <div style={{ fontSize: '1.7em', marginBottom: '8px' }}>{clock.fullDate}</div>
                    <div style={{ fontSize: '3.2em', fontWeight: 600, letterSpacing: '1px' }}>{clock.time}</div>
                </div>

                <div style={gridStyle}>
                    <div style={cardStyle}>
                        <div style={cardTitleStyle}>Plant Status</div>
                        <ul style={{ paddingLeft: '20px', margin: '0', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                            {plantStatus.map((item, i) => <li key={i} style={{ margin: '8px 0' }}>{item}</li>)}
                        </ul>
                    </div>
                    <div style={cardStyle}>
                        <div style={cardTitleStyle}>To Do List</div>
                        <ul style={{ paddingLeft: '20px', margin: '0', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                            {todoList.map((item, i) => <li key={i} style={{ margin: '8px 0' }}>{item}</li>)}
                        </ul>
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
