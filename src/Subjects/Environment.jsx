import React from 'react'
import Header from '../Header'
import LeftSidebar from '../LeftSidebar'

export default function Environment() {
  // Environment lessons
  const lessons = [
    'Environment Lesson 1',
    'Global Warming',
    'Global Warming 3'
  ]

  return (
    <div className='container-fluid'>
      <Header />
      <div className='container'>
        <LeftSidebar />
        <div className='row justify-content-center align-items-center flex-row'>
          <h1 className="text-center w-100 mb-4">Environment Lessons</h1>

          {/* One Row with All Buttons */}
          <div className="d-flex justify-content-center flex-row w-100 flex-wrap">
            {lessons.map((item, index) => (
              <button key={index} className="lesson-btn">{item}</button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .lesson-btn {
          background-color: #ff8080;/* #28a745  green theme */
          color: white;
          border: none;
          padding: 12px 32px;
          border-radius: 15px;
          box-shadow: 10px 10px 16px rgba(0,0,0,0.15);
          font-size: 1.1rem;
          margin: 12px;
          width: 250px;
          height: 100px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .lesson-btn:hover {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  )
}
