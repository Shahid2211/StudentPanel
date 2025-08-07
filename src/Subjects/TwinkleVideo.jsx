import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TwinkleVideo() {
    let navigate=useNavigate();
    const handleClose=()=>{
        navigate('/topics1');
    }
return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Twinkle Twinkle Little Star</h2>
        <button
            onClick={handleClose}
            style={{
                textAlign: 'center',
                position: 'absolute',
                right: '330px',
                top: '30px',
                backgroundColor: 'yellow',
                color: 'red',
                transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={e => {
                e.target.style.backgroundColor = 'orange';
                e.target.style.color = 'white';
            }}
            onMouseOut={e => {
                e.target.style.backgroundColor = 'yellow';
                e.target.style.color = 'red';
            }}
        >
            Close Button
        </button>
        <iframe
            width="720"
            height="400"
            src="https://www.youtube.com/embed/yCjJyiqpAuU"
            title="Twinkle Twinkle Little Star"
            frameBorder="0"
            allowFullScreen
        ></iframe>
    </div>
);
}
