import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import LeftSidebar from './LeftSidebar';

export default function MaterialDynamic() {
  const { subject } = useParams(); // Dynamic subject from URL
  const [lessonData, setLessonData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post('https://arizshad-002-site5.ktempurl.com/api/Student/GetStudentAssignment', {
        classId: '1',
        sectionId: '15',
        studentID: '1'
      }, {
        headers: {
          Authorization: `Bearer YOUR_VALID_TOKEN`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        const filtered = res.data.filter(
          (item) => item.subject?.toLowerCase() === subject.toLowerCase()
        );
        setLessonData(filtered);
      })
      .catch(console.error);
  }, [subject]);

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

  const handleClick = (label) => {
    if (label.toLowerCase().includes('rhyme')) {
      navigate('/topics2');
    } else if (label.toLowerCase().includes('preposition')) {
      navigate('/topics1');
    } else {
      navigate('/topics3');
    }
  };

  const rows = [];
  for (let i = 0; i < lessonData.length; i += 4) {
    rows.push(lessonData.slice(i, i + 4));
  }

  return (
    <div className="container-fluid">
      <Header />
      <div className="container">
        <LeftSidebar />
        <h1 className="text-center fw-bold mt-4">
          {subject} Lessons
        </h1>

        {rows.map((rowButtons, rowIndex) => (
          <div
            key={rowIndex}
            className="row justify-content-center align-items-center mb-5"
            style={{ gap: '30px', position: 'relative', left: '140px', top: '50px' }}
          >
            {rowButtons.map((item, i) => {
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
                    onClick={() => handleClick(item.assignment)}
                  >
                    {item.assignment}
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
