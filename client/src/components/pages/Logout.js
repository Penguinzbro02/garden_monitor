import React from 'react';
import {googleLogout} from '@react-oauth/google';

function Logout({onLogout, buttonStyle}) {
    const handleLogout = () => {
        googleLogout(); // Clears the access token and ends the user's session
        console.log("Logout success");
        onLogout();
    };

    return (
        <button style={buttonStyle} onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;