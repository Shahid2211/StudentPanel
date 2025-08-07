

import React, { useState, useEffect } from 'react';
import Header from '../Header';
import LeftSidebar from '../LeftSidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Chemistry() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMzYwMyIsIkdycElkIjoiNCIsIlVzZXJUeXBlIjoiU3R1ZGVudCIsIkVtcElkIjoiMSIsIlNjaG9vbE5hbWUiOiJKRUVWQU4gQURBUlNIIFZJREhZQUxBWSIsIkVtcE5hbWUiOiJSQUdIQVYiLCJleHAiOjE3ODI4OTg1NDEsImlzcyI6ImV4YW1FbmdpbmVBUGkiLCJhdWQiOiJNeUFwaVNlcnZpY2UifQ.WW7RUCYCjs-47zuBE28_htMxrGm1O4Mt4StyC3K4OpU';
const apiURL='https://arizshad-002-site5.ktempurl.com/api/Teacher_Lessoon/ddlLession'
 const payload={classId:1,subjectId:3}
  const fetchLessons = async (redirect = false) => {
    setLoading(true);
    try {
      const response = await axios.post(
        apiURL,
        {
          payload
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('API Response:', response.data);
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setLessons(response.data);
        if (redirect) {
          navigate('/topics1');
        }
      } else {
        setLessons([]);
        console.log('No lessons found or invalid response format');
      }
    } catch (error) {
      console.error('Error fetching lessons:', error);
      setLessons([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonClick = (lessonName) => {
    const name = lessonName?.toLowerCase();
    if (name === 'hindi lession') {
      navigate('/topics3');
    } else if (name === 'new hindi') {
      navigate('/topics1');
    } else {
      console.log('No navigation defined for lesson:', lessonName);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div className="container-fluid">
      <Header />
      <div className="container">
        <LeftSidebar />
        <div className="row justify-content-center align-items-center flex-row" style={{marginTop:100,marginLeft:150}}>
          <h1 className="text-center w-100 mb-4" style={{fontFamily:'Nunito',backgroundColor:' black',color:'white'}} >Lessons</h1>

          {loading && <p>Loading...</p>}
          {!loading && lessons.length > 0 && (
            <div className="w-100 text-center">
              {lessons.map((lesson, index) => (
                <button
                  key={index}
                  style={{fontSize:"1.5rem",textTransform:'capitalize'}}
                  className="hindi-btn"
                  onClick={() => handleLessonClick(lesson.lessionName || lesson.lessonName)}
                >
                  {lesson.lessionName || lesson.lessonName || 'Unnamed Lesson'}
                </button>
              ))}
            </div>
          )}
          {!loading && lessons.length === 0 && (
            <p className="no-lessons-text">No lessons available.</p>
          )}
        </div>
      </div>

      <style>{`
        .row.justify-content-center.align-items-center {
          gap: 50px;
          flex-direction: row;
        }
        .hindi-btn {
          background-color: #ff8080;
          color: white;
          border: none;
          padding: 12px 32px;
          border-radius: 15px;
          box-shadow: 10px 10px 16px rgba(0,0,0,0.15);
          font-size: 1.1rem;
          margin: 0 8px;
          width: 250px;
          height: 100px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .hindi-btn:hover {
          transform: scale(1.08);
        }
        .no-lessons-text {
          font-size: 1.2rem;
          color: #888;
          background-color: #f2f2f2;
          padding: 20px 40px;
          border-radius: 12px;
          box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}