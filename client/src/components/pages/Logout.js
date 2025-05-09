import { GoogleLogout } from "react-google-login";

const clientId = "1084199912186-1cfvqtmrc4nu2vccguvgfpphlhucn75f.apps.googleusercontent.com";

function Logout({ onLogout, buttonStyle }) {
    const onLogoutSuccess = () => {
        console.log("Logout success");
        onLogout();
    };

    return (
        <GoogleLogout
            clientId={clientId}
            render={(renderProps) => (
                <button
                    style={buttonStyle}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                >
                    Logout
                </button>
            )}
            onLogoutSuccess={onLogoutSuccess}
        />
    );
}

export default Logout;