
import React, { useState, useEffect, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import { FaCalendarAlt } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Header.css';

const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();
  const calendarRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCalendarToggle = () => {
    setShowCalendar((prev) => !prev);
  };

  const handleDateChange = (date) => {
    setCurrentDateTime(date);
  };

  return (
    <Box
      className="Header"
      sx={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'absolute',
        top: 0,
        margin: 0,
        right: 0,
        color:'white',
        zIndex: 1000,
        // backgroundColor: '#9EE493',
        backgroundImage: 'linear-gradient( 111.1deg,  rgba(69,150,164,1) 2.5%, rgba(17,20,34,1) 100.3% )'
        // backgroundColor:'#ABC8C0',

      }}
    >
      <Box className="headeritemL">
        <Typography variant="h5" component="h1">
          Welcome RAGHAV!{' '}
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzNjcnIyc2Q2aXpjMHNtdzBmdm0xMWpuOWlnYmJjYXY2c29tZTUzYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Qvpb6dqUQ1Hufrbi3t/giphy.gif"
            alt="Hi"
            className="hi-gif"
          />
        </Typography>
      </Box>
      <Box className="headeritemR" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0 }}>
        <IconButton onClick={() => navigate('/notification')} sx={{ backgroundColor: 'transparent' }}>
          <NotificationsIcon sx={{ fontSize: '2rem', color: 'white' }} />
        </IconButton>
        <IconButton sx={{ backgroundColor: 'transparent' }}>
          <AccountCircleIcon sx={{ fontSize: '2rem', color: 'white' }} />
        </IconButton>
        <Box className="calendar-container" sx={{ position: 'relative', backgroundColor: 'transparent' }} ref={calendarRef}>
          <IconButton onClick={handleCalendarToggle} sx={{ backgroundColor: 'transparent' }}>
            <FaCalendarAlt className="icon" style={{ color: 'white', fontSize: '1.5rem' }} />
          </IconButton>
          {showCalendar && (
            <Box
              // sx={{
              //   position: 'absolute',
              //   top: '50px',
              //   right: '0',
              //   zIndex: 1000,
              //   width: '400px',
              //   height: 'auto',
              //   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              //   borderRadius: '4px',
              // }}
               sx={{
                position: 'absolute',
                top: '50px',
                right: '0',
                zIndex: 1000,
                width: '380px', // Set desired width
                height: 'auto',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '4px',
                '& .react-calendar': {
                  width: '100%', // Ensure calendar takes full width of the Box
                  maxWidth: 'none', // Remove any max-width restrictions
                },
              }}
            >
              <Calendar
                onChange={handleDateChange}
                value={currentDateTime}
              />
            </Box>
          )}
        </Box>
        <Typography
          variant="body1"
          className="date-time"
          sx={{ display: 'inline-block', ml: 1 }}
        >
          {currentDateTime.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          })}{' '}
          {currentDateTime.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(Header);