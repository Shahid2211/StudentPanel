import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeeDetails.css';

export default function FeeDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(true); // Show modal on mount
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => navigate('/studentDashboard'), 300); // Allow animation to complete
  };

  return (
    <div className={`FeeModalOverlay ${isOpen ? 'active' : ''}`}>
      {isOpen && (
        <div className="FeeModal">
          <div className="feeHeader">
            <h2>Fee Details</h2>
            <button onClick={closeModal} aria-label="Close modal">
              ×
            </button>
          </div>
          <div className="footer">
            <p10 style={{ color: 'black' ,backgroundColor: 'none'}}>No Fee Details Available Here</p10>
          </div>
        </div>
      )}
    </div>
  );
}