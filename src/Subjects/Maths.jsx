import React from 'react';
import Header from '../Header';
import LeftSidebar from '../LeftSidebar';
import { Box, Grid, Button, Typography, styled } from '@mui/material';

export default function Maths() {
  // List of maths lesson buttons
  const lessons = [
    'Pythagoras',
    'Binomial Theorem (Nursery 😊)',
    'Lesson 1 - Chapter One',
    'Maths Lesson 1(📏)',
    'Algebra Basics',
    'Trigonometry Intro(📐)',
    'Geometry for Kids',
  ];

  // Split into first 4 and remaining
  const firstRow = lessons.slice(0, 4);
  const secondRow = lessons.slice(4);

  // Custom styled button for lessons
  const LessonButton = styled(Button)(({ theme }) => ({
    // background: 'linear-gradient(to bottom, #b5bdc8 0%, #828c95 36%, #28343b 100%)',
    background: 'rgba(58, 121, 133, 1)',
    color: 'white',
    border: 'none',
    padding: theme.spacing(1.5, 4),
    borderRadius: '15px',
    boxShadow: '10px 10px 16px rgba(0, 0, 0, 0.15)',
    fontSize: '1.1rem',
    width: '250px',
    height: '100px',
    margin: theme.spacing(1.5),
    textTransform: 'capitalize',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.08)',
      // background: 'linear-gradient(to bottom, #f3e2c7 0%, #c19e67 50%, #b68d4c 51%, #e9d4b3 100%)',
    },
  }));

  return (
    <Box
      sx={{
        backgroundColor: '#d4f1f4',
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        top: 0,
        left: 0,
      }}
    >
      <Header />
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2, backgroundColor: '#d4f1f4' }}>
        <LeftSidebar />
        <Box sx={{ mt: 12, ml: { xs: 0, md: 18 } }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              // backgroundColor: '#272829',
              // bgcolor:'#3d3f41ff',
              bgcolor:'#05445e',
              // bgcolor:'#2f5233',
              color: 'white',
              fontFamily: 'Nunito',
              py: 2,
              mb: 4,
              borderRadius: 2,
            }}
          >
            Math Lessons
          </Typography>
          {/* First Row - 4 Items */}
          <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            {firstRow.map((item, index) => (
              <Grid item key={index}>
                <LessonButton>{item}</LessonButton>
              </Grid>
            ))}
          </Grid>
          {/* Second Row - Remaining Items */}
          <Grid container spacing={2} justifyContent="center">
            {secondRow.map((item, index) => (
              <Grid item key={index}>
                <LessonButton>{item}</LessonButton>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}