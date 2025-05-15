import React, {useState} from 'react';

const weatherIcons = [
    '/weather asset (1).png',
    '/weather asset (2).png',
    '/weather asset (3).png',
    '/weather asset (4).png',
    '/weather asset (5).png',
    '/weather asset (6).png',
];

const Weather = () => {
    const [search, setSearch] = useState('');

    const forecast = [
        {day: 'MON', icon: 0, temp: 54},
        {day: 'TUE', icon: 1, temp: 62},
        {day: 'WED', icon: 2, temp: 73},
        {day: 'THU', icon: 3, temp: 58},
        {day: 'FRI', icon: 4, temp: 65},
        {day: 'SAT', icon: 5, temp: 49},
    ];

    const logoutBtnStyle = {
        position: 'fixed',
        top: 20,
        right: 24,
        zIndex: 200,
        background: '#fff',
        color: '#222',
        border: '1px solid #7fa6b6',
        borderRadius: '6px',
        padding: '8px 16px',
        fontFamily: 'Architects Daughter, cursive',
        fontSize: '1.1em',
        cursor: 'pointer',
        fontWeight: 600,
    };

    const wrapperStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1,
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
    };

    return (
        <div
            style={{
                height: '100vh',
                width: '100%',
                position: 'relative',
                fontFamily: 'Architects Daughter, cursive',
                overflow: 'hidden',
            }}
        >

            {/* Centered wrapper */}
            <div style={wrapperStyle}>
                {/* Weather summary */}
                <div
                    style={{
                        color: '#222',
                        fontSize: '2.5em',
                        textAlign: 'center',
                        marginBottom: '128px',
                    }}
                >
                    Cupertino
                    <div style={{fontSize: '2.8em', fontWeight: 600}}>54°F</div>
                    <div style={{fontSize: '1.2em', marginTop: '-6px'}}>Rainy</div>
                </div>

                {/* Main weather card */}
                <div
                    style={{
                        background: 'rgba(156, 228, 252, 0.8)',
                        borderRadius: '12px',
                        boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
                        padding: '32px 32px 32px 32px',
                        maxWidth: '800px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <form
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: 480,          // overall width inside the blue card
                            margin: '0 auto 24px',  // centred, with space below
                        }}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="text"
                            placeholder="Search for a Location"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{

                                height: '48px',
                                fontSize: '1.3em',
                                border: '1px solid #7fa6b6',
                                borderRadius: 8,
                                padding: '0 16px',
                                paddingRight: 70,       // leaves room for button
                                outline: 'none',
                                fontFamily: 'inherit',
                                background: '#fff',
                                boxSizing: 'border-box',
                            }}
                        />
                        <button
                            type="submit"
                            onClick={(e) => e.preventDefault()}
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: 60,
                                height: 48,
                                border: '1px solid #7fa6b6',
                                borderLeft: 'none',
                                borderRadius: '0 8px 8px 0',
                                background: '#fff',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 0,
                                marginTop: 20,
                            }}
                        >
                            <img src="/search-icon.png" alt="Search" style={{width: '48px', height: '48px'}}/>
                        </button>
                    </form>

                    {/* Forecast row */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '32px',
                            width: '100%',
                            gap: '18px',
                        }}
                    >
                        {forecast.map((f, i) => (
                            <div key={i} style={{textAlign: 'center', minWidth: 52}}>
                                <img
                                    src={weatherIcons[f.icon]}
                                    alt={f.day}
                                    style={{width: '120px', height: '120px', marginBottom: '24px'}}
                                />
                                <div style={{fontSize: '2em', fontWeight: 700}}>{f.temp}°</div>
                                <div style={{fontSize: '1.3em', color: '#444', fontWeight: 600}}>{f.day}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
