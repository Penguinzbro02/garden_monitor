import React from 'react';
import {useGoogleLogin} from '@react-oauth/google';

function Login({onLogin, buttonStyle}) {
    const handleSuccess = async (tokenResponse) => {
        console.log("Login success:", tokenResponse);

        if (!tokenResponse.access_token) {
            console.error("No access token received.");
            alert("Login failed: No access token.");
            return;
        }

        // fetch user info using access token
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
            },
        });

        const userInfo = await res.json();
        console.log("User Info:", userInfo);

        const userData = {
            name: userInfo.name,
            email: userInfo.email,
            accessToken: tokenResponse.access_token,
        };

        onLogin(userData);
    };

    const handleError = (error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please try again.");
    };

    const login = useGoogleLogin({
        onSuccess: handleSuccess, // Call handleSuccess directly
        onError: handleError, // Call handleError directly
        scope: "https://www.googleapis.com/auth/calendar.events",
    });

    return (
        <button style={buttonStyle} onClick={() => login()}>
            Sign In
        </button>
    );
}

export default Login;