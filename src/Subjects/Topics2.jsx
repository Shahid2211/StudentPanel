import React from 'react'
import Header from '../Header'
import LeftSidebar from '../LeftSidebar'

export default function Topics2() {
  const topics = [
    { title: 'Twinkle Twinkle - Video', subtitle: 'Little star', button: 'WATCH VIDEO' }
  ]

  return (
    <div className='container-fluid'>
      <Header />
      <div className='container'>
        <LeftSidebar />
        <div className='row justify-content-center align-items-center text-center flex-wrap'>
          <h1 className="w-100 mb-4">Topics</h1>

          {/* One row topic */}
          <div className="d-flex justify-content-center flex-row w-100 flex-wrap">
            {topics.map((item, index) => (
              <div key={index} className="topic-card">
                <h4>{item.title}</h4>
                <p>{item.subtitle}</p>
                <button className="topic-btn">{item.button}</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .topic-card {
          background-color: #8e44ad;
          color: white;
          padding: 20px 30px;
          border-radius: 15px;
          margin: 12px;
          width: 280px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
          transition: transform 0.2s;
        }

        .topic-card:hover {
          transform: scale(1.05);
        }

        .topic-card h4 {
          margin-bottom: 10px;
          font-size: 1.2rem;
        }

        .topic-card p {
          font-size: 1rem;
          color: #f0f0f0;
          margin-bottom: 15px;
        }

        .topic-btn {
          background-color: #f39c12;
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .topic-btn:hover {
          background-color: #e67e22;
        }
      `}</style>
    </div>
  )
}
