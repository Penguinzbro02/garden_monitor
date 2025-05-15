import '../../styles.css';
import React from 'react';

function About() {
    return (
        <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
            <h1>About Garden Monitor</h1>
            <h2>Our Vision</h2>
            <p>
                Want to take your gardening to the next level?<br />
                Excited to grow your own plants but not sure where to start?
            </p>
            <p>
                <strong>Garden Monitor</strong> is built for anyone ready to dive into gardening and make plant care simple and fun. Our app takes the guesswork out of growing, giving you the tools and confidence to help your garden thrive!
            </p>
            <h2>Credits</h2>
            <ul className="about-credits-list">
                <li>
                    <strong>Jake Johnson:</strong> Coordinator, Assistant Programmer
                </li>
                <li>
                    <strong>Youkyoung Kim:</strong> Back End Programmer
                </li>
                <li>
                    <strong>Dawson Le:</strong> Front End Programmer, UI Design
                </li>
                <li>
                    <strong>Jack Liang:</strong> Lead Programmer
                </li>
                <li>
                    <strong>Chris (Christopher Oh):</strong> Statistics
                </li>
            </ul>
            <h2>Team 8</h2>
            <p>
                For more information, visit the GitHub repository:<br />
                <code>https://github.com/Penguinzbro02/garden_monitor</code>
            </p>
        </div>
    );
}

export default About;