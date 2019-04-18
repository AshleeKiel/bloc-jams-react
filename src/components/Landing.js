import React from 'react';

const Landing = () => (
    <section className="landing">
        <h1 className="hero-title">Turn the music UP!</h1>

        <section className="selling-points">
            <div className='row'>
                <div className="point" id="point-1">
                    <h2 className="point-title">Choose<br></br>your<br></br>music</h2>
                    <p className="point-description">The world is full of music.<br></br><br></br>Why should you have to listen to music that someone else chose?</p>
                </div>
                <div className="point" id="point-2">
                    <h2 className="point-title">Unlimited<br></br> streaming<br></br>ad-free</h2>
                    <p className="point-description">NO arbitrary limits.<br></br><br></br>NO distractions.</p>
                </div>
                <div className="point"  id="point-3">
                    <h2 className="point-title">Mobile<br></br>enabled</h2>
                    <p className="point-description"><br></br><br></br>Listen to your music on the go.<br></br><br></br>This streaming service is available on ALL mobile platforms.</p>
                </div>
            </div>
        </section>
    </section>
);

export default Landing;