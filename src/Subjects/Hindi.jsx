import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import LeftSidebar from '../LeftSidebar';
import { Box, Grid, Button, Typography, styled } from '@mui/material';

export default function Hindi() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMzYwMyIsIkdycElkIjoiNCIsIlVzZXJUeXBlIjoiU3R1ZGVudCIsIkVtcElkIjoiMSIsIlNjaG9vbE5hbWUiOiJKRUVWQU4gQURBUlNIIFZJREhZQUxBWSIsIkVtcE5hbWUiOiJSQUdIQVYiLCJleHAiOjE3ODI4OTg1NDEsImlzcyI6ImV4YW1FbmdpbmVBUGkiLCJhdWQiOiJNeUFwaVNlcnZpY2UifQ.WW7RUCYCjs-47zuBE28_htMxrGm1O4Mt4StyC3K4OpU';
  const apiURL = 'https://arizshad-002-site5.ktempurl.com/api/Teacher_Lessoon/ddlLession';
  const payload = { classId: 1, subjectId: 3 };

  const fetchLessons = async (redirect = false) => {
    setLoading(true);
    try {
      const response = await axios.post(
        apiURL,
        { payload },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
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

  // Custom styled button with gradient background
  const HindiButton = styled(Button)(({ theme }) => ({
    // background: 'linear-gradient(to bottom, #b5bdc8 0%, #828c95 36%, #28343b 100%)',
    background: 'rgba(58, 121, 133, 1)',
    color: 'white',
    border: 'none',
    padding: theme.spacing(1.5, 4),
    borderRadius: '15px',
    textTransform: 'capitalize',
    boxShadow: '10px 10px 16px rgba(0, 0, 0, 0.15)',
    fontSize: '1.3rem',
    width: '250px',
    height: '100px',
    margin: theme.spacing(1),
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.08)',
      // background: 'linear-gradient(to bottom, #f3e2c7 0%, #c19e67 50%, #b68d4c 51%, #e9d4b3 100%)',
    },
  }));

  return (
    <Box sx={{ backgroundColor:'#d4f1f4', minHeight: '100vh', width: '100vw', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2, backgroundColor:'#d4f1f4'}}>
        <LeftSidebar />
        <Box sx={{ mt: 12, ml: { xs: 0, md: 18 } }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              // backgroundColor: '#272829',
              bgcolor:'#05445e',
              // bgcolor:'#2f5233',
              color: 'white',
              fontFamily: 'Nunito',
              py: 2,
              mb: 4,
              borderRadius: 2,
              width:'800px',
            }}
          >
            Lessons
          </Typography>

          {loading && (
            <Typography align="center" sx={{ fontSize: '1.2rem', color: '#888' }}>
              Loading...
            </Typography>
          )}
          {!loading && lessons.length > 0 && (
            <Grid container spacing={2} justifyContent="center">
              {lessons.map((lesson, index) => (
                <Grid item key={index}>
                  <HindiButton onClick={() => handleLessonClick(lesson.lessionName || lesson.lessonName)}>
                    {lesson.lessionName || lesson.lessonName || 'Unnamed Lesson'}
                  </HindiButton>
                </Grid>
              ))}
            </Grid>
          )}
          {!loading && lessons.length === 0 && (
            <Typography
              align="center"
              sx={{
                fontSize: '1.2rem',
                color: '#888',
                backgroundColor: '#DAF7DC',
                p: 3,
                borderRadius: 2,
                boxShadow: '5px 5px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              No lessons available.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}