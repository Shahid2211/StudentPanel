import { Box, TextField, Typography, MenuItem, Chip } from '@mui/material';
import React from 'react';

export default function Exam() {
  const fields = [
    { label: 'Exam', value: 'Shahid', options: ['Test', 'Final', 'Mid-Term'] },
    { label: 'Exam Type', value: 'Anual Exam', options: ['Anual Exam', 'Quarterly', 'Half-Yearly'] },
    { label: 'Sub Exam', value: 'Written Type', options: ['Written Type', 'Oral', 'Practical'] },
    { label: 'Teacher', value: 'Shahid', options: ['Shahid', 'Ravi', 'MD Adil','Nafisa Mam'] },
    { label: 'Class', value: 'Nur', options: ['Nur', 'LKG', 'UKG', '1st'] },
    { label: 'Section', value: 'A', options: ['A', 'B', 'C'] },
    { label: 'Subject', value: 'Environment', options: ['Environment', 'Math', 'Hindi', 'English','React js'] },
  ];

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 350,
          height:'100vh',
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflowX:'hidden'
        }}
      >
        <Box
          sx={{
            bgcolor: '#8fa01f',
            color: 'white',
            py: 2,
            px: 1,
            textAlign: 'center',
            borderRadius: 1,
            mb: 2,
          }}
        >
          <Typography variant="h6">Examination Details</Typography>
        </Box>

        {fields.map((field, index) => (
          <Box key={index}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              {field.label}:
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              defaultValue={field.value}
            >
              {field.options.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        ))}
      
        <Chip label="Get Student" variant='outlined' sx={{bgcolor:'red',height:100,}}></Chip>
    
      </Box>
    </Box>
  );
}