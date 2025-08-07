import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftSidebar from './LeftSidebar';
import Header from './Header';
import Social_Science from './Subjects/Social_Science';
import Hindi from './Images/Hindi.png'; // Corrected path and file name
import History from './Images/History.png'; // Corrected path
import Mathematics from './Images/Maths.png'; // Corrected path
import Physics from './Images/Physics-Formula.png'; // Corrected path
import MoralScience from './Images/Science.png'; // Corrected path
import Drawing from './Images/Drawingbook.png'; // Corrected path
import { FaDirections } from 'react-icons/fa';
import { blueGrey } from '@mui/material/colors';

export default function StudyMaterial() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  console.log(subjects);
  const [loading, setLoading] = useState(true);

  const buttonStyle = {
    fontSize: '1.5rem',
    width: '80%',
    height: '80%',
    padding: '15px',
    fontFamily: 'Nunito',
    borderRadius: '15px',
    background: 'rgba(58, 121, 133, 1)',
    // background:'rgba(108, 207, 226, 1)',
    // backgroundColor:'rgba(89, 183, 202, 1)',
    color: '#ffffff',
    fontWeight: 'bold',
    border: 'none',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    FaDirections:'row',

  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  const token1 = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTAxMiIsIkdycElkIjoiNCIsIlVzZXJUeXBlIjoiU3R1ZGVudCIsIkVtcElkIjoiMSIsIlNjaG9vbE5hbWUiOiJKZWV2YW4gQWRhcnNoIFNjaG9vbCIsIkVtcE5hbWUiOiJSQUdIQVYiLCJleHAiOjE3NzkzNTA5MzksImlzcyI6ImV4YW1FbmdpbmVBUGkiLCJhdWQiOiJNeUFwaVNlcnZpY2UifQ.MBYnyoludSizgqjcqUtbLWckdqnz9jg8lTzf9fLgADE';
  const stSubjectURL = 'https://arizshad-002-site5.ktempurl.com/api/Student/GetStudentSubject';
  const payload = { classId: 1, sectionId: 15, studentId: 1 };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.post(
          stSubjectURL,
          payload,
          {
            headers: {
              Authorization: `${token1}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Fetched subjects:', response.data);
        setSubjects(response.data);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  // Map subject names to their corresponding icons
  const subjectIcons = {
    Hindi: Hindi,
    History: History,
    Mathematics: Mathematics,
    Physics: Physics,
    'Moral Science': MoralScience,
    Drawing: Drawing,
  };

  return (
    <div
      className="d-flex flex-column"
      style={{
        backgroundColor: '#d4f1f4',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Header />
      <div className="d-flex">
        <LeftSidebar />
        <div className="container py-5" style={{ marginLeft: '215px', marginTop: 50 }}>
          <h3
            className="mb-5 text-center fw-bold"
            style={{
              fontSize: '2.5rem',
              fontWeight: 600,
              color: 'black',
              width: '300px',
              textAlign: 'center',
              height: '50px',
              display: 'flex',
              fontFamily: 'Nunito',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '390px',
              marginBottom: '2rem',
              borderRadius: '8px',
            }}
          >
            Subjects
          </h3>

          {loading ? (
            <p className="text-center">Loading subjects...</p>
          ) : subjects.length === 0 ? (
            <p className="text-center text-danger">No subjects found.</p>
          ) : (
            <div className="row g-4 justify-content-center">
              {subjects.map((subject, index) => {
                const path = `/Lession/${subject.classId}/${subject.subjectId}/${subject.subjectName?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`;
                console.log(subject.subjectName);
                return (
                  <div
                    key={index}
                    className="col-md-6 col-lg-4 d-flex justify-content-center align-item-center"
                    style={{ height: '150px'}}
                  >
                    <button
                      style={buttonStyle}
                      onClick={() => navigate(path)}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={subjectIcons[subject.subjectName] || subjectIcons['Hindi']}
                        alt={`${subject.subjectName} icon`}
                        style={{
                          width: '50px',
                          height: '50px',
                          marginRight: '15px',
                          marginBottom:'10px'
                        }}
                      />
                      {subject.subjectName || 'Unnamed'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}