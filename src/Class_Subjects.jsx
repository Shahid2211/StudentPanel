

import React, { useEffect, useState, useCallback, useRef } from 'react';
import './Class_Subject.css';
import { useNavigate } from 'react-router-dom';

export default function Class_Subjects({ studentId = '1' }) {
  const [subjects, setSubjects] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const modalRef = useRef(null);
let navigate=useNavigate()
  const apiUrl = 'https://arizshad-002-site5.ktempurl.com/api/Student/FetchStudentClassDetails';
  const token = process.env.REACT_APP_API_TOKEN || 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTAxMiIsIkdycElkIjoiNCIsIlVzZXJUeXBlIjoiU3R1ZGVudCIsIkVtcElkIjoiMSIsIlNjaG9vbE5hbWUiOiJKZWV2YW4gQWRhcnNoIFNjaG9vbCIsIkVtcE5hbWUiOiJSQUdIQVYiLCJleHAiOjE3Nzk1MTI4MTAsImlzcyI6ImV4YW1FbmdpbmVBUGkiLCJhdWQiOiJNeUFwaVNlcnZpY2UifQ.EIEdgLCnuQVgJo0QSRb2lHelax2Ny5_ZAk6n3O50MOQ'; // Use .env for token

  // Fetch data from API
  const fetchSubjects = useCallback(async () => {
    try {
      setStatus('loading');
      setError(null);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ studentID: studentId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // For debugging

      if (Array.isArray(data)) {
        setSubjects(data);
        setStatus('success');
      } else {
        setSubjects([]);
        setStatus('success');
      }
    } catch (err) {
      console.error('Error fetching subjects:', err);
      setError(err.message);
      setStatus('error');
    }
  }, [studentId, token]);

  // Run fetch on mount or when studentId/token changes
  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  // Handle modal close
  const closeModal = () => {setStatus('closed');navigate('/studentDashboard')}

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && status !== 'closed') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [status]);

  // Focus management for accessibility
  useEffect(() => {
    if (status !== 'closed' && modalRef.current) {
      modalRef.current.focus();
    }
  }, [status]);

  return (
    <div role="dialog" aria-labelledby="subjects-modal-title" className="modal-container">
      {status !== 'closed' && (
        <div className="Class_SubjectOverlay">
          <div
            className="Class_SubjectModal"
            ref={modalRef}
            tabIndex="-1"
            aria-modal="true"
          >
            <div className="Class_SubjectModal-header">
              <h1 id="subjects-modal-title" style={{ backgroundColor: 'none', color:'white'}}>📚 Class and Subjects</h1>
              <button
                className="close-button"
                onClick={closeModal}
                aria-label="Close modal"
                style={{backgroundColor:'#6f5b3e',color:'white'}}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {status === 'loading' && <p className="loading">Loading...</p>}
              {status === 'error' && (
                <p className="error">{error || 'Failed to fetch subjects. Please try again.'}</p>
              )}
              {status === 'success' && subjects.length > 0 ? (
                <table>
                  <thead style={{backgroundColor:'none'}}>
                    <tr>
                      <th style={{backgroundColor:'white'}}>ID</th>
                      <th style={{backgroundColor:'white'}}>Class Name</th>
                      <th style={{backgroundColor:'white'}}>Subject Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((item, index) => (
                      <tr key={item.id || `subject-${index}`}>
                        <td style={{backgroundColor:'#FF8A65'}}>{item.id || 'N/A'}</td>
                        <td style={{backgroundColor:'#FF8A65'}}>{item.className || 'N/A'}</td>
                        <td style={{backgroundColor:'#FF8A65'}}>{item.subjectName || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                status === 'success' && <p className="no-data">No class subjects available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}