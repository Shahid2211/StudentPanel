import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import Header from './Header';

export default function Setting() {
  const navigate = useNavigate();

  const launchDate = new Date('2025-12-31T00:00:00');
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const difference = launchDate - now;

    let time = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return time;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="d-flex" style={{ 
      // backgroundColor: '#ff8080',
      backgroundColor:'#d4f1f4',
       minHeight: '100vh' ,zIndex:'2'}}>
      <LeftSidebar />
      <div className="flex-grow-1" style={{zIndex:'1',marginLeft:'150px'}}>
        <Header />

        {/* Centered Countdown Box */}
        <div style={styles.outerContainer}>
          <div style={styles.boxContainer}>
            <h1 style={styles.heading}>Coming Soon</h1>
            <p style={styles.subText}>
              We are working very hard to give you the best experience possible! Stay tuned.
            </p>
            <div style={styles.timer}>
              {['days', 'hours', 'minutes', 'seconds'].map((key) => (
                <div style={styles.timeBox} key={key}>
                  <span style={styles.value}>{timeLeft[key]}</span>
                  <span style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Centered Go Back Button Below */}
        <div style={styles.backButtonWrapper}>
          <button style={styles.backButton} onClick={() => navigate('/studentDashboard')}>
            ⬅ Go Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginTop:100,
    marginLeft:'20px',
  },
  boxContainer: {
    // backgroundColor: '#641e16',
    // backgroundColor:'#090f0fff',
     backgroundColor:'#05445e',
    color: 'white',
    width: '100%',
    maxWidth: '600px',
    
    height: '420px',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '10px',
    fontFamily:'Nunito'
  },
  subText: {
    fontSize: '1.1rem',
    marginBottom: '30px',
  },
  timer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    marginBottom: '30px',
  },
  timeBox: {
    backgroundColor: '#ffffff',
    color: '#000',
    padding: '20px 30px',
    borderRadius: '10px',
    minWidth: '100px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
  },
  value: {
    fontSize: '2.5rem',
    color: '#e67e22',
    fontWeight: 'bold',
  },
  label: {
    fontSize: '1rem',
  },
  backButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },

  backButton: {
    padding: '10px 20px',
    // backgroundColor: ' #954C2E',
    // backgroundColor:'#ff8080',
    backgroundColor:'#48b8e9ff',
    color: '#fff',
    border: 'none',
    marginTop:'-10px',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};
