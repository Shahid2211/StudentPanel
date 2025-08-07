import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Clear user data (e.g., token or user info)
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // ✅ Optionally clear other auth-related data
    sessionStorage.clear();

    // ✅ Redirect after logout
    setTimeout(() => {
      navigate('/'); // or home '/'
    }, 1000); // Delay to show a message if needed
  }, [navigate]);

  return (
    <div style={{ padding: '40px', textAlign: 'center', }}>
      {/* <h2>You have been logged out.</h2>
      <p>Redirecting to login page...</p> */}
    </div>
  );
}
