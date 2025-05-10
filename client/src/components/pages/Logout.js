import { googleLogout } from '@react-oauth/google';

function Logout({ onLogout, buttonStyle }) {
    const handleLogout = () => {
        googleLogout(); // Clears the user's session
        console.log("Logout success");
        onLogout(); // Call the parent component's logout handler
    };

    return (
        <button style={buttonStyle} onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;