
import React, { useState } from 'react';
import { pdf, Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { Box, Button, Typography, TextField } from '@mui/material';
import './App.css';
import Logo from './Images/AnugrahLogo.png';

// PDF-specific styles
const pdfStyles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#f0f4f8',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerBox: {
    width: '90%',
    height: '95%',
    borderWidth: 5,
    borderColor: '#EB5B00',
    backgroundColor: 'white',
    borderRadius:'25px',
    padding: 20,
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  estd: {
    position: 'absolute',
    top: 10,
    left: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 400,
    height: 250,
    marginTop: 8,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    width: 400,
    height: 50,
    backgroundColor: '#FF9F00',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    borderRadius: 25,
    marginTop: 15,
    marginBottom: 10,
    padding: 15,
  },
  semester: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 10,
  },
  assignmentTitle: {
    fontSize: 24,
    borderBottomWidth: 4,
    // borderBottomColor: 'blue',
    textDecoration:'underline',
    paddingBottom: 5,
    marginBottom: 20,
    marginTop: 5,
    // width: '100%',
    textAlign: 'center',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    color: 'blue',
    width: '100%',
    maxWidth: 500,
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    width: 200,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    flex: 1,
    fontSize: 12,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto',
    paddingBottom: 30,
  },
  footerLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  footerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  footerLabel: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    width: 170,
    marginBottom: 5,
  },
  footerText: {
    fontSize: 14,
    color: 'blue',
  },
});

// PDF Component
const CollegeFrontPagePDF = ({ formData }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.outerBox}>
        <Text style={pdfStyles.estd}>ESTD.-1964</Text>
        <Image src={Logo} style={pdfStyles.logo} />
        <Text style={pdfStyles.title}>ANUGRAH MEMORIAL COLLEGE GAYA</Text>
        <Text style={pdfStyles.button}>MSC-IT 24-26</Text>
        <Text style={pdfStyles.semester}>(First Semester)</Text>
        <Text style={pdfStyles.assignmentTitle}>Assignment</Text>
        <View style={pdfStyles.formContainer}>
          {[
            { label: 'Course Title', value: formData.courseTitle },
            { label: 'Student Name', value: formData.studentName },
            { label: 'Student Roll No', value: formData.studentRollNo },
            { label: 'Reg No', value: formData.regNo },
          ].map(({ label, value }, index) => (
            <View key={index} style={pdfStyles.formRow}>
              <Text style={pdfStyles.label}>{label}:</Text>
              <Text style={pdfStyles.input}>{value || ' '}</Text>
            </View>
          ))}
        </View>
        <View style={pdfStyles.footer}>
          <View style={pdfStyles.footerLeft}>
            <Text style={{ ...pdfStyles.footerLabel, width: 300 }}>.......................</Text>
            <Text style={pdfStyles.footerText}>Submission Date</Text>
          </View>
          <View style={pdfStyles.footerRight}>
            <Text style={pdfStyles.footerLabel}>..............................</Text>
            <Text style={pdfStyles.footerText}>Candidate Signature</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

// React Component
function CollegeFrontPage() {
  const [formData, setFormData] = useState({
    courseTitle: '',
    studentName: '',
    studentRollNo: '',
    regNo: '',
  });

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleGeneratePDF = async () => {
    try {
      const blob = await pdf(<CollegeFrontPagePDF formData={formData} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
  
      bgcolor: 'white' 
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '900px', 
        height: '950px', 
        borderRadius:'25PX',
        border: '5px solid #EB5B00', 
        bgcolor: 'white', 
        p: 4,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        position: 'relative',
      }}>
        <Box sx={{ position: 'absolute', top: '10px', left: '20px' }}>
          <b style={{ fontSize: '1.5rem' }}>ESTD.-1964</b>
        </Box>
        <Box component="img" src={Logo} alt="Anugrah Memorial College Logo" sx={{ width: '300px', height: '200px', marginTop: '60px', mb: '10px' }} />
        
        {/* SVG for Crescent Moon Text */}
        <Box sx={{ position: 'relative', mb: 4, mt: 3 }}>
          <svg width="600" height="300" style={{ position: 'absolute', top: '-60px', left: '35%', transform: 'translateX(-40%)' }}>
            <path
              id="crescentPath"
              viewBox="0 0 600 300"
              d="M 50,200 C 50,50 550,50 550,200"
              fill="none"
            />
            <text className="moon-text">
              <textPath href="#crescentPath" startOffset="3%" textAnchor="start" letterSpacing="3" style={{ fontSize: '2rem', fontWeight: 'bold', fill: '#1a237e', textShadow: '3px 3px 5px #ffff00' }}>
                ANUGRAH MEMORIAL COLLEGE GAYA
              </textPath>
            </text>
          </svg>
          {/* Button positioned below the SVG */}
          <Button 
            sx={{ 
              width: '400px', 
              height: '60px', 
              bgcolor: '#FF9F00', 
              color: 'white', 
              borderRadius: '25px',
              fontSize: '1.5rem', 
              mt: '90px',
              '&:hover': { bgcolor: 'darkred' }
            }}
          >
            MSC-IT 24-26
          </Button>
        </Box>

        <Typography 
          variant="h6" 
          sx={{ color: 'blue',mt:0 }}
        >
          (First Semester)
        </Typography>
        <Typography variant="h4" sx={{ 
          borderBottom: '4px solid blue', 
          pb: 1, 
          mb: 3, 
          mt: '10px',
          width: '100%', 
          textAlign: 'center' 
        }}>
          Assignment
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2, 
          color: 'blue',
          width: '100%', 
          maxWidth: '500px' 
        }}>
          {[
            { label: 'Course Title', field: 'courseTitle' },
            { label: 'Student Name', field: 'studentName' },
            { label: 'Student Roll No', field: 'studentRollNo' },
            { label: 'Reg No', field: 'regNo' },
          ].map(({ label, field }, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ width: '200px', textAlign: 'right', fontWeight: 'bold', fontSize: '1.2rem' }}>
                {label}:
              </Typography>
              <TextField 
                variant="outlined" 
                size="small" 
                fullWidth 
                sx={{ flex: 1 }} 
                value={formData[field]}
                onChange={handleInputChange(field)}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%', 
          marginTop: 'auto',
          paddingBottom: '60px'
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: '30px' }}>
            <label style={{ color: 'blue', margin: '0', width: '300px', fontSize: '1.5rem', fontWeight: 'bold' }}>
              .......................
            </label>
            <Typography sx={{ fontSize: '1.2rem', color: 'blue' }}>Submission Date</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: '30px', mt: '30px' }}>
            <label style={{ color: 'blue', margin: '0', fontSize: '1.5rem', width: '170px', fontWeight: 'bold', marginRight: '10px' }}>
              ..............................
            </label>
            <Typography sx={{ fontSize: '1.2rem', color: 'blue' }}>Candidate Signature</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGeneratePDF}
          sx={{ mt: 2, bgcolor: '#05445e', '&:hover': { bgcolor: '#115f81ff' } }}
        >
          Generate PDF
        </Button>
      </Box>
    </Box>
  );
}

export default CollegeFrontPage;