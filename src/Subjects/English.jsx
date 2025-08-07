import React, { useEffect, useState } from 'react';
import Header from '../Header';
import LeftSidebar from '../LeftSidebar';
import axios from 'axios';

export default function Environment() {
  const [lessons, setLessons] = useState(null);
  const [loading, setLoading] = useState(true);
const token='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMzYwMyIsIkdycElkIjoiNCIsIlVzZXJUeXBlIjoiU3R1ZGVudCIsIkVtcElkIjoiMSIsIlNjaG9vbE5hbWUiOiJKRUVWQU4gQURBUlNIIFZJREhZQUxBWSIsIkVtcE5hbWUiOiJSQUdIQVYiLCJleHAiOjE3ODI4OTg1NDEsImlzcyI6ImV4YW1FbmdpbmVBUGkiLCJhdWQiOiJNeUFwaVNlcnZpY2UifQ.WW7RUCYCjs-47zuBE28_htMxrGm1O4Mt4StyC3K4OpU'
const payload={classId:1,subjectId:8}  
useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.post(
          'https://arizshad-002-site5.ktempurl.com/api/Teacher_Lessoon/ddlLession',
          payload
          ,

          {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data && response.data.length > 0) {
          setLessons(response.data);
        } else {
          setLessons(null);
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setLessons(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  return (
    <div className='container-fluid'>
      <Header />
      <div className='container'>
        <LeftSidebar />
        <div className='row justify-content-center align-items-center flex-column text-center' style={{marginTop:100,marginLeft:150}}>
          <h1 className="mb-4" style={{backgroundColor:'Nunito'}}>Lessons</h1>

          {loading ? (
            <p>Loading...</p>
          ) : lessons ? (
            <div className="lesson-list">
              {lessons.map((lesson, index) => (
                <div key={index} className="lesson-item">
                  <h5>{lesson.topicName}</h5>
                  <p>{lesson.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-lessons-text">No lessons available.</p>
          )}
        </div>
      </div>

      <style>{`
        .no-lessons-text {
          font-size: 1.3rem;
          color: #888;
          background-color: #f2f2f2;
          padding: 20px 40px;
          border-radius: 12px;
          box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.1);
        }

        .lesson-item {
          background-color: #e0f7fa;
          padding: 15px;
          margin: 10px;
          border-radius: 10px;
          width: 80%;
          box-shadow: 2px 2px 10px rgba(0,0,0,0.05);
        }

        .lesson-list {
          width: 100%;
        }
      `}</style>
    </div>
  );
}
