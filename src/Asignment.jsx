import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Button, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import Chemistry from './Images/Science.png';
import English from './Images/English.png';
import Mathematics from './Images/Maths.png';
import Enviroment from './Images/Enviroment.png'; // Corrected typo from Enviroment
import Test from './Images/Class-Test.png';

const AssignmentContainer = styled(Box)(({ theme }) => ({
  marginLeft: '270px',
  padding: '20px',
  marginTop: '100px',
  backgroundColor: '#d4f1f4',
  minHeight: '100vh',
  flexGrow: 1,
}));

const AssignmentButton = styled(Button)(({ theme }) => ({
  width: '300px',
  height: '150px',
  fontSize: '30px',
  fontWeight: 'bold',
  borderRadius: '20px',
  fontFamily: '"Nunito", sans-serif',
  background: 'rgba(58, 121, 133, 1)',
  color: '#fff',
  textTransform: 'none',
  display: 'flex',
  flexDirection: 'column', // Changed to column to stack icon above text
  alignItems: 'center', // Align to left
  justifyContent: 'center', // Center vertically
  paddingLeft: '20px',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const LoadingTypography = styled(Typography)(({ theme }) => ({
  fontFamily: '"Quicksand", sans-serif',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#000',
}));

export default function Assignment() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const payload = { classId: '1', sectionId: '15', studentID: '1' };
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMzYwMyIsIkdycElkIjoiNCIsIlVzZXJUeXBlIjoiU3R1ZGVudCIsIkVtcElkIjoiMSIsIlNjaG9vbE5hbWUiOiJKRUVWQU4gQURBUlNIIFZJREhZQUxBWSIsIkVtcE5hbWUiOiJSQUdIQVYiLCJleHAiOjE3ODIyOTQyNjQsImlzcyI6ImV4YW1FbmdpbmVBUGkiLCJhdWQiOiJNeUFwaVNlcnZpY2UifQ.-dXkBNcBff2P_c6Bnwj1IuEf0kBjSb3Ndn2CR1lfHNo';

  // Map subject names to their corresponding icons
  const subjectIcons = {
    'Class-Chemistry': Chemistry,
    'Class-Eng': English,
    'Class-Enviroment': Enviroment, // Handle API typo
    'Class-Maths': Mathematics,
    'Class-Test': Test,
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('https://arizshad-002-site5.ktempurl.com/api/Student/GetStudentAssignment', {
          method: 'POST',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        setAssignments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error:', error);
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <Box sx={{
      display: 'flex',
      backgroundColor: '#d4f1f4',
      minHeight: '100vh'
    }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <LeftSidebar />
        <AssignmentContainer>
          <Grid container spacing={4}>
            {loading ? (
              <Grid item xs={12}>
                <LoadingTypography>Loading Assignments...</LoadingTypography>
              </Grid>
            ) : assignments.length > 0 ? (
              assignments.map((item, index) => (
                <Grid item xs={12} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                  <AssignmentButton
                       
                    onClick={() => {
                      const normalizedSubjectName = item.subjectName
                        .trim()
                        .replace(/\s+/g, '-')
                      // .replace(/^class-enviroment$/, 'class-Enviroment');
                      console.log(`Navigating to: /${normalizedSubjectName}/${item.subjectId}`);
                      navigate(`/${normalizedSubjectName}/${item.subjectId}`);
                    }}
                  >
                    <img
                      src={subjectIcons[item.subjectName] || subjectIcons['Class-Enviroment']}
                      alt={`${item.subjectName} icon`}
                      style={{
                        width: '50px',
                        height: '50px',
                        // marginLeft: '60px',
                        
                        //margin:'20px',
                        marginBottom: '20px', // Space between icon and text
                      }}
                    />
                    {item.subjectName}
                  </AssignmentButton>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography sx={{ textAlign: 'center', fontFamily: '"Quicksand", sans-serif', fontSize: '1.5rem' }}>
                  No assignments found.
                </Typography>
              </Grid>
            )}
          </Grid>
        </AssignmentContainer>
      </Box>
    </Box>
  );
}