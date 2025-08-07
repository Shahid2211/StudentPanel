
import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, Button,
  Modal, TextField, CircularProgress, InputAdornment, AppBar, Toolbar, IconButton,
  Avatar, Snackbar, Alert, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import {
  FaTachometerAlt, FaEnvelope, FaBookmark, FaUsers, FaFolder, FaShoppingCart,
  FaChartBar, FaCog, FaSearch, FaEdit, FaTrash, FaPlus, FaTimes
} from 'react-icons/fa';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Fade from '@mui/material/Fade';
import { styled, alpha } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { WiRain } from 'react-icons/wi';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Tooltip } from '@mui/material';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';






// Create a theme for MUI
const theme = createTheme();

// Styled components for Search
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

// CityModal component (unchanged)
const CityModal = ({ open, handleClose, mode, city, handleSubmit, countries, states }) => {
  const [formData, setFormData] = useState({
    countryName: '',
    stateName: '',
    cityName: ''
  });
  const [errors, setErrors] = useState({
    countryName: '',
    stateName: '',
    cityName: ''
  });

  useEffect(() => {
    console.log('CityModal props:', { open, mode, city, countries, states });
    if (mode === 'edit' && city) {
      setFormData({
        countryName: city.countryName || '',
        stateName: city.stateName || '',
        cityName: city.cityName || ''
      });
    } else {
      setFormData({ countryName: '', stateName: '', cityName: '' });
    }
    setErrors({ countryName: '', stateName: '', cityName: '' });
  }, [mode, city]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.countryName.trim()) newErrors.countryName = 'Country name is required';
    if (!formData.stateName.trim()) newErrors.stateName = 'State name is required';
    if (!formData.cityName.trim()) newErrors.cityName = 'City name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (!validateForm()) return;
    handleSubmit(mode === 'add' ? formData : { cityId: city?.cityId, ...formData });
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      TransitionComponent={Fade}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'white',
          borderRadius: '12px',
          boxShadow: 24,
          p: 0
        }}
      >
        <Box
          sx={{
            bgcolor: '#2A1458',
            p: 2,
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            position: 'relative'
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            sx={{ color: 'white', textTransform: 'capitalize', fontSize: '1.7rem' }}
          >
            {mode === 'add' ? 'Add New City' : 'Edit City'}
          </Typography>
          <FaTimes
            onClick={handleClose}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              borderRadius: '50%',
              border: '2px solid white',
              transform: 'translateY(-50%)',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              width: '30px',
              height: '30px'
            }}
          />
        </Box>
        <Box sx={{ p: 2, borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.countryName}>
            <InputLabel>Country Name</InputLabel>
            <Select
              value={formData.countryName}
              onChange={(e) => {
                setFormData({ ...formData, countryName: e.target.value });
                setErrors({ ...errors, countryName: '' });
              }}
              label="Country Name"
            >
              {countries.length === 0 ? (
                <MenuItem value="" disabled>No countries available</MenuItem>
              ) : (
                countries.map((country) => (
                  <MenuItem key={country.countryId} value={country.countryName}>
                    {country.countryName}
                  </MenuItem>
                ))
              )}
            </Select>
           68            {errors.countryName && (
              <Typography color="error" variant="caption">{errors.countryName}</Typography>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.stateName}>
            <InputLabel>State Name</InputLabel>
            <Select
              value={formData.stateName}
              onChange={(e) => {
                setFormData({ ...formData, stateName: e.target.value });
                setErrors({ ...errors, stateName: '' });
              }}
              label="State Name"
            >
              {states.length === 0 ? (
                <MenuItem value="" disabled>No states available</MenuItem>
              ) : (
                states.map((state) => (
                  <MenuItem key={state.stateId} value={state.stateName}>
                    {state.stateName}
                  </MenuItem>
                ))
              )}
            </Select>
            {errors.stateName && (
              <Typography color="error" variant="caption">{errors.stateName}</Typography>
            )}
          </FormControl>
          <TextField
            fullWidth
            label="City Name"
            value={formData.cityName}
            onChange={(e) => {
              setFormData({ ...formData, cityName: e.target.value });
              setErrors({ ...errors, cityName: '' });
            }}
            sx={{ mb: 2 }}
            error={!!errors.cityName}
            helperText={errors.cityName}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              onClick={onSubmit}
              variant="contained"
              color="primary"
              sx={{ width: '80px', borderRadius: '25px' ,textTransform:'capitalize'}}
              disabled={!formData.countryName.trim() || !formData.stateName.trim() || !formData.cityName.trim()}
            >
              {mode === 'add' ? 'Add' : 'Update'}
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ bgcolor: 'red', color: 'white', width: '80px', borderRadius: '25px',textTransform:'capitalize' }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

// CityManagement component
export default function CityManagement() {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [avatarSrc, setAvatarSrc] = useState('/static/images/avatar.jpg');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fileInputRef = useRef(null);

  const Token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMiIsIkdycElkIjoiMiIsIlVzZXJUeXBlIjoiRW1wbG95ZWUiLCJFbXBJZCI6IjYiLCJTY2hvb2xOYW1lIjoiSkVFVkFOIEFEQVJTSCBWSURIWUFMQVkiLCJFbXBOYW1lIjoiQWFkaWwiLCJleHAiOjE3NTMxMjQyOTMsImlzcyI6ImV4YW1FbmdpbmVBUGkiLCJhdWQiOiJNeUFwaVNlcnZpY2UifQ.XdXkh5l7f2NpYYqlSN8her4eE7KD8jqnAMJ-a0ELgzo';
const url='https://arizshad-002-site5.ktempurl.com/api'
  // Fetch countries
  const fetchCountries = async () => {
    try {
      const response = await axios.post(`${url}/Country/GetCountry`, {}, {
        headers: { Authorization: Token },
      });
      console.log('Fetch countries response:', response.data);
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid API response: Expected an array');
      }
      const validCountries = response.data.map(country => ({
        countryId: country.countryId,
        countryName: country.countryName || 'Unknown'
      }));
      setCountries(validCountries);
    } catch (err) {
      console.error('Fetch countries error:', err.response?.data || err.message);
      setError(`Failed to fetch countries: ${err.response?.status === 401 ? 'Unauthorized (401) - Invalid token' : err.message}`);
    }
  };

  // Fetch cities
  const fetchCities = async () => {
    try {
      const response = await axios.post(`${url}/City/GetCity`, {}, {
        headers: { Authorization: Token },
      });
      console.log('Fetch cities response:', response.data);
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid API response: Expected an array');
      }
      // Map cities using cityId
      const validCities = response.data.map(city => ({
        cityId: city.cityId,
        countryId: city.countryId,
        stateId: city.stateId,
        cityName: city.cityName || 'N/A',
        countryName: city.countryName || 'Unknown',
        stateName: city.stateName || 'Unknown'
      }));
      setCities(validCities);
      setFilteredCities(validCities);

      // Derive unique states from response
      const uniqueStates = Array.from(new Set(response.data.map(city => city.stateId)))
        .map(id => ({
          stateId: id,
          stateName: response.data.find(city => city.stateId === id)?.stateName || `State ${id}`
        }));
      setStates(uniqueStates);
      console.log('Derived states:', uniqueStates);

      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err.response?.data || err.message);
      setError(`Failed to fetch cities: ${err.response?.status === 401 ? 'Unauthorized (401) - Invalid token' : err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // Filter cities based on search query
  useEffect(() => {
    const filtered = cities.filter((city) =>
      (city.cityName || '').toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      (city.stateName || '').toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      (city.countryName || '').toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
    setFilteredCities(filtered);
    console.log('Filtered cities:', filtered);
  }, [searchQuery, cities]);

  const handleAdd = async (newCity) => {
    try {
      const country = countries.find(c => c.countryName === newCity.countryName);
      const state = states.find(s => s.stateName === newCity.stateName);
      if (!country || !state) {
        throw new Error('Selected country or state not found');
      }
      const payload = {
        countryId: country.countryId,
        stateId: state.stateId,
        cityName: newCity.cityName.trim()
      };
      console.log('Add city payload:', payload);
      const response = await axios.post(`${url}/City`,
        payload,
        { headers: { Authorization: Token } }
      );
      console.log('Add city response:', JSON.stringify(response.data, null, 2));
      if (response.data.msg === 'Details already exist!' || response.data.status === 'Error!') {
        throw new Error(response.data.msg || 'Failed to save city');
      }
      // Handle successful response
      const newCityData = response.data.data || response.data.result || response.data;
      setCities((prev) => {
        const newCityEntry = {
          cityId: newCityData.cityId || Date.now(), // Use temporary ID if cityId is missing
          countryId: newCityData.countryId || country.countryId,
          stateId: newCityData.stateId || state.stateId,
          countryName: newCity.countryName,
          stateName: newCity.stateName,
          cityName: newCityData.cityName || newCity.cityName
        };
        const updatedCities = [...prev, newCityEntry];
        setFilteredCities(
          updatedCities.filter((city) =>
            (city.cityName || '').toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
            (city.stateName || '').toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
            (city.countryName || '').toLowerCase().includes(searchQuery.toLowerCase().trim())
          )
        );
        return updatedCities;
      });
      setErrorMessage('');
      setSuccessMessage('City added successfully');
      setOpenSnackbar(true);
      await fetchCities(); // Refresh data to sync with backend
    } catch (err) {
      console.error('Add city error:', err.response?.data || err.message);
      setErrorMessage(err.response?.data?.msg === 'Details already exist!' 
        ? 'City already exists. Please try a different city name.' 
        : `Failed to add city: ${err.message}`);
      setOpenSnackbar(true);
    }
  };

  const handleUpdate = async (updatedCity) => {
    try {
      const country = countries.find(c => c.countryName === updatedCity.countryName);
      const state = states.find(s => s.stateName === updatedCity.stateName);
      if (!country || !state) {
        throw new Error('Selected country or state not found');
      }
      const payload = {
        cityId: updatedCity.cityId,
        countryId: country.countryId,
        stateId: state.stateId,
        cityName: updatedCity.cityName.trim()
      };
      console.log('Update city payload:', payload);
      const response = await axios.put(`${url}/City/Id?cityId=${updatedCity.cityId}`,
        payload,
        { headers: { Authorization: Token } }
      );
      console.log('Update city response:', JSON.stringify(response, null, 2));
      if (response.data.msg === 'Details already exist!' || response.data.status === 'Error!') {
        throw new Error(response.data.msg || 'Failed to save city');
      }
      setCities((prev) => {
        const updated = prev.map((city) =>
          city.cityId === updatedCity.cityId
            ? {
                ...city,
                cityId: updatedCity.cityId,
                countryId: country.countryId,
                stateId: state.stateId,
                countryName: updatedCity.countryName,
                stateName: updatedCity.stateName,
                cityName: updatedCity.cityName
              }
            : city
        );
        setFilteredCities(
          updated.filter((city) =>
            (city.cityName || '').toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
            (city.stateName || '').toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
            (city.countryName || '').toLowerCase().includes(searchQuery.toLowerCase().trim())
          )
        );
        return updated;
      });
      setErrorMessage('');
      setSuccessMessage('City updated successfully');
      setOpenSnackbar(true);
      await fetchCities(); // Refresh data
    } catch (err) {
      console.error('Update city error:', err.response?.data || err.message);
      setErrorMessage(err.response?.data?.msg === 'Details already exist!' 
        ? 'City already exists. Please try a different city name.' 
        : `Failed to update city: ${err.message}`);
      setOpenSnackbar(true);
    }
  };

  const handleDelete = async (cityId) => {
    if (!window.confirm(`Are you sure you want to delete city ID ${cityId}?`)) return;
    try {
      console.log('Deleting city ID:', cityId);
      const response = await axios.delete(`${url}/City/Id?CityId=${cityId}`, {
        headers: { Authorization: Token },
      });
      console.log('Delete response:', response.data);
      setCities((prev) => {
        const updatedCities = prev.filter((city) => city.cityId !== cityId);
        setFilteredCities(
          updatedCities.filter((city) =>
            (city.cityName || '').toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
            (city.stateName || '').toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
            (city.countryName || '').toLowerCase().includes(searchQuery.toLowerCase().trim())
          )
        );
        return updatedCities;
      });
      setErrorMessage('');
      setSuccessMessage('City deleted successfully');
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
      setErrorMessage(err.response?.data?.msg || `Failed to delete city: ${err.message}`);
      setOpenSnackbar(true);
    }
  };

  const handleOpenModal = async (mode, city = null) => {
    console.log('Opening modal:', { mode, city });
    setModalMode(mode);
    setSelectedCity(city);
    if (mode === 'add') {
      await fetchCountries(); // Fetch countries when opening modal for adding a city
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCity(null);
  };

  const handleSubmit = (data) => {
    console.log('Submitting data:', data);
    if (modalMode === 'add') {
      handleAdd(data);
    } else {
      handleUpdate(data);
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarSrc(URL.createObjectURL(file));
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const sidebarItems = [
    { text: 'Dashboard', icon: <FaTachometerAlt /> },
    { text: 'Messages', icon: <FaEnvelope /> },
    { text: 'Saved', icon: <FaBookmark /> },
    { text: 'Users', icon: <FaUsers /> },
    { text: 'File Manager', icon: <FaFolder /> },
    { text: 'Order', icon: <FaShoppingCart /> },
    { text: 'Analytics', icon: <FaChartBar /> },
    { text: 'Settings', icon: <FaCog /> },
  ];

  return (
    <ThemeProvider theme={theme}>
    <AppBar position="fixed" sx={{ zIndex: 1100, bgcolor: '#D7D7D7', color: 'black' }}>
  <Toolbar>
    <Tooltip title="Menu">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <MenuIcon />
      </IconButton>
    </Tooltip>
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
    >
      City Management
    </Typography>
    <Tooltip title="Notifications">
      <IconButton sx={{ backgroundColor: 'transparent' }}>
        <NotificationsIcon sx={{ fontSize: '2rem', color: '#343a40' }} />
      </IconButton>
    </Tooltip>
    <Tooltip title="GitHub">
      <IconButton
        sx={{ ml: 1 }}
        aria-label="GitHub"
        onClick={() => window.open('https://github.com/Shahid2211/project2', '_blank')}
      >
        <GitHubIcon sx={{ fontSize: '2rem', color: '#343a40' }} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Shopping Cart">
      <IconButton>
        <FaShoppingCart sx={{ fontSize: '4rem', color: 'black' }} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Weather">
      <IconButton>
        <WiRain style={{ fontSize: '3rem', color: '#4682b4' }} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Upload Photo">
      <IconButton
        onClick={() => fileInputRef.current.click()}
        sx={{ ml: 1 }}
        aria-label="upload photo"
      >
        <Avatar alt="User" src={avatarSrc} sx={{ width: 40, height: 40 }} />
      </IconButton>
    </Tooltip>
    <input
      type="file"
      accept="image/*"
      style={{ display: 'none' }}
      ref={fileInputRef}
      onChange={handlePhotoUpload}
    />
  </Toolbar>
</AppBar>

      <Drawer
        anchor="left"
        variant="persistent"
        open={sidebarOpen}
        PaperProps={{
          sx: { width: 200, 
            // bgcolor: '#D7D7D7',
            bgcolor:'#819067',
             color: 'black', top: '64px', height: 'calc(100% - 64px)' }
        }}
      >
        <List>
          {sidebarItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: 'black' ,fontSize:'1.2rem'}}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        background: 'white',
        minHeight: '100vh',
        pt: 8,
        position:'relative',
        top:'30px',
        ml: sidebarOpen ? '200px' : 0,
        transition: 'margin-left 0.3s ease'
      }}>
        <Box sx={{ width: '800px', p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <TextField
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: '70%', bgcolor: 'white', borderRadius: '12px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch style={{ color: '#666' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              startIcon={<FaPlus />}
              onClick={() => handleOpenModal('add')}
              sx={{ width: '300px', height: '56px', borderRadius: '12px', bgcolor: '#EB5B00' }}
            >
              Add New City
            </Button>
          </Box>
          <TableContainer
            component={Box}
            sx={{
              bgcolor:'black',
              borderRadius: 4,
              boxShadow: 3,
              overflowX: 'auto'
            }}
          >
            <Table sx={{ minWidth: 600, bgcolor: 'white' }}>
              <TableHead>
                <TableRow sx={{ 
                  bgcolor:'black', 
                }}>
                  <TableCell sx={{ color: 'white', fontSize: '20px', textAlign: 'center', border: 'none' }}>
                    Country Name
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontSize: '20px', textAlign: 'center', border: 'none' }}>
                    State Name
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontSize: '20px', textAlign: 'center', border: 'none' }}>
                    City Name
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontSize: '20px', textAlign: 'center', border: 'none' }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ py: 6, textAlign: 'center', border: 'none' }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ py: 6, textAlign: 'center', color: 'red', border: 'none' }}>
                      {error}
                    </TableCell>
                  </TableRow>
                ) : filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <TableRow
                      key={city.cityId}
                      sx={{ '&:hover': { bgcolor: '#f5f5f5' }, borderBottom: '1px solid #e0e0e0' }}
                    >
                      <TableCell sx={{ textAlign: 'center', color: '#1A3C6C', border: 'none', fontSize: '18px' }}>
                        {city.countryName || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', color: '#1A3C6C', border: 'none', fontSize: '18px' }}>
                        {city.stateName || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', color: '#1A3C6C', border: 'none', fontSize: '18px' }}>
                        {city.cityName || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: 'none' }}>
                        <Button
                          variant="outlined"
                          startIcon={<FaEdit />}
                          onClick={() => handleOpenModal('edit', city)}
                          sx={{ mr: 1, 
                            bgcolor:'#FFCC00', 
                            color: 'white', borderRadius: '8px' }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<FaTrash />}
                          onClick={() => handleDelete(city.cityId)}
                          sx={{ 
                            bgcolor:'red', 
                            color: 'white', borderRadius: '8px' }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ py: 6, textAlign: 'center', color: '#666', border: 'none' }}>
                      No cities available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <CityModal
          open={openModal}
          handleClose={handleCloseModal}
          mode={modalMode}
          city={selectedCity}
          handleSubmit={handleSubmit}
          countries={countries}
          states={states}
        />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={errorMessage ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {errorMessage || successMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}