import { GoogleLogin } from "react-google-login";

const clientId = "1084199912186-1cfvqtmrc4nu2vccguvgfpphlhucn75f.apps.googleusercontent.com";

function Login({ onLogin, buttonStyle }) {
    const onSuccess = (response) => {
        console.log("Login success:", response.profileObj);
        onLogin(response.profileObj);
    };

    const onFailure = (response) => {
        console.error("Login failed:", response);
    };

    return (
        <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
                <button
                    style={buttonStyle}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                >
                    Login
                </button>
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
        />
    );
}

export default Login;