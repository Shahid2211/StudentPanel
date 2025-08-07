import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, styled } from '@mui/material';
import { FaTachometerAlt, FaTasks, FaBook, FaCalendar, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function LeftSidebar() {
  // Custom styled ListItem for sidebar items
  const SidebarListItem = styled(ListItem)(({ theme }) => ({
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    '& .MuiListItemIcon-root': {
      minWidth: '40px',
      color: 'white',
    },
  }));

  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(111.1deg, rgba(69,150,164,1) 2.5%, rgba(17,20,34,1) 100.3%)',
        width: { xs: '100%', md: '200px' },
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1011,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mb: 2,
          px: 2,
          width: '100%',
        }}
      >
        <img
          src="https://arizshad-002-site5.ktempurl.com/SchoolDocs/logo.jpg"
          alt="Jeevan Adarsh Vidyalay Logo"
          style={{ width: '40px', height: '40px', objectFit: 'contain', marginRight: '10px',marginTop:'-35px' }}
        />
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            fontFamily: 'Nunito',
            fontSize: '1.3rem',
            flexGrow: 1,
            textAlign: 'left',
          }}
        >
          JEEVAN ADARSH VIDYALAY
        </Typography>
      </Box>
      <List sx={{ width: '100%' }}>
        <SidebarListItem component={Link} to="/studentDashboard">
          <ListItemIcon>
            <FaTachometerAlt />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </SidebarListItem>
        <SidebarListItem component={Link} to="/assignment">
          <ListItemIcon>
            <FaTasks />
          </ListItemIcon>
          <ListItemText primary="Assignment" />
        </SidebarListItem>
        <SidebarListItem component={Link} to="/study-material">
          <ListItemIcon>
            <FaBook />
          </ListItemIcon>
          <ListItemText primary="Study Material" />
        </SidebarListItem>
        <SidebarListItem component={Link} to="/timetable">
          <ListItemIcon>
            <FaCalendar />
          </ListItemIcon>
          <ListItemText primary="Time & Table" />
        </SidebarListItem>
        <SidebarListItem component={Link} to="/settings">
          <ListItemIcon>
            <FaCog />
          </ListItemIcon>
          <ListItemText primary="Setting" />
        </SidebarListItem>
        <SidebarListItem component={Link} to="/logout">
          <ListItemIcon>
            <FaSignOutAlt />
          </ListItemIcon>
          <ListItemText primary="LogOut" />
        </SidebarListItem>
      </List>
    </Box>
  );
}