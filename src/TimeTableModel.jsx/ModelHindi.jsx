import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

export default function ModelHindi() {
  const navigate = useNavigate();
const { state } = useLocation();
  const handleClose = () => {
    navigate(-1); // go back
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerRowStyle}>
  <h2 style={{ color: '#00FFDE', margin:'0px', width: '100%',height:'auto',padding:'10px' }}>Hindi Class Details</h2>
  <button
    onClick={handleClose}
    style={closeBtnStyle}
    onMouseEnter={e => {
      e.target.style.transform = 'scale(1.15)';
      e.target.style.background = '#B6F500';
    }}
    onMouseLeave={e => {
      e.target.style.transform = 'scale(1)';
      e.target.style.background = '#B6F500';
    }}
  >
    ×
  </button>
</div>

        {/* <h3>Class Name: <b>Hindi</b></h3>
        <h4>Teacher Name: <b>Roshani</b></h4>
        <h4>Room No: <b>103</b></h4> */}
      <h2>Class: {state?.subject || 'Hindi'}</h2>
      <p style={{color:'green',fontSize:'20px',fontWeight:'bold'}}>Teacher: {state?.teacher || 'Roshani'}</p>
      <p style={{color:'green',fontSize:'20px',fontWeight:'bold'}}>Room: {state?.room || '103'}</p>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999
};

const modalStyle = {
  backgroundColor: '#FFC107',
  borderRadius: '10px',
  padding: '0px',
  width: '450px',
  textAlign: 'center',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
  position: 'relative'
};

const closeBtnStyle = {
  position: 'absolute',
  top: '10px',
  right: '15px',
  width:'40px',
  height:'40px',
  borderRadius:'50%',
  fontSize: '25px',
  background: 'yellow',
  border: 'none',
  cursor: 'pointer',
  color: '#888',
  transition: 'transform 0.2s, background 0.2s'
};
const headerRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'red'/*#262626'*/,
  padding: '10px 20px',
  marginTop:'0px',
  borderRadius: '10px 10px 0 0'
};

