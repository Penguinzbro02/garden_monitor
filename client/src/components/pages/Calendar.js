import React from 'react';

const Calendar = ({ user, isSidebarCollapsed }) => {
    const calendarBtnStyle = {
        position: "fixed",
        top: 20,
        left: isSidebarCollapsed ? "70px" : "290px", // Adjust based on sidebar state
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
        transition: "left 0.3s ease", // Smooth transition when sidebar toggles
    };

    const openGoogleCalendar = () => {
        if (user && user.email) {
            const calendarUrl = `https://calendar.google.com/calendar/u/0/r?authuser=${user.email}`;
            window.open(calendarUrl, "_blank"); // Open Google Calendar in a new tab
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Google Calendar</h1>
            {user ? (
                <button style={calendarBtnStyle} onClick={openGoogleCalendar}>
                    Open Calendar
                </button>
            ) : (
                <p>Please log in to access your calendar.</p>
            )}
        </div>
    );
};

export default Calendar;