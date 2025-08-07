
import React, { useState, useEffect } from 'react';
import { FaTachometerAlt, FaTasks, FaBook, FaCalendar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './StudentDashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Typography from '@mui/material/Typography';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Header from './Header';
import { right } from '@popperjs/core';
import LeftSidebar from './LeftSidebar';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [selectedYearId, setSelectedYearId] = useState('5'); // Default to yearId 5
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }));
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [financialYears, setFinancialYears] = useState([]);
  const [loadingYears, setLoadingYears] = useState(false);
  const [yearError, setYearError] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});
  const [summaryData, setSummaryData] = useState([]);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [attendanceError, setAttendanceError] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);
    const  Token1='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTAxMiIsIkdycElkIjoiNCIsIlVzZXJUeXBlIjoiU3R1ZGVudCIsIkVtcElkIjoiMSIsIlNjaG9vbE5hbWUiOiJKZWV2YW4gQWRhcnNoIFNjaG9vbCIsIkVtcE5hbWUiOiJSQUdIQVYiLCJleHAiOjE3NzkzNTA5MzksImlzcyI6ImV4YW1FbmdpbmVBUGkiLCJhdWQiOiJNeUFwaVNlcnZpY2UifQ.MBYnyoludSizgqjcqUtbLWckdqnz9jg8lTzf9fLgADE'
    // GetURL="https://arizshad-002-site5.ktempurl.com/api/ClassPromotion/GetFinancialYear"
  useEffect(() => {
    const fetchFinancialYears = async () => {
      setLoadingYears(true);
      setYearError(null);
      try {
        const response = await fetch('https://arizshad-002-site5.ktempurl.com/api/ClassPromotion/GetFinancialYear', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${Token1}`
          },
          body: JSON.stringify({})
        });
        if (!response.ok) throw new Error('Failed to fetch financial years');
        const data = await response.json();
        setFinancialYears(data);
        if (data.length > 0) {
          const defaultYear = data.find(year => year.financialYearID === 5) || data[0];
          setSelectedYearId(String(defaultYear.financialYearID));
        }
      } catch (err) {
        setYearError('Failed to load financial years.');
      } finally {
        setLoadingYears(false);
      }
    };

    fetchFinancialYears();
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (!selectedYearId) return; // Prevent API call if no year is selected
      setLoadingAttendance(true);
      setAttendanceError(null);
      setAttendanceData({});
      setSummaryData([]);
      try {
        const response = await fetch('https://arizshad-002-site5.ktempurl.com/api/Attendance/StudentProfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${Token1}`
          },
          body: JSON.stringify({ studentId: "1", yearId: parseInt(selectedYearId) }) // Use selectedYearId
        });
        if (!response.ok) throw new Error('Failed to fetch attendance data');
        const data = await response.json();
        console.log('API Response for yearId', selectedYearId, ':', data); // Debug log to inspect response
        
        // Transform objattendancelist into attendanceData format
        if (data.objattendancelist && data.objattendancelist.length > 0) {
          const transformedAttendance = {};
          data.objattendancelist.forEach(item => {
            transformedAttendance[item.month] = [
              item.i, item.ii, item.iii, item.iv, item.v, item.vi, item.vii, item.viii, item.ix, item.x,
              item.xi, item.xii, item.xiii, item.xiv, item.xv, item.xvi, item.xvii, item.xviii, item.xix, item.xx,
              item.xxi, item.xxii, item.xxiv, item.xxiv, item.xxv, item.xxvi, item.xxvii, item.xxviii, item.xxix, item.xxx, item.xxxi
            ];
          });
          setAttendanceData(transformedAttendance);
          setSummaryData(data.objattendancelist);
        } else {
          setAttendanceError('No Attendance Record Available Here');
          setAttendanceData({});
          setSummaryData([]);
        }
      } catch (err) {
        setAttendanceError('Failed to load attendance data: ' + err.message);
        setAttendanceData({});
        setSummaryData([]);
      } finally {
        setLoadingAttendance(false);
      }
    };

    fetchAttendanceData();
  }, [selectedYearId]); // Re-run when selectedYearId changes

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
    setSelectedEntry(null);
    setProfileError(null);
    setLoadingProfile(false);
  };

  const fetchProfile = async () => {
    setModalType('profile');
    setLoadingProfile(true);
    setProfileError(null);
    setShowModal(true);
    try {
      const response = await fetch('https://arizshad-002-site5.ktempurl.com/api/Student/FetchStudentProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:`${Token1}`
        },
        body: JSON.stringify({ studentID: '1' })
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      setSelectedEntry(Array.isArray(data) ? data[0] : data);
      console.log('Profile Data:', data);
    } catch (err) {
      setProfileError('Failed to load profile.');
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchClassSubjects = async () => {
    setModalType('subjects');
    setLoadingProfile(true);
    setProfileError(null);
    setShowModal(true);
    try {
      const response = await fetch('https://arizshad-002-site5.ktempurl.com/api/Student/FetchStudentClassDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:`${Token1}`
        },
        body: JSON.stringify({ studentID: '1' })
      });
      if (!response.ok) throw new Error('Failed to fetch class subjects');
      const data = await response.json();
      setSelectedEntry(data);
      console.log('Class Subjects Data:', data);
    } catch (err) {
      setProfileError('Failed to load class subjects.');
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchPaymentDetails = () => {
    setModalType('payment');
    setShowModal(true);
    setSelectedEntry(null);
    setProfileError(null);
  };

  return (
    <div className="App" style={{backgroundColor:'#d4f1f4'}}>
      <LeftSidebar style={{ zIndex: '1002', position: 'sticky', top: 0 }} />
      
      <div className="main-content">
      <Header></Header>
        
        <div className="route" style={{ marginTop: '70px' }}>
          <div className="Dashboard" style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', padding: '10px', width: '1030px', height: '32px', position: 'absolute', top: 105 }}>
            <Typography variant="h5" className="MuiTypography-root MuiTypography-h5 css-50c8cc" style={{ height: '32px', width: '100%', display: 'flex', alignItems: 'left', margin: 0, fontSize: '25px', fontFamily: 'Nunito' }}>
              <i className="fas fa-tachometer-alt" style={{ marginRight: '8px' }}></i>
              Dashboard
            </Typography>
          </div>
          <div className="routeitem" style={{ background: 'linear-gradient(135deg, rgb(204, 55, 204) 60%, #4B0082 100%)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',marginTop:'60px' }}>
            <text style={{ background: 'none', color: 'white', fontSize: '25px', fontFamily: 'Nunito', border: 'none', borderRadius: '0' }} onClick={fetchProfile}>
              Profile
            </text>
          </div>
          <div className="routeitem" style={{ background: 'linear-gradient(90deg, #e67e22 40%, #f1c40f 100%)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' ,marginTop:'60px'}}>
            <text style={{ background: 'none',color:'white', fontSize: '25px', fontFamily: 'Nunito', border: 'none', borderRadius: '0' }} onClick={() => navigate('/study-material')}>
              Study Material
            </text>
          </div>
           {/* <div className="routitem" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 12.3% 19.3%, rgb(85, 88, 218) 60%, rgb(95, 209, 249) 100.2%)' }}></div> */}
          <div className="routeitem" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 12.3% 19.3%, rgb(85, 88, 218) 60%, rgb(95, 209, 249) 100.2%)',marginTop:'60px'}}>
            <text style={{ background: 'none', color: 'white', fontSize: '25px', fontFamily: 'Nunito', borderRadius: '0' }} onClick={fetchPaymentDetails}>
              Payment Details
            </text>
          </div>
          <div className="routeitem" style={{ background: 'linear-gradient(90deg, #0FD163 60%, #a2f5cb 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <text style={{ backgroundColor: 'none', color: 'white', fontSize: '25px', fontFamily: 'Nunito', border: 'none', borderRadius: '0' }} onClick={() => navigate('/assignment')}>
              Assignment
            </text>
          </div>
          <div className="routeitem" style={{ background: 'linear-gradient(90deg, #FF00FF 0%, #FF00FF 60%, #ffc3ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <text style={{ backgroundColor: 'none', color: 'white', fontSize: '25px', border: 'none', borderRadius: '0', fontFamily: 'Nunito' }} onClick={fetchClassSubjects}>
              Class Subjects
            </text>
          </div>
          
        </div>
        <div className="middle" style={{backgroundColor:'none'}}>
          <h1 style={{ textAlign: 'left', padding: '10px', height: '50px' }}>Shahid Attendance Record</h1>
          {loadingYears && <div>Loading years...</div>}
          {/* {yearError && <div style={{ color: 'red' }}>{yearError}</div>} */}
          <select value={selectedYearId} onChange={(e) => setSelectedYearId(e.target.value)} style={{ margin: '10px 0', padding: '5px' }}>
            {financialYears.length > 0 ? (
              financialYears.map((yearObj) => (
                <option key={yearObj.financialYearID} value={yearObj.financialYearID}>
                  {yearObj.finanacialYear}
                </option>
              ))
            ) : (
              <option value="">No years available</option>
            )}
          </select>
          <div className="attendance-table">
            {loadingAttendance && <div>Loading attendance...</div>}
            {/* {attendanceError && <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{attendanceError}</div>} */}
            {Object.keys(attendanceData).length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <th key={day}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(attendanceData).map((month) => (
                    <tr key={month}>
                      <td>{month}</td>
                      {attendanceData[month].map((status, index) => (
                        <td key={index} className={typeof status === 'string' && status ? `status-${status.toLowerCase()}` : ''}>
                          {status}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              !loadingAttendance && !attendanceError && <div style={{ textAlign: 'center', padding: '20px' }}>No Attendance Record Available Here</div>
            )}
          </div>
        </div>
        <div className="footerAttendance">
          <h1>Attendance Summary for All Months</h1>
          <table className="summary-table">
            <thead>
              <tr>
                <th style={{fontSize:'1.2rem'}}>Month</th>
                <th style={{fontSize:'1.2rem'}}>Total Days</th>
                <th style={{fontSize:'1.2rem'}}>Present Count</th>
                <th style={{fontSize:'1.2rem'}}>Absent Count</th>
                <th style={{fontSize:'1.2rem'}}>Holiday Count</th>
                <th style={{fontSize:'1.2rem'}}>Attendance Percentage</th>
              </tr>
            </thead>
            <tbody>
              {summaryData.length > 0 ? (
                summaryData.map((row) => (
                  <tr key={row.month}>
                    <td>{row.month}</td>
                    <td>{row.totalDays}</td>
                    <td>{row.presentCount}</td>
                    <td>{row.absentCount}</td>
                    <td>{row.holidayCount}</td>
                    <td>{row.attendancePercentage}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No summary data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size="md"
        style={{borderRadius:'25px'}}
        dialogClassName={
          modalType === 'profile'
            ? 'modal-profile'
            : modalType === 'subjects'
            ? 'modal-subjects'
            : modalType === 'payment'
            ? 'modal-payment'
            : 'modal-default'
        }
      >
        <Modal.Header
          closeButton
          style={{
            background:
              modalType === 'payment' ? 'linear-gradient(to right, #ff0000, #ffff00)' :
              modalType === 'subjects' ? '#A27B5C' : 'linear-gradient(to right, #304352, #d7d2cc)',
            borderBottom: 
              modalType === 'payment' ? '3px solid #ffffff' :
              modalType === 'subjects' ? '3px solid #6f5b3e' :
              modalType === 'profile' ? '3px solid #FF00FF' : 'none',
            color: 'white',
          }}
          closeVariant="red"
        >
          <Modal.Title style={{ fontSize: '28px', fontFamily: 'Nunito' }}>
            {modalType === 'profile' && 'Student Profile'}
            {modalType === 'subjects' && 'Class Subjects'}
            {modalType === 'payment' && 'Payment Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            background:
              modalType === 'payment' ? 'linear-gradient(to right, #ff0000, #ffff00)' :
              modalType === 'subjects' ? '#A27B5C' : 'linear-gradient(to right, #304352, #d7d2cc)',
            borderRadius: '0 0 8px 8px',
            padding: '20px',
            color: 'white',
          }}
        >
          {modalType === 'profile' && (
            <>
              {loadingProfile && <div>Loading...</div>}
              {profileError && <div style={{ color: '#ffcdd2' }}>{profileError}</div>}
              {selectedEntry && (
                <>
                  <p style={{ color: 'white', fontFamily: '"Comic Sans MS", Arial, sans-serif', fontSize: '18px' }}><strong>Name:</strong> {selectedEntry.studentName || 'N/A'}</p>
                  <p style={{ color: 'white', fontFamily: '"Comic Sans MS", Arial, sans-serif', fontSize: '18px' }}><strong>Admission No:</strong> {selectedEntry.admissionNo || 'N/A'}</p>
                  <p style={{ color: 'white', fontFamily: '"Comic Sans MS", Arial, sans-serif', fontSize: '18px' }}><strong>Admission Date:</strong> {selectedEntry.admissionDate || 'N/A'}</p>
                  <p style={{ color: 'white', fontFamily: '"Comic Sans MS", Arial, sans-serif', fontSize: '18px' }}><strong>Email ID:</strong> {selectedEntry.eamilId || 'N/A'}</p>
                  <p style={{ color: 'white', fontFamily: '"Comic Sans MS", Arial, sans-serif', fontSize: '18px' }}><strong>Student DOB:</strong> {selectedEntry.studentDOB || 'N/A'}</p>
                  <p style={{ color: 'white', fontFamily: '"Comic Sans MS", Arial, sans-serif', fontSize: '18px' }}><strong>Mobile:</strong> {selectedEntry.mobileNo || 'N/A'}</p>
                </>
              )}
            </>
          )}
          {modalType === 'subjects' && (
            <>
              {loadingProfile && <div>Loading...</div>}
              {profileError && <div style={{ color: '#ffcdd2' }}>{profileError}</div>}
              {selectedEntry && Array.isArray(selectedEntry) && selectedEntry.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse' ,borderRadius:'25px'}}>
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid #fff', padding: '8px',fontSize:'1.2rem' }}>ID</th>
                      <th style={{ border: '1px solid #fff', padding: '8px',fontSize:'1.2rem' }}>Class Name</th>
                      <th style={{ border: '1px solid #fff', padding: '8px',fontSize:'1.2rem' }}>Subject Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEntry.map((item, index) => (
                      <tr key={item.id || `subject-${index}`}>
                        <td style={{ border: '1px solid #fff', padding: '8px',fontSize:'1.2rem', backgroundColor: '#FF8A65',color:'white' }}>{item.id || 'N/A'}</td>
                        <td style={{ border: '1px solid #fff', padding: '8px',fontSize:'1.2rem', backgroundColor: '#FF8A65',color:'white' }}>{item.className || 'N/A'}</td>
                        <td style={{ border: '1px solid #fff', padding: '8px',fontSize:'1.2rem', backgroundColor: '#FF8A65',color:'white' }}>{item.subjectName || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No class subjects available.</p>
              )}
            </>
          )}
          {modalType === 'payment' && (
            <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>No Payment Details Available Here</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
