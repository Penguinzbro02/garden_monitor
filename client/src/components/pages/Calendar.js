import React from 'react';
import { useState } from 'react';

const Calendar = ({ user, isSidebarCollapsed, accessToken }) => {

    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Access Token:", accessToken);
        if (!accessToken) {
            alert("Access token is missing or invalid. Please sign in again.");
            return;
        }
        // Combine date and time
        const startDateTime = `${startDate}T${startTime}:00`;
        const endDateTime = `${endDate}T${endTime}:00`;

        const event = {
            summary: eventName,
            description: eventDescription,
            start: {
                dateTime: startDateTime,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Automatically detect user's time zone
            },
            end: {
                dateTime: endDateTime,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
        };
        try {
            const response = await fetch(
                "https://www.googleapis.com/calendar/v3/calendars/primary/events",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(event),
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Event created:", data);
                alert("Event created successfully! Check your Google Calendar.");
            } else {
                const errorData = await response.json(); // Parse the error response
                console.error("Failed to create event:", response.statusText, errorData);
                alert(`Failed to create event: ${errorData.error.message}`);
            }
        } catch (error) {
            console.error("Error creating event:", error);
            alert("An error occurred while creating the event.");
        }
    };
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
        <div>
            <h1>Google Calendar</h1>
            {user ? (
                <>
                    <button style={calendarBtnStyle} onClick={openGoogleCalendar}>
                        Open Calendar
                    </button>

                    <form onSubmit={handleSubmit} >
                        <div>
                            <label>Event Name:</label>
                            <input
                                type="text"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Event Description:</label>
                            <textarea
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label>Start Date:</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Start Time:</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>End Date:</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>End Time:</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Create Event</button>
                    </form>
                </>
            ) : (
                <p>Please log in to access your calendar.</p>
            )}
        </div>
    );
};



export default Calendar;