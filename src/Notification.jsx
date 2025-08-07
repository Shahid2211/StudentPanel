
import React, { useState, useEffect } from 'react';
import { FaBullhorn, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Modal,
} from '@mui/material';
const ModalComponent = ({ open, handleClose, title, message }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height:'400px',
        borderRadius: '25px',
        p: 4,
      }}
    >
      <Box sx={{bgcolor:'#DCD0A8',borderRadius:'25px',
        // boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',p:2
        }}>
      <Box sx={{ 
        // bgcolor: '#8D0B41', 
        
        // bgcolor:'#08313a',
        // bgcolor:'#3E3F29',
        bgcolor:'rgba(17,20,34,1)',
        // bgcolor:'#000c66',
        // bgcolor:'#05445e',
        p: 2, borderTopLeftRadius: '15px', borderTopRightRadius: '15px', position: 'relative',width:'100%',height:'60px' }}>
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{ color: 'white', textTransform: 'capitalize', fontFamily: 'Nunito', fontSize: '1.5rem' }}
        >
          {title}
          🥳
        </Typography>
        <FaTimes
          onClick={handleClose}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            border: '2px solid white',
            borderRadius: '50%',
            fontSize: '20px',
            cursor: 'pointer',
            width: '30px',
            height: '30px',
          }}
        />
      </Box>
      <Box sx={{ bgcolor: 'white', p: 2, borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
        <Typography id="modal-description" sx={{ color: 'black', mb: 2 }}>
          {message}
        </Typography>
      </Box>
      </Box>
    </Box>
  </Modal>
);
export default function Notification() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState({ title: '', message: '' });

  const Token1 = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTAxMiIsIkdycElkIjoiNCIsIlVzZXJUeXBlIjoiU3R1ZGVudCIsIkVtcElkIjoiMSIsIlNjaG9vbE5hbWUiOiJKZWV2YW4gQWRhcnNoIFNjaG9vbCIsIkVtcE5hbWUiOiJSQUdIQVYiLCJleHAiOjE3NzkzNTA5MzksImlzcyI6ImV4YW1FbmdpbmVBUGkiLCJhdWQiOiJNeUFwaVNlcnZpY2UifQ.MBYnyoludSizgqjcqUtbLWckdqnz9jg8lTzf9fLgADE';

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.post(
          'https://arizshad-002-site5.ktempurl.com/api/Anouncement/Student_Anouncement',
          null,
          {
            headers: {
              Authorization: `${Token1}`,
            },
          }
        );
        const sortedAnnouncements = response.data.list
          .map((item) => ({
            title: item.title,
            message: item.message,
            createdBy: item.createdBy,
            createdOn: new Date(item.createdOn).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }),
          }))
          .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
        setAnnouncements(sortedAnnouncements);
        console.log('Raw response:', response.data);
        console.log('Sorted announcements:', sortedAnnouncements);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Failed to fetch announcements. Please try again later.');
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleOpenModal = (announcement) => {
    setSelectedAnnouncement({ title: announcement.title, message: announcement.message });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAnnouncement({ title: '', message: '' });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh',backgroundColor:'#d4f1f4',}}>
      <LeftSidebar sx={{ zIndex: 2 }} />
      <Header sx={{ zIndex: 1 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          pt: '80px', // Adjusted for header height
          ml: { md: '256px' }, // Adjusted for sidebar width
        }}
      >
        <Box sx={{ width: '950px', px: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              
              color:'white',
              // bgcolor:'#2f5233',
              display: 'flex',
              bgcolor:'#05445e',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <FaBullhorn style={{ color:'yellow', marginRight: '8px' }} />
            Student Announcements
          </Typography>
          <TableContainer
            component={Box}
            sx={{
              // bgcolor: '#3B3B1A',
              // borderRadius: 4,
              boxShadow: 'none', // Removed boxShadow to prevent rendering issues
              overflowX: 'hidden', // Changed to hidden to avoid scroll-related artifacts
              // border: '1px solid #e0e0e0', // Explicit border to ensure consistency
            }}
          >
            <Table sx={{ minWidth: 640, bgcolor: 'white', borderCollapse: 'collapse' }}>
              <TableHead sx={{ border: 'none' }}>
                <TableRow sx={{ bgcolor: '#2295c7ff', border: 'none' }}>
                  <TableCell
                    sx={{
                      color: 'white',
                      fontSize: '25px',
                      fontFamily: 'Nunito, sans-serif',
                      textAlign: 'center',
                      border: 'none',
                    }}
                  >
                    Announcement
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'white',
                      fontSize: '25px',
                      fontFamily: 'Nunito, sans-serif',
                      textAlign: 'left',
                      border: 'none',
                    }}
                  >
                    Posted By
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'white',
                      fontSize: '25px',
                      fontFamily: 'Nunito, sans-serif',
                      textAlign: 'center',
                      border: 'none',
                    }}
                  >
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} sx={{ py: 6, textAlign: 'center' }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      sx={{ py: 6, textAlign: 'center', color: 'red' }}
                    >
                      {error}
                    </TableCell>
                  </TableRow>
                ) : announcements.length > 0 ? (
                  announcements.map((announcement, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        borderBottom: '1px solid #e0e0e0',
                        '&:hover': { bgcolor: '#f5f5f5' },
                      }}
                    >
                      <TableCell sx={{ textAlign: 'center', color: '#1A3C6C', border: 'none' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                          }}
                        >
                          <Box sx={{ display: 'flex', }}>
                            <FaBullhorn
                              style={{
                                color: '#FF9F00',
                                margin: '5px',
                                fontSize: '25px',
                                textAlign:'left'
                              }}
                            />
                            <Typography
                              onMouseOver={(e) => (e.target.style.cursor = 'pointer')}
                              onClick={() => handleOpenModal(announcement)}
                              sx={{ fontSize: '16px'}}
                            >
                              {announcement.title}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: 'none' ,textAlign:'left'}}>
                        <Chip
                          label={announcement.createdBy || 'unknown'}
                          variant="outlined"
                          sx={{
                            color: '#C62300',
                            textTransform: 'capitalize',
                            fontSize: '15px',
                            borderColor: 'none',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '16px', color: '#666', border: 'none'}}>
                        {announcement.createdOn}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      sx={{ py: 6, textAlign: 'center', color: '#666', border: 'none' }}
                    >
                      No announcements available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <ModalComponent
        open={openModal}
        handleClose={handleCloseModal}
        title={selectedAnnouncement.title}
        message={selectedAnnouncement.message}
      />
    </Box>
  );
}