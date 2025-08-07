// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button,
//   Modal, TextField, CircularProgress, InputAdornment, AppBar, Toolbar, Chip, IconButton,
//   Avatar, Snackbar, Alert, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText
// } from '@mui/material';
// import {
//   FaTachometerAlt, FaEnvelope, FaBookmark, FaUsers, FaFolder, FaShoppingCart,
//   FaChartBar, FaCog
// } from 'react-icons/fa';
// import { styled, alpha } from '@mui/material/styles';
// import { FaTimes, FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import Fade from '@mui/material/Fade'; // Added for Modal transition
// import { ThemeProvider, createTheme } from '@mui/material/styles'; // Added for ThemeProvider
// import axios from 'axios';

// // Create a theme for MUI
// const theme = createTheme();

// // Styled components for SearchAppBar (unchanged)
// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(TextField)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     [theme.breakpoints.up('sm')]: {
//       width: '20ch',
//       '&:focus': {
//         width: '30ch',
//       },
//     },
//   },
// }));

// // CountryModal component (modified to include TransitionComponent)
// const CountryModal = ({ open, handleClose, mode, country, handleSubmit }) => {
//   const [countryName, setCountryName] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     console.log('CountryModal props:', { open, mode, country });
//     setCountryName(mode === 'add' ? '' : country?.countryName || '');
//   }, [mode, country]);

//   const onSubmit = () => {
//     if (!countryName.trim()) {
//       setError('Country name is required');
//       return;
//     }
//     handleSubmit(mode === 'add' ? { countryName } : { countryId: country?.countryId, countryName });
//     handleClose();
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-title"
//       aria-describedby="modal-description"
//       TransitionComponent={Fade} // Added to ensure proper transition handling
//     >
//       <Box
//         sx={{
//           position: 'absolute', // Added to center the modal
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)', // Center the modal
//           width: 400, // Set a width for better appearance
//         }}
//       >
//         <Box
//           sx={{
//             bgcolor: 'black',
//             p: 2,
//             borderTopLeftRadius: '12px',
//             borderTopRightRadius: '12px',
//             position: 'relative',
//           }}
//         >
//           <Typography
//             id="modal-title"
//             variant="h6"
//             component="h2"
//             sx={{ color: 'white', textTransform: 'capitalize', fontSize: '1.7rem' }}
//           >
//             {mode === 'add' ? 'Add New Country' : 'Edit Country'}
//           </Typography>
//           <FaTimes
//             onClick={handleClose}
//             style={{
//               position: 'absolute',
//               right: '10px',
//               top: '50%',
//               borderRadius: '50%',
//               border: '2px solid white',
//               transform: 'translateY(-50%)',
//               color: 'white',
//               fontSize: '20px',
//               cursor: 'pointer',
//               width: '30px',
//               height: '30px',
//             }}
//           />
//         </Box>
//         <Box sx={{ bgcolor: 'white', p: 2, borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
//           <TextField
//             fullWidth
//             label="Country Name"
//             value={countryName}
//             onChange={(e) => {
//               setCountryName(e.target.value);
//               setError('');
//             }}
//             sx={{ mb: 2 }}
//             error={!!error}
//             helperText={error}
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
//             <Button
//               onClick={onSubmit}
//               variant="contained"
//               color="primary"
//               sx={{ width: '80px', borderRadius: '25px' }}
//               disabled={!countryName.trim()}
//             >
//               {mode === 'add' ? 'Add' : 'Save'}
//             </Button>
//             <Button
//               onClick={handleClose}
//               variant="outlined"
//               sx={{ bgcolor: 'red', color: 'white', width: '80px', borderRadius: '25px' }}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// // CURD component (modified to fix handleOpenModalAdd and wrap in ThemeProvider)
// export default function CURD() {
//   const [countries, setCountries] = useState([]);
//   const [filteredCountries, setFilteredCountries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const [modalMode, setModalMode] = useState('add');
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [avatarSrc, setAvatarSrc] = useState('/static/images/Parrot.jpg');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const fileInputRef = useRef(null);

//   const handlePhotoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log('Selected file:', file);
//       const objectUrl = URL.createObjectURL(file);
//       setAvatarSrc(objectUrl);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//     setSuccessMessage('');
//   };

//   const Token1 = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMiIsIkdycElkIjoiMiIsIlVzZXJUeXBlIjoiRW1wbG95ZWUiLCJFbXBJZCI6IjYiLCJTY2hvb2xOYW1lIjoiSkVFVkFOIEFEQVJTSCBWSURIWUFMQVkiLCJFbXBOYW1lIjoiQWFkaWwiLCJleHAiOjE3NTI5NjgzMjgsImlzcyI6ImV4YW1FbmdpbmVBUGkiLCJhdWQiOiJNeUFwaVNlcnZpY2UifQ.JJlZtz0Ej0FZWYnVZqTCaoQqO4XELSD31JgTr68tbNE';

//   const fetchCountries = async () => {
//     try {
//       const response = await axios.post('https://arizshad-002-site5.ktempurl.com/api/Country/GetCountry', {}, {
//         headers: { Authorization: `${Token1}` },
//       });
//       console.log('POST /api/Country/GetCountry response:', JSON.stringify(response.data, null, 2));
//       setCountries(response.data);
//       setFilteredCountries(response.data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching countries:', err.response?.status, err.response?.data);
//       setError(`Failed to fetch countries: ${err.response?.status === 401 ? 'Unauthorized (401) - Token may be expired or invalid' : err.response?.status === 400 ? 'Bad Request (400) - Invalid request format' : err.message}`);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   useEffect(() => {
//     setFilteredCountries(
//       countries.filter((country) =>
//         country.countryName?.toLowerCase().includes(searchQuery.toLowerCase().trim())
//       )
//     );
//   }, [searchQuery, countries]);

//   const handleAdd = async (newCountry) => {
//     try {
//       console.log('POST /api/Country request body:', newCountry);
//       const response = await axios.post(
//         'https://arizshad-002-site5.ktempurl.com/api/Country',
//         newCountry,
//         {
//           headers: { Authorization: `${Token1}` },
//         }
//       );
//       console.log('POST /api/Country response:', JSON.stringify(response.data, null, 2));
//       const newCountryData = response.data.data || response.data;
//       setCountries((prev) => {
//         const updatedCountries = [...prev, {
//           countryId: newCountryData.countryId || Date.now(),
//           countryName: newCountryData.countryName || newCountry.countryName,
//         }];
//         console.log('Updated countries:', updatedCountries);
//         setFilteredCountries(
//           updatedCountries.filter((country) =>
//             country.countryName?.toLowerCase().includes(searchQuery.toLowerCase().trim())
//           )
//         );
//         return updatedCountries;
//       });
//       setError(null);
//       setSuccessMessage('Country added successfully');
//       setOpenSnackbar(true);
//       await fetchCountries();
//     } catch (err) {
//       console.error('Error adding country:', err.response?.status, err.response?.data);
//       setError(`Failed to add country: ${err.response?.status === 400 ? `Bad Request (400) - Invalid request format: ${JSON.stringify(err.response?.data)}` : err.response?.status === 401 ? 'Unauthorized (401) - Token may be expired or invalid' : err.message}`);
//     }
//   };

//   const handleUpdate = async (updatedCountry) => {
//     try {
//       console.log('POST /api/Country/UpdateCountry request body:', updatedCountry);
//       const response = await axios.post(
//         'https://arizshad-002-site5.ktempurl.com/api/Country/UpdateCountry',
//         updatedCountry,
//         {
//           headers: { Authorization: `${Token1}` },
//         }
//       );
//       console.log('POST /api/Country/UpdateCountry response:', JSON.stringify(response.data, null, 2));
//       setCountries((prev) => {
//         const updated = prev.map((country) =>
//           country.countryId === updatedCountry.countryId
//             ? { ...country, countryName: updatedCountry.countryName }
//             : country
//         );
//         console.log('Updated countries:', updated);
//         setFilteredCountries(
//           updated.filter((country) =>
//             country.countryName?.toLowerCase().includes(searchQuery.toLowerCase().trim())
//           )
//         );
//         return updated;
//       });
//       setError(null);
//       setSuccessMessage('Country edited successfully');
//       setOpenSnackbar(true);
//       await fetchCountries();
//     } catch (err) {
//       console.error('Error updating country:', err.response?.status, err.response?.data);
//       console.log('Allowed methods:', err.response?.headers?.allow || 'Not provided');
//       setError(`Failed to update country: ${err.response?.status === 405 ? `Method Not Allowed (405) - Allowed methods: ${err.response?.headers?.allow || 'Unknown'}` : err.response?.status === 400 ? `Bad Request (400) - Invalid request format: ${JSON.stringify(err.response?.data)}` : err.response?.status === 401 ? 'Unauthorized (401) - Token may be expired or invalid' : err.message}`);
//     }
//   };

//   const handleDelete = async (countryId) => {
//     try {
//       console.log('Attempting to delete country with ID:', countryId);
//       console.log('Current countries:', countries);
//       const countryExists = countries.find((country) => country.countryId === countryId);
//       if (!countryExists) {
//         throw new Error(`Country with ID ${countryId} not found in local state`);
//       }

//       await axios.delete(`https://arizshad-002-site5.ktempurl.com/api/Country/${countryId}`, {
//         headers: { Authorization: `${Token1}` },
//       });
//       console.log('DELETE /api/Country/', countryId, 'successful');
//       setCountries((prev) => {
//         const updatedCountries = prev.filter((country) => country.countryId !== countryId);
//         setFilteredCountries(
//           updatedCountries.filter((country) =>
//             country.countryName?.toLowerCase().includes(searchQuery.toLowerCase().trim())
//           )
//         );
//         return updatedCountries;
//       });
//       setError(null);
//       setSuccessMessage('Country deleted successfully');
//       setOpenSnackbar(true);
//     } catch (err) {
//       console.error('Error deleting country:', err.response?.status, err.response?.data, err.message);
//       console.log('Allowed methods:', err.response?.headers?.allow || 'Not provided');
//       if (err.response?.status === 404) {
//         try {
//           console.log('Trying fallback endpoint: /api/Country/DeleteCountry/', countryId);
//           await axios.delete(`https://arizshad-002-site5.ktempurl.com/api/Country/Id?CountryId=${countryId}`, {
//             headers: { Authorization: `${Token1}` },
//           });
//           console.log('DELETE /api/Country/DeleteCountry/', countryId, 'successful');
//           setCountries((prev) => {
//             const updatedCountries = prev.filter((country) => country.countryId !== countryId);
//             setFilteredCountries(
//               updatedCountries.filter((country) =>
//                 country.countryName?.toLowerCase().includes(searchQuery.toLowerCase().trim())
//               )
//             );
//             return updatedCountries;
//           });
//           setError(null);
//           setSuccessMessage('Country deleted successfully');
//           setOpenSnackbar(true);
//         } catch (fallbackErr) {
//           console.error('Fallback DELETE failed:', fallbackErr.response?.status, fallbackErr.response?.data);
//           setError(`Failed to delete country: ${fallbackErr.response?.status === 404 ? `Not Found (404) - Country ID ${countryId} may not exist or endpoint is incorrect. Tried /api/Country/${countryId} and /api/Country/DeleteCountry/${countryId}` : fallbackErr.response?.status === 405 ? `Method Not Allowed (405) - Allowed methods: ${fallbackErr.response?.headers?.allow || 'Unknown'}` : fallbackErr.response?.status === 401 ? 'Unauthorized (401) - Token may be expired or invalid' : fallbackErr.message}`);
//         }
//       } else {
//         setError(`Failed to delete country: ${err.response?.status === 404 ? `Not Found (404) - Country ID ${countryId} may not exist or endpoint /api/Country/${countryId} is incorrect` : err.response?.status === 405 ? `Method Not Allowed (405) - Allowed methods: ${err.response?.headers?.allow || 'Unknown'}` : err.response?.status === 401 ? 'Unauthorized (401) - Token may be expired or invalid' : err.message}`);
//       }
//     }
//   };

//   const handleOpenModalAdd = (mode, country = null) => {
//     setModalMode(mode);
//     setSelectedCountry(country); // Removed setSelectedCountry('')
//     setOpenModal(true);
//   };

//   const handleOpenModal = (mode, country = null) => {
//     setModalMode(mode);
//     setSelectedCountry(country);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setSelectedCountry(null);
//   };

//   const handleSubmit = (data) => {
//     if (modalMode === 'add') {
//       handleAdd(data);
//     } else {
//       handleUpdate(data);
//     }
//   };

//   const sidebarItems = [
//     { text: 'Dashboard', icon: <FaTachometerAlt /> },
//     { text: 'Messages', icon: <FaEnvelope /> },
//     { text: 'Saved', icon: <FaBookmark /> },
//     { text: 'Users', icon: <FaUsers /> },
//     { text: 'File Manager', icon: <FaFolder /> },
//     { text: 'Order', icon: <FaShoppingCart /> },
//     { text: 'Analytics', icon: <FaChartBar /> },
//     { text: 'Settings', icon: <FaCog /> },
//   ];

//   return (
//     <ThemeProvider theme={theme}> {/* Wrap in ThemeProvider */}
//       <AppBar position="fixed" sx={{ top: 0, width: '100%', zIndex: 1100, bgcolor: '#2A4759' }}>
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             sx={{ mr: 2 }}
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
//           >
//             Performing CURD Operation
//           </Typography>
//           <Search sx={{ borderRadius: '25px' }}>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search Countries…"
//               value={searchQuery}
//               sx={{ bgcolor: 'white', color: 'black', borderRadius: '25px' }}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </Search>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<FaPlus />}
//             onClick={() => handleOpenModalAdd('add')}
//             sx={{ ml: 2, borderRadius: '25px', bgcolor: '#2A4759', color: 'white' }}
//           >
//             Add New Country
//           </Button>
//           <IconButton
//             onClick={() => fileInputRef.current.click()}
//             sx={{ ml: 1 }}
//             aria-label="upload photo"
//           >
//             <Avatar
//               alt="Remy Sharp"
//               src={avatarSrc}
//               sx={{ width: 40, height: 40 }}
//             />
//           </IconButton>
//           <input
//             type="file"
//             accept="image/*"
//             style={{ display: 'none' }}
//             ref={fileInputRef}
//             onChange={handlePhotoUpload}
//           />
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         anchor="left"
//         variant="persistent"
//         open={sidebarOpen}
//         PaperProps={{
//           sx: { width: 200, bgcolor: '#2A4759', color: 'white', top: '64px', height: 'calc(100% - 64px)' }
//         }}
//       >
//         <List>
//           {sidebarItems.map((item) => (
//             <ListItem key={item.text} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon sx={{ color: 'white' }}>
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText primary={item.text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         background: 'white',
//         alignItems: 'center',
//         minHeight: '100vh',
//         pt: 8,
//         border: 'none',
//         ml: sidebarOpen ? '200px' : 0,
//         transition: 'margin-left 0.3s ease'
//       }}>
//         <Box sx={{ width: '600px', p: 2, border: 'none' }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
//             <TextField
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               sx={{ width: '70%', bgcolor: 'white', color: '#ffffff', borderRadius: '12px', fontSize: '20px' }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <FaSearch style={{ color: '#666' }} />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               sx={{ width: '300px', height: '58px', borderRadius: '12px', fontSize: '16px' }}
//               startIcon={<FaPlus />}
//               onClick={() => handleOpenModalAdd('add')}
//             >
//               Add New Country
//             </Button>
//           </Box>
//           <TableContainer
//             component={Box}
//             sx={{
//               bgcolor: '#8A2D3B',
//               borderRadius: 4,
//               boxShadow: 3,
//               overflowX: 'auto',
//               border: 'none !important',
//               '&::-webkit-scrollbar': { display: 'none' },
//               scrollbarWidth: 'none',
//             }}
//           >
//             <Table sx={{ minWidth: 400, bgcolor: 'white', border: 'none !important' }}>
//               <TableHead sx={{ border: 'none' }}>
//                 <TableRow sx={{ bgcolor: '#8A2D3B', border: 'none' }}>
//                   <TableCell
//                     sx={{
//                       color: 'white',
//                       fontSize: '20px',
//                       fontFamily: 'Nunito, sans-serif',
//                       textAlign: 'center',
//                       border: 'none',
//                     }}
//                   >
//                     Country Name
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       color: 'white',
//                       fontSize: '20px',
//                       fontFamily: 'Nunito, sans-serif',
//                       textAlign: 'center',
//                       border: 'none',
//                     }}
//                   >
//                     Action
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow>
//                     <TableCell colSpan={2} sx={{ py: 6, textAlign: 'center', border: 'none' }}>
//                       <CircularProgress />
//                     </TableCell>
//                   </TableRow>
//                 ) : error ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={2}
//                       sx={{ py: 6, textAlign: 'center', color: 'red', border: 'none' }}
//                     >
//                       {error}
//                     </TableCell>
//                   </TableRow>
//                 ) : filteredCountries.length > 0 ? (
//                   filteredCountries.map((country) => (
//                     <TableRow
//                       key={country.countryId}
//                       sx={{
//                         borderBottom: '1px solid #e0e0e0',
//                         '&:hover': { bgcolor: '#f5f5f5' },
//                       }}
//                     >
//                       <TableCell sx={{ textAlign: 'center', color: '#1A3C6C', border: 'none', fontSize: '20px' }}>
//                         {country.countryName}
//                       </TableCell>
//                       <TableCell sx={{ textAlign: 'center', border: 'none' }}>
//                         <Button
//                           variant="outlined"
//                           color="primary"
//                           startIcon={<FaEdit />}
//                           onClick={() => handleOpenModal('edit', country)}
//                           sx={{ mr: 1, bgcolor: '#FE4F2D', color: 'white' }}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           variant="outlined"
//                           color="error"
//                           startIcon={<FaTrash />}
//                           sx={{ bgcolor: '#DC2525', color: 'white' }}
//                           onClick={() => {
//                             if (window.confirm(`Are you sure you want to delete ${country.countryName} (ID: ${country.countryId})?`)) {
//                               handleDelete(country.countryId);
//                             }
//                           }}
//                         >
//                           Delete
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell
//                       colSpan={2}
//                       sx={{ py: 6, textAlign: 'center', color: '#666', border: 'none' }}
//                     >
//                       No countries available.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//         <CountryModal
//           open={openModal}
//           handleClose={handleCloseModal}
//           mode={modalMode}
//           country={selectedCountry}
//           handleSubmit={handleSubmit}
//         />
//       </Box>
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right', position: 'absolute', top: '100px' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
//           {successMessage}
//         </Alert>
//       </Snackbar>
//     </ThemeProvider>
//   );
// }