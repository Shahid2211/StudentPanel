import React from 'react';
import { useNavigate } from 'react-router-dom';
import { pdf } from '@react-pdf/renderer';
import { SchoolLeavingPDF } from './SchoolLeavingPDF';
import Header from '../Header';
import LeftSidebar from '../LeftSidebar';
import { Box, Grid, Card, CardContent, Typography, Button, styled } from '@mui/material';

export default function Topics1() {
  const navigate = useNavigate();

  const handleGeneratePDF = async () => {
    try {
      const blob = await pdf(<SchoolLeavingPDF />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    }
  };

  const topics = [
    {
      title: 'This is for Math - PDF',
      subtitle: 'This is for math',
      button: 'VIEW PDF',
      action: handleGeneratePDF,
    },
    {
      title: 'This is for Math-Video',
      subtitle: 'This is for math',
      button: 'WATCH VIDEO',
      action: () => navigate('/twinkle-video'),
    },
  ];

  // Custom styled Card for topic cards
  const TopicCard = styled(Card)(({ theme, isBlue }) => ({
    // backgroundColor: isBlue ? '#EFDD8D' : '#EFDD8D',
    backgroundColor:'#05445e',
    color: 'white',
    padding: theme.spacing(2, 3),
    borderRadius: '15px',
    margin: theme.spacing(1.5),
    width: '280px',
    height:'170px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }));

  // Custom styled Button for topic buttons
  const TopicButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#ff8080',
    color: 'white',
    padding: theme.spacing(1, 2.5),
    borderRadius: '8px',
    fontSize: '1rem',
    textAlign:'center',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.18)',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#27ae60',
      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.22)',
    },
  }));

  return (
    <Box sx={{ backgroundColor: '#DAF7DC', minHeight: '100vh', width: '100vw', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2, backgroundColor: '#DAF7DC' }}>
        <LeftSidebar />
        <Box sx={{ mt: 12, ml: { xs: 0, md: 18 } }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              backgroundColor: '#272829',
              color: 'white',
              fontFamily: 'Nunito',
              py: 2,
              mb: 4,
              borderRadius: 2,
            }}
          >
            Topics
          </Typography>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {topics.map((item, index) => (
              <Grid item key={index}>
                <TopicCard isBlue={index === 1}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1, fontSize: '1.2rem' }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', color: '#f0f0f0', mb: 2 }}>
                      {item.subtitle}
                    </Typography>
                    <TopicButton onClick={item.action} sx={{textAlign:'end'}}>{item.button}</TopicButton>
                  </CardContent>
                </TopicCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}