// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   CircularProgress,
//   Alert,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import Header from '../Header';
// import LeftSidebar from '../LeftSidebar';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   fontFamily: '"Enriqueta", serif',
//   fontSize: '18px',
//   textAlign: 'center',
//   color: theme.palette.text.primary,
//   '&.header': {
//     backgroundColor: '#2295c7ff',
//     color: theme.palette.common.white,
//     fontSize: '20px',
//     fontWeight: 600,
//   },
// }));

// const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
//   borderRadius: '15px',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//   backgroundColor: '#fdfdfd',
// }));

// const StyledButtonContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   gap: '16px',
//   marginBottom: '8px',
// }));

// const StyledButton = styled(Button)(({ theme, isActive }) => ({
//   backgroundColor: isActive ? '#05445e' : 'rgba(69,150,164,1)',
//   color: 'white',
//   fontWeight: isActive ? 'bold' : 500,
//   fontSize: '1rem',
//   borderRadius: '8px',
//   padding: '8px 16px',
//   width: 'auto',
//   height: '50px',
//   textTransform: 'none',
//   border: isActive ? '1px solid #05445e' : '1px solid transparent',
//   '&:hover': {
//     backgroundColor: isActive ? '#05445e' : 'rgba(51, 122, 134, 1)',
//   },
// }));

// export default function Class_Chemistry() {
//   const [activeTab, setActiveTab] = useState('upload');
//   const [selectedAssignment, setSelectedAssignment] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [assignmentOptions, setAssignmentOptions] = useState([]);
//   const [uploadedAssignments, setUploadedAssignments] = useState([]);
//   const [checkedAssignments, setCheckedAssignments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const fileInputRef = useRef(null);

//      const payload = { subjectId: 1, assignmentId: 0, classId: 1, sectionId: 15, studentId: 1 };
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMzYwMyIsIkdycElkIjoiNCIsIlVzZXJUeXBlIjoiU3R1ZGVudCIsIkVtcElkIjoiMSIsIlNjaG9vbE5hbWUiOiJKRUVWQU4gQURBUlNIIFZJREhZQUxBWSIsIkVtcE5hbWUiOiJSQUdIQVYiLCJleHAiOjE3ODI4OTg1NDEsImlzcyI6ImV4YW1FbmdpbmVBUGkiLCJhdWQiOiJNeUFwaVNlcnZpY2UifQ.WW7RUCYCjs-47zuBE28_htMxrGm1O4Mt4StyC3K4OpU';
//   const apiURL = 'https://arizshad-002-site5.ktempurl.com/api';
//   const endpoints = {
//     assignmentAdd: 'Student/Assignmentddl',
//     checkedDetail: 'Student/AssignmentCheckedDetails',
//     uncheckedDetail: 'Student/AssignmentUncheckedDetails',
//     upload: 'Student/UplodAssignment',
//   };

//   const performFetch = async (endpoint, body, isFormData = false) => {
//     try {
//       const headers = isFormData ? { Authorization: 'Bearer ' + token } : {
//         Authorization: 'Bearer ' + token,
//         'Content-Type': 'application/json',
//       };
//       console.log('Fetching ' + endpoint + ':', { url: apiURL + '/' + endpoint, body, headers });
//       const response = await fetch(apiURL + '/' + endpoint, {
//         method: 'POST',
//         headers,
//         body: isFormData ? body : JSON.stringify(body),
//       });
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Error at ' + endpoint + ': ' + response.status + ' - ' + errorText);
//         if (response.status === 401) {
//           throw new Error('Unauthorized: Invalid or expired token. Please log in again.');
//         } else if (response.status === 404) {
//           throw new Error('Endpoint not found: ' + endpoint + '. Please verify with the backend team.');
//         }
//         throw new Error('Request failed: ' + response.statusText + ' (' + response.status + ') - ' + errorText);
//       }
//       const data = await response.json();
//       console.log(endpoint + ' response:', data);
//       return data;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const fetchAssignmentOptions = async () => {
//     setLoading(true);
//     try {
//       const data = await performFetch(endpoints.assignmentAdd, payload);
//       if (data.msg === 'Record Not Found') {
//         setError('No assignments found for dropdown');
//         setAssignmentOptions([]);
//       } else {
//         setAssignmentOptions(Array.isArray(data) ? data : data.data || []);
//       }
//     } catch (err) {
//       setError('Assignment dropdown error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUploadedAssignments = async () => {
//     setLoading(true);
//     try {
//       const data = await performFetch(endpoints.uncheckedDetail, payload);
//       if (data.msg === 'Record Not Found') {
//         setError('No uploaded assignments found');
//         setUploadedAssignments([]);
//       } else {
//         setUploadedAssignments(Array.isArray(data) ? data : data.data || []);
//       }
//     } catch (err) {
//       setError('Uploaded assignments error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCheckedAssignments = async () => {
//     setLoading(true);
//     try {
//       const data = await performFetch(endpoints.checkedDetail, payload);
//       if (data.msg === 'Record Not Found') {
//         setError('No checked assignments found');
//         setCheckedAssignments([]);
//       } else {
//         setCheckedAssignments(Array.isArray(data) ? data : data.data || []);
//       }
//     } catch (err) {
//       setError('Checked assignments error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       setError('No authentication token found. Please log in again.');
//       return;
//     }
//     if (activeTab === 'upload') {
//       fetchAssignmentOptions();
//       fetchUploadedAssignments();
//     } else if (activeTab === 'checked') {
//       fetchCheckedAssignments();
//     }
//   }, [activeTab, token]);

//   const handleAssignmentChange = (e) => setSelectedAssignment(e.target.value);
//   const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

//   const handleUpload = async () => {
//     if (!selectedAssignment) return alert('Please select an assignment.');
//     if (!selectedFile) return alert('No file selected.');

//     const formData = new FormData();
//     formData.append('assignment', selectedAssignment);
//     formData.append('file', selectedFile);
//     Object.entries(payload).forEach(([key, value]) => {
//       formData.append(key, String(value));
//     });

//     try {
//       setLoading(true);
//       const data = await performFetch(endpoints.upload, formData, true);
//       alert('Upload successfully');
//       await fetchUploadedAssignments();
//       setSelectedAssignment('');
//       setSelectedFile(null);
//       fileInputRef.current.value = null;
//     } catch (err) {
//       setError('Upload error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTabChange = (newValue) => {
//     setActiveTab(newValue);
//     setError(null);
//   };

//   return (
//     <Box sx={{ minHeight: '100vh',
//     // backgroundColor: '#EBE5C2',
//     backgroundColor:'#d4f1f4',
//      }}>
//       <Header />
//       <Container maxWidth="lg">
//         <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 1100, marginLeft: 10, bgcolor: 'linear-gradient(to right, #304352, #d7d2cc)' }}>
//           <Grid item xs={12} md={3} lg={2}>
//             <LeftSidebar />
//           </Grid>
//           <Grid item xs={12} md={9} lg={10} sx={{ mt: 12, ml: { md: 10 } }}>
//             {error && (
//               <Alert severity="error" sx={{ mb: 2 }}>
//                 {error}
//               </Alert>
//             )}
//             {loading && (
//               <Alert severity="info" sx={{ mb: 2 }}>
//                 Loading...
//               </Alert>
//             )}
//             <StyledButtonContainer>
//               <StyledButton
//                 isActive={activeTab === 'upload'}
//                 onClick={() => handleTabChange('upload')}
//               >
//                 Assignment Upload
//               </StyledButton>
//               <StyledButton
//                 isActive={activeTab === 'checked'}
//                 onClick={() => handleTabChange('checked')}
//               >
//                 Checked Assignments
//               </StyledButton>
//             </StyledButtonContainer>
//             {activeTab === 'upload' && (
//               <Box sx={{ p: 4, border: '1px solid black', borderRadius: '0px', bgcolor: '#fdfdfd', mb: 4, width: 1000 }}>
//                 <Typography variant="h5" align="center" sx={{ mb: 4, fontFamily: 'Nunito', bgcolor: '#05445e',color:'white'}}>
//                   Class-Hindi Assignment Upload
//                 </Typography>
//                 <FormControl fullWidth sx={{ mb: 2 }}>
//                   <InputLabel>Select Assignment</InputLabel>
//                   <Select
//                     value={selectedAssignment}
//                     onChange={(e) => setSelectedAssignment(e.target.value)}
//                     label="Select Assignment"
//                   >
//                     <MenuItem value="">Choose an assignment</MenuItem>
//                     {Array.isArray(assignmentOptions) && assignmentOptions.length > 0 ? (
//                       assignmentOptions.map((option, index) => (
//                         <MenuItem key={index} value={option.assignment || option.assignmentId}>
//                           {option.assignment || option.assignmentId || 'Unnamed Assignment'}
//                         </MenuItem>
//                       ))
//                     ) : (
//                       <MenuItem disabled>No assignments available</MenuItem>
//                     )}
//                   </Select>
//                 </FormControl>
//                 <TextField
//                   type="file"
//                   inputRef={fileInputRef}
//                   onChange={(e) => setSelectedFile(e.target.files[0])}
//                   fullWidth
//                   sx={{ mb: 2 }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="success"
//                   onClick={handleUpload}
//                   disabled={loading}
//                   sx={{ mb: 4, bgcolor: '#05445e','&:hover':{bgcolor:'#115f81ff'}}}
//                 >
//                   {loading ? 'Uploading...' : 'Upload'}
//                 </Button>
//                 <StyledTableContainer component={Paper} sx={{ width: '900px' }}>
//                   <Table>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: '#2295c7ff' }}>
//                         <StyledTableCell className="header">Teacher Name</StyledTableCell>
//                         <StyledTableCell className="header">Assignment</StyledTableCell>
//                         <StyledTableCell className="header">Subject</StyledTableCell>
//                         <StyledTableCell className="header">View</StyledTableCell>
//                         <StyledTableCell className="header">Date</StyledTableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {Array.isArray(uploadedAssignments) && uploadedAssignments.length > 0 ? (
//                         uploadedAssignments.map((item, index) => (
//                           <TableRow key={index}>
//                             <TableCell sx={{ fontSize: '1rem' }}>{item.teacherName || '—'}</TableCell>
//                             <TableCell sx={{ fontSize: '1rem' }}>{item.assignment || '—'}</TableCell>
//                             <TableCell sx={{ fontSize: '1rem' }}>{item.subjectName || '—'}</TableCell>
//                             <TableCell sx={{ fontSize: '1rem' }}>
//                               <Button variant="contained" color="info" size="small" sx={{
//                                 // bgcolor: ' #4CAF50',
//                                 bgcolor:'#187197ff',
//                                 '&:hover': {bgcolor:'#2a90bbff'},
//                                  color: 'white', fontSize: '1rem' }}>
//                                 View
//                               </Button>
//                             </TableCell>
//                             <TableCell sx={{ fontSize: "1rem" }}>{item.assignmentDate || '—'}</TableCell>
//                           </TableRow>
//                         ))
//                       ) : (
//                         <TableRow>
//                           <TableCell colSpan={5} align="center">
//                             No uploaded assignments available
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </TableBody>
//                   </Table>
//                 </StyledTableContainer>
//               </Box>
//             )}
//             {activeTab === 'checked' && (
//               <Box sx={{ p: 4, border: '1px solid black', borderRadius: '0px', bgcolor: '#fdfdfd', mb: 4, width: 1000 }}>
//                 <StyledTableContainer component={Paper} sx={{ width: 900 }}>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <StyledTableCell className="header">Teacher</StyledTableCell>
//                         <StyledTableCell className="header">Assignment</StyledTableCell>
//                         <StyledTableCell className="header">Subject</StyledTableCell>
//                         <StyledTableCell className="header">View</StyledTableCell>
//                         <StyledTableCell className="header">Date</StyledTableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {Array.isArray(checkedAssignments) && checkedAssignments.length > 0 ? (
//                         checkedAssignments.map((item, index) => (
//                           <TableRow key={index}>
//                             <TableCell sx={{ fontSize: '1rem' }}>{item.teacherName || '—'}</TableCell>
//                             <TableCell sx={{ fontSize: '1rem' }}>{item.assignment || '—'}</TableCell>
//                             <TableCell sx={{ fontSize: '1rem' }}>{item.subjectName || '—'}</TableCell>
//                             <TableCell sx={{ fontSize: '1rem' }}>
//                               <Button variant="contained" color="info" size="small" sx={{ bgcolor: '#187197ff' }}>
//                                 View
//                               </Button>
//                             </TableCell>
//                             <TableCell sx={{ fontSize: "1rem" }}>{item.assignmentDate || '—'}</TableCell>
//                           </TableRow>
//                         ))
//                       ) : (
//                         <TableRow>
//                           <TableCell colSpan={5} align="center">
//                             No checked assignments available
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </TableBody>
//                   </Table>
//                 </StyledTableContainer>
//               </Box>
//             )}
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../Header';
import LeftSidebar from '../LeftSidebar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Enriqueta", serif',
  fontSize: '18px',
  textAlign: 'center',
  color: theme.palette.text.primary,
  '&.header': {
    backgroundColor: '#2295c7ff',
    color: theme.palette.common.white,
    fontSize: '20px',
    fontWeight: 600,
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '15px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  backgroundColor: '#fdfdfd',
}));

const StyledButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '16px',
  marginBottom: '8px',
}));

const StyledButton = styled(Button)(({ theme, isActive }) => ({
  backgroundColor: isActive ? '#05445e' : 'rgba(69,150,164,1)',
  color: 'white',
  fontWeight: isActive ? 'bold' : 500,
  fontSize: '1rem',
  borderRadius: '8px',
  padding: '8px 16px',
  width: 'auto',
  height: '50px',
  textTransform: 'none',
  border: isActive ? '1px solid #05445e' : '1px solid transparent',
  '&:hover': {
    backgroundColor: isActive ? '#05445e' : 'rgba(51, 122, 134, 1)',
  },
}));

export default function Class_Chemistry() {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [assignmentOptions, setAssignmentOptions] = useState([]);
  const [uploadedAssignments, setUploadedAssignments] = useState([]);
  const [checkedAssignments, setCheckedAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const fileInputRef = useRef(null);

  const payload = { subjectId: 1, assignmentId: 0, classId: 1, sectionId: 15, studentId: 1 };
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMzYwMyIsIkdycElkIjoiNCIsIlVzZXJUeXBlIjoiU3R1ZGVudCIsIkVtcElkIjoiMSIsIlNjaG9vbE5hbWUiOiJKRUVWQU4gQURBUlNIIFZJREhZQUxBWSIsIkVtcE5hbWUiOiJSQUdIQVYiLCJleHAiOjE3ODI4OTg1NDEsImlzcyI6ImV4YW1FbmdpbmVBUGkiLCJhdWQiOiJNeUFwaVNlcnZpY2UifQ.WW7RUCYCjs-47zuBE28_htMxrGm1O4Mt4StyC3K4OpU';
  const apiURL = 'https://arizshad-002-site5.ktempurl.com/api';
  const endpoints = {
    assignmentAdd: 'Student/Assignmentddl',
    checkedDetail: 'Student/AssignmentCheckedDetails',
    uncheckedDetail: 'Student/AssignmentUncheckedDetails',
    upload: 'Student/UplodAssignment',
  };

  const performFetch = async (endpoint, body, isFormData = false) => {
    try {
      const headers = isFormData ? { Authorization: 'Bearer ' + token } : {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      };
      console.log('Fetching ' + endpoint + ':', { url: apiURL + '/' + endpoint, body, headers });
      const response = await fetch(apiURL + '/' + endpoint, {
        method: 'POST',
        headers,
        body: isFormData ? body : JSON.stringify(body),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error at ' + endpoint + ': ' + response.status + ' - ' + errorText);
        if (response.status === 401) {
          throw new Error('Unauthorized: Invalid or expired token. Please log in again.');
        } else if (response.status === 404) {
          throw new Error('Endpoint not found: ' + endpoint + '. Please verify with the backend team.');
        }
        throw new Error('Request failed: ' + response.statusText + ' (' + response.status + ') - ' + errorText);
      }
      const data = await response.json();
      console.log(endpoint + ' response:', data);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const fetchAssignmentOptions = async () => {
    setLoading(true);
    try {
      const data = await performFetch(endpoints.assignmentAdd, payload);
      if (data.msg === 'Record Not Found') {
        setError('No assignments found for dropdown');
        setAssignmentOptions([]);
      } else {
        setAssignmentOptions(Array.isArray(data) ? data : data.data || []);
      }
    } catch (err) {
      setError('Assignment dropdown error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUploadedAssignments = async () => {
    setLoading(true);
    try {
      const data = await performFetch(endpoints.uncheckedDetail, payload);
      if (data.msg === 'Record Not Found') {
        setError('No uploaded assignments found');
        setUploadedAssignments([]);
      } else {
        setUploadedAssignments(Array.isArray(data) ? data : data.data || []);
      }
    } catch (err) {
      setError('Uploaded assignments error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCheckedAssignments = async () => {
    setLoading(true);
    try {
      const data = await performFetch(endpoints.checkedDetail, payload);
      if (data.msg === 'Record Not Found') {
        setError('No checked assignments found');
        setCheckedAssignments([]);
      } else {
        setCheckedAssignments(Array.isArray(data) ? data : data.data || []);
      }
    } catch (err) {
      setError('Checked assignments error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError('No authentication token found. Please log in again.');
      return;
    }
    if (activeTab === 'upload') {
      fetchAssignmentOptions();
      fetchUploadedAssignments();
    } else if (activeTab === 'checked') {
      fetchCheckedAssignments();
    }
  }, [activeTab, token]);

  const handleAssignmentChange = (e) => setSelectedAssignment(e.target.value);
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleUpload = async () => {
    if (!selectedAssignment) {
      setSnackbar({ open: true, message: 'Please select an assignment.', severity: 'error' });
      return;
    }
    if (!selectedFile) {
      setSnackbar({ open: true, message: 'No file selected.', severity: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('assignment', selectedAssignment);
    formData.append('file', selectedFile);
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    try {
      setLoading(true);
      const data = await performFetch(endpoints.upload, formData, true);
      setSnackbar({ open: true, message: 'Upload successful', severity: 'success' });
      await fetchUploadedAssignments();
      setSelectedAssignment('');
      setSelectedFile(null);
      fileInputRef.current.value = null;
    } catch (err) {
      setError('Upload error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    setError(null);
  };

  return (
    <Box sx={{ minHeight: '100vh',
    // backgroundColor: '#EBE5C2',
    backgroundColor: '#d4f1f4',
     }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 1100, marginLeft: 10, bgcolor: 'linear-gradient(to right, #304352, #d7d2cc)' }}>
          <Grid item xs={12} md={3} lg={2}>
            <LeftSidebar />
          </Grid>
          <Grid item xs={12} md={9} lg={10} sx={{ mt: 12, ml: { md: 10 } }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {loading && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Loading...
              </Alert>
            )}
            <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                {snackbar.message}
              </Alert>
            </Snackbar>
            <StyledButtonContainer>
              <StyledButton
                isActive={activeTab === 'upload'}
                onClick={() => handleTabChange('upload')}
              >
                Assignment Upload
              </StyledButton>
              <StyledButton
                isActive={activeTab === 'checked'}
                onClick={() => handleTabChange('checked')}
              >
                Checked Assignments
              </StyledButton>
            </StyledButtonContainer>
            {activeTab === 'upload' && (
              <Box sx={{ p: 4, border: '1px solid black', borderRadius: '0px', bgcolor: '#fdfdfd', mb: 4, width: 1000 }}>
                <Typography variant="h5" align="center" sx={{ mb: 4, fontFamily: 'Nunito', bgcolor: '#05445e', color: 'white' }}>
                  Class-Hindi Assignment Upload
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Select Assignment</InputLabel>
                  <Select
                    value={selectedAssignment}
                    onChange={(e) => setSelectedAssignment(e.target.value)}
                    label="Select Assignment"
                  >
                    <MenuItem value="">Choose an assignment</MenuItem>
                    {Array.isArray(assignmentOptions) && assignmentOptions.length > 0 ? (
                      assignmentOptions.map((option, index) => (
                        <MenuItem key={index} value={option.assignment || option.assignmentId}>
                          {option.assignment || option.assignmentId || 'Unnamed Assignment'}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No assignments available</MenuItem>
                    )}
                  </Select>
                </FormControl>
                <TextField
                  type="file"
                  inputRef={fileInputRef}
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleUpload}
                  disabled={loading}
                  sx={{ mb: 4, bgcolor: '#05445e', '&:hover': { bgcolor: '#115f81ff' } }}
                >
                  {loading ? 'Uploading...' : 'Upload'}
                </Button>
                <StyledTableContainer component={Paper} sx={{ width: '900px' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#2295c7ff' }}>
                        <StyledTableCell className="header">Teacher Name</StyledTableCell>
                        <StyledTableCell className="header">Assignment</StyledTableCell>
                        <StyledTableCell className="header">Subject</StyledTableCell>
                        <StyledTableCell className="header">View</StyledTableCell>
                        <StyledTableCell className="header">Date</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(uploadedAssignments) && uploadedAssignments.length > 0 ? (
                        uploadedAssignments.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontSize: '1rem' }}>{item.teacherName || '—'}</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>{item.assignment || '—'}</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>{item.subjectName || '—'}</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>
                              <Button variant="contained" color="info" size="small" sx={{
                                bgcolor: '#187197ff',
                                '&:hover': { bgcolor: '#2a90bbff' },
                                color: 'white', fontSize: '1rem' }}>
                                View
                              </Button>
                            </TableCell>
                            <TableCell sx={{ fontSize: "1rem" }}>{item.assignmentDate || '—'}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            No uploaded assignments available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </StyledTableContainer>
              </Box>
            )}
            {activeTab === 'checked' && (
              <Box sx={{ p: 4, border: '1px solid black', borderRadius: '0px', bgcolor: '#fdfdfd', mb: 4, width: 1000 }}>
                <StyledTableContainer component={Paper} sx={{ width: 900 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell className="header">Teacher</StyledTableCell>
                        <StyledTableCell className="header">Assignment</StyledTableCell>
                        <StyledTableCell className="header">Subject</StyledTableCell>
                        <StyledTableCell className="header">View</StyledTableCell>
                        <StyledTableCell className="header">Date</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(checkedAssignments) && checkedAssignments.length > 0 ? (
                        checkedAssignments.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontSize: '1rem' }}>{item.teacherName || '—'}</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>{item.assignment || '—'}</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>{item.subjectName || '—'}</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>
                              <Button variant="contained" color="info" size="small" sx={{ bgcolor: '#187197ff' }}>
                                View
                              </Button>
                            </TableCell>
                            <TableCell sx={{ fontSize: "1rem" }}>{item.assignmentDate || '—'}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            No checked assignments available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </StyledTableContainer>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}