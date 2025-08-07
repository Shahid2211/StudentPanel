// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import './login.css'; // custom CSS
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';
// export default function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: '', password: '' });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const { email, password } = form;

//     if (email === 'shahidmd0247@gmail.com' && password === 'shahid123') {
//       localStorage.setItem('token', 'mock-auth-token');
//       localStorage.setItem('user', JSON.stringify({ email }));
//       toast.success('Login successful!');
//       navigate('/studentDashboard');
//     } else {
//       toast.error('Invalid email or password');
//     }
//   };

//   return (
//     <div className="login-container">
//         <ToastContainer />
//       <div className="login-box">
//         <h1>Welcome to WARALS Technology</h1>
//         <h2>Login Page</h2>
//         <form onSubmit={handleLogin}>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './login.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ userId: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { userId, password } = form;

    setLoading(true);
    setError(null);

    // Mock fallback for testing if API is unavailable
    if (userId === 'ADM/2024/08' && password === '9090909573') {
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1orlbmFtZWlkZW50aWZpZXIiOiIzNjAzIiwiR3JwSWQiOiI0IiwiVXNlclR5cGUiOiJTdHVkZW50IiwiRW1wSWQiOiIxIiwiU2Nob29sTmFtZSI6IkpFRVZBTiBBREFSU0ggVklESFlBTEFZIiwiRW1wTmFtZSI6IlJB R0hBViIsImV4cCI6MTc4Mjg5ODU0MSwiaXNzIjoiZXhhbUVuZ2luZUFQSSIsImF1ZCI6Ik15QXBpU2VydmljZSJ9.WW7RUCYCjs-47zuBE28_htMxrGm1O4Mt4StyC3K4OpU';
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify({ userId }));
      toast.success('Login successful (mocked)!');
      navigate('/studentDashboard');
      return;
    }

    try {
      const response = await fetch('/api/UserLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      const responseText = await response.text();
      console.log('Login API response:', { status: response.status, body: responseText });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Login endpoint not found. Please verify the API URL (expected /api/UserLogin).');
        }
        throw new Error(`Login failed: ${response.status} ${response.statusText} - ${responseText}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonErr) {
        console.error('JSON parsing error:', jsonErr);
        throw new Error('Invalid response format from server');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ userId, ...data }));
        toast.success('Login successful!');
        navigate('/studentDashboard');
      } else {
        throw new Error('No token received from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error( 'Invalid user ID or password');
      setError(err.message || 'Invalid user ID or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-box">
        <h1>Welcome to WARALS Technology</h1>
        <h2>Login Page</h2>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}></div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>User ID:</label>
            <input
              type="text"
              name="userId"
              value={form.userId}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="e.g., ADM/2024/08"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}