import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftSidebar from '../LeftSidebar';
import Header from '../Header';

export default function Eng() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const buttonStyle = (isHovered) => ({
    backgroundColor: '#ff6666',
    color: 'white',
    width: '208px',
    height: '80px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '15px',
    boxShadow: '10px 10px 16px rgba(0,0,0,0.15)',
    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  });

  const buttonData = [
    'Preposition',
    'English Story',
    'Name of Animal',
    'English',
    'Preposition',
    'Rhymes',
    'Sosbd',
    'New Eng Chapter',
    'Testing By Muddassir'
  ];

  // Navigation logic
  const handleClick = (label) => {
    if (label === 'Preposition') {
      navigate('/topics1');
    } else if (label === 'Rhymes') {
      navigate('/topics2');
    } else {
      navigate('/topics3');
    }
  };

  // Split buttons into rows of 4
  const rows = [];
  for (let i = 0; i < buttonData.length; i += 4) {
    rows.push(buttonData.slice(i, i + 4));
  }

  return (
    <div className="container-fluid">
      <Header />
      <div className="container">
        <LeftSidebar />
        <h1 className="text-center" style={{ marginTop: '20px', fontWeight: 'bold' }}>
          Lessons
        </h1>

        {rows.map((rowButtons, rowIndex) => (
          <div
            key={rowIndex}
            className="row justify-content-center align-items-center mb-5"
            style={{ gap: '30px', position: 'relative', left: '140px', top: '50px' }}
          >
            {rowButtons.map((label, i) => {
              const btnIndex = rowIndex * 4 + i;
              return (
                <div
                  key={i}
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: '230px', height: '100px' }}
                >
                  <button
                    style={buttonStyle(hoveredIndex === btnIndex)}
                    onMouseEnter={() => setHoveredIndex(btnIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleClick(label)}
                  >
                    {label}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
