
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Fade from '@mui/material/Fade';
import { FaTimes} from 'react-icons/fa';
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import LeftSidebar from './LeftSidebar';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Enriqueta", serif',
  fontSize: '18px',
  width:"125px",
  height:'80px',
  color: theme.palette.text.primary,
  textAlign: 'center',
  '&.header': {
    // backgroundColor: '#3F51B5',
    // backgroundColor:'#113F67',
    // backgroundColor:'#3E5F44',
    backgroundColor: '#2295c7ff',
    color: theme.palette.common.white,
    fontSize: '20px',
    width: '125px',
    height: '80px',
    fontWeight: 600,
    border: 'none',
  },
  '&.clickable': {
    cursor: 'pointer',
    color: 'black',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  '&.time': {
    fontFamily: '"Enriqueta", serif',
    fontSize: '18px',
    width: '125px',
    height: '80px',
    color: 'black',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 1.5px 10px 0 rgba(0,0,0,0.25)',
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper, // White background for body
  overflow: 'auto',
}));

export default function TimeTable() {
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTAxMiIsIkdycElkIjoiNCIsIlVzZXJUeXBlIjoiU3R1ZGVudCIsIkVtcElkIjoiMSIsIlNjaG9vbE5hbWUiOiJKZWV2YW4gQWRhcnNoIFNjaG9vbCIsIkVtcE5hbWUiOiJSQUdIQVYiLCJleHAiOjE3NzkzNTA5MzksImlzcyI6ImV4YW1FbmdpbmVBUGkiLCJhdWQiOiJNeUFwaVNlcnZpY2UifQ.MBYnyoludSizgqjcqUtbLWckdqnz9jg8lTzf9fLgADE';
  const tableURL = 'https://arizshad-002-site5.ktempurl.com/api/TimeTable/GetTimeTable';
const payload={classId:1,sectionId:15}
  useEffect(() => {
    axios
      .post(
        tableURL,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setTimetableData(data);
      })
      .catch((err) => {
        console.error('Error loading timetable:', err);
        if (err.response?.status === 401) {
          alert('Unauthorized: Invalid or expired token. Please log in again.');
        } else if (err.response?.status === 404) {
          alert('Timetable endpoint not found. Please verify the API URL.');
        } else {
          alert(`Failed to load timetable: ${err.message}`);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const groupedByPeriod = useMemo(() => {
    const grouped = {};
    timetableData.forEach((entry) => {
      const key = `${entry.startTime}_${entry.endTime}_${entry.periodSequenceNo}`;
      if (!grouped[key]) {
        grouped[key] = {
          startTime: entry.startTime,
          endTime: entry.endTime,
          periodLabel: `Period ${entry.periodSequenceNo}`,
          days: {},
        };
      }
      const normalizedDay =
        typeof entry.dayOfWeek === 'string'
          ? entry.dayOfWeek.charAt(0).toUpperCase() + entry.dayOfWeek.slice(1).toLowerCase()
          : entry.dayOfWeek;
      grouped[key].days[normalizedDay] = entry;
    });
    return grouped;
  }, [timetableData]);

  const handleCellClick = (entry) => {
    const safeEntry = entry || {
      subjectName: 'No Subject',
      teacherName: 'N/A',
      roomNo: 'N/A',
    };
    setSelectedEntry(safeEntry);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedEntry(null);
  };

  const classColors = {
    Hindi: { bg: '#fce4ec', close: '#8bc34a' },
    Eng: { bg: '#e3f2fd', close: '#ffeb3b' },
    Enviroment: { bg: '#e8f5e9', close: '#f44336' },
  };

  const currentClass =
    selectedEntry?.className || selectedEntry?.ClassName || selectedEntry?.class || 'Class 1';
  const dialogBgColor = classColors[currentClass]?.bg || '#fff';
  const btnCloseBgColor = classColors[currentClass]?.close || '#ffeb3b';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh',backgroundColor:'#d4f1f4' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} lg={2}>
            <LeftSidebar />
          </Grid>
          <Grid item xs={12} md={9} lg={10} sx={{marginLeft:'200px'}}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontFamily: '"Segoe UI"', fontWeight: 600, mt: 6 }}
            >
              Time Table
            </Typography>
            {loading ? (
              <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
              </Box>
            ) : (
              <StyledTableContainer component={Paper} sx={{
                // backgroundColor:'#3F51B5',
                // bgcolor:'#113F67',
                // backgroundColor:'#3E5F44',
                bgcolor: '#2295c7ff',
                width:1100,marginLeft:-9}}>
                <Table sx={{bgcolor:'white'}}>
                  <TableHead sx={{border:'none'}} >
                    <TableRow sx={{border:'none'}}>
                      <StyledTableCell className="header" colSpan={3}>
                        Time
                      </StyledTableCell>
                      {days.map((day) => (
                        <StyledTableCell key={day} className="header">
                          {day}
                        </StyledTableCell>
                      ))}
                    </TableRow>
                    <TableRow sx={{border:'1px solid white'}}>
                      <StyledTableCell style={{border:'1px solid white'}} className="header">Start</StyledTableCell>
                      <StyledTableCell style={{border:'1px solid white'}} className="header">End</StyledTableCell>
                      <StyledTableCell style={{border:'1px solid white'}} className="header">Period</StyledTableCell>
                      {days.map((_, idx) => (
                        <StyledTableCell key={idx} className="header" />
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(groupedByPeriod).map(([_, period], index) => (
                      <TableRow key={index}>
                        <StyledTableCell sx={{width:'100px'}} className="time">{period.startTime}</StyledTableCell>
                        <StyledTableCell sx={{width:'100px'}} className="time">{period.endTime}</StyledTableCell>
                        <StyledTableCell sx={{width:'100px'}} className="time">{period.periodLabel}</StyledTableCell>
                        {days.map((day, j) => {
                          const entry = period.days[day];
                          return (
                            <StyledTableCell
                              key={j}
                              className="clickable"
                              sx={{width:125}}
                              onClick={() => handleCellClick(entry)}
                            >
                              {entry ? (
                                <>
                                  <strong>{entry.subjectName}</strong>
                                  <br />
                                  <Typography variant="caption" component="span">
                                    ~ {entry.teacherName}
                                  </Typography>
                                  <br />
                                  <Typography variant="caption" component="span">
                                    {entry.roomNo && `Room ${entry.roomNo}`}
                                  </Typography>
                                </>
                              ) : '-'}
                            </StyledTableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            )}
          </Grid>
        </Grid>
      </Container>
<Dialog
  open={showDialog}
  onClose={handleCloseDialog}
  maxWidth="md" // Use maxWidth instead of width
  fullWidth={true} // Correct fullWidth to boolean
  TransitionComponent={Fade} // Add to prevent transition-related errors
  PaperProps={{
    sx: {
      width: '500px', // Set specific width
      minHeight: '200px', // Set a minimum height
      borderRadius: '16px', // Apply borderRadius to the Dialog's Paper
      overflow: 'hidden', // Ensure content doesn't clip the border radius
    },
  }}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-content"
>
  <Box sx={{ bgcolor: 'white' /* Match DialogTitle bgcolor */, minHeight: '100%' }}>
    <DialogTitle
      sx={{
        
       bgcolor:'#015551',
      // bgcolor:'rgba(17,20,34,1)',
        color: 'white',
        fontSize: '25px',
        fontFamily: '"Inter"',
        position: 'relative',
      }}
    >
      ClassName: {selectedEntry?.subjectName || 'Details'}
      📚
      <FaTimes
        onClick={handleCloseDialog}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          borderRadius: '50%',
          border: '2px solid white',
          transform: 'translateY(-50%)',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          width: '30px',
          height: '30px',
          zIndex: 10,
        }}
      />
    </DialogTitle>
    <DialogContent sx={{ marginTop: '20px', padding: 2 }}>
      <Typography paragraph>
        <strong>Teacher Name:</strong> {selectedEntry?.teacherName || 'N/A'}
        
      </Typography>
      <Typography paragraph sx={{ paddingY: '-5px' }}>
        <strong>Room No:</strong> {selectedEntry?.roomNo || 'N/A'}
      </Typography>
    </DialogContent>
    <DialogActions>
      {/* Add buttons here if needed */}
    </DialogActions>
  </Box>
</Dialog>
    </Box>
  );
}
