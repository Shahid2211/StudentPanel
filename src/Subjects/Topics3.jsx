import React, { useState, useEffect } from 'react';
import Header from '../Header';
import LeftSidebar from '../LeftSidebar';
import axios from 'axios';

export default function Topics3() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMzYwMyIsIkdycElkIjoiNCIsIlVzZXJUeXBlIjoiU3R1ZGVudCIsIkVtcElkIjoiMSIsIlNjaG9vbE5hbWUiOiJKRUVWQU4gQURBUlNIIFZJREhZQUxBWSIsIkVtcE5hbWUiOiJSQUdIQVYiLCJleHAiOjE3ODI4OTg1NDEsImlzcyI6ImV4YW1FbmdpbmVBUGkiLCJhdWQiOiJNeUFwaVNlcnZpY2UifQ.WW7RUCYCjs-47zuBE28_htMxrGm1O4Mt4StyC3K4OpU';
  const matStudentURL='https://arizshad-002-site5.ktempurl.com/api/Student/GetStudyMaterial_Student'
    const payload={classId:1,lessionId:13,subjectId:3}
  const fetchTopics = async () => {
    setLoading(true);
    try {
      const response = await axios.post(matStudentURL,
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
        setTopics(response.data);
      } else {
        setTopics([]);
        console.log('No topics found or invalid response format');
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div className="container-fluid">
      <Header />
      <div className="container">
        <LeftSidebar />
        <div className="row justify-content-center align-items-center text-center flex-column" style={{marginTop:100,marginLeft:150}}>
          <h1 className="mb-4">Topics</h1>
          {loading && <p>Loading...</p>}
          {!loading && topics.length > 0 && (
            <div className="w-100 text-center">
              {topics.map((topic, index) => (
                <button key={index} className="hindi-btn">
                  {topic.topicName || topic.name || 'Unnamed Topic'}
                </button>
              ))}
            </div>
          )}
          {!loading && topics.length === 0 && (
            <p className="no-topics-text">No topics available.</p>
          )}
        </div>
      </div>

      <style>{`
        .row.justify-content-center.align-items-center {
          gap: 20px;
          flex-direction: column;
        }
        .hindi-btn {
          background-color: #ff8080;
          color: white;
          border: none;
          padding: 12px 32px;
          border-radius: 15px;
          box-shadow: 10px 10px 16px rgba(0,0,0,0.15);
          font-size: 1.1rem;
          margin: 8px auto;
          width: 250px;
          height: 100px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .hindi-btn:hover {
          transform: scale(1.08);
        }
        .no-topics-text {
          font-size: 1.3rem;
          color: #888;
          background-color: #f9f9f9;
          padding: 20px 40px;
          border-radius: 12px;
          box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}