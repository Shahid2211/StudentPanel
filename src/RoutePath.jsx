import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Assignment from './Asignment.jsx'; // Corrected spelling
import FeeDetails from './FeeDetail.jsx'; // Corrected spelling
import Profile from './Profile.jsx';
import StudyMaterial from './StudyMaterial.jsx'
import Class_Subjects from './Class_Subjects.jsx';
export default function RoutePath() {
  return (
    <div><h1>RoutePath</h1>
        <Routes>
                    <Route path="/" element={<div>Dashboard Home</div>} />
                    <Route path="/study-material" element={<StudyMaterial />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/feedetails" element={<FeeDetails />} />
                    <Route path="/assignment" element={<Assignment />} />
                    <Route path="/timetable" element={<div>Timetable Page</div>} />
                    <Route path="/settings" element={<div>Settings Page</div>} />
                    <Route path="/logout" element={<div>Logout Page</div>} />
                    <Route path="/study-subject" element={<div>Study Subject Page</div>} />
                    <Route path='/class-subjects' element={<Class_Subjects />} />
                  </Routes>
            
    </div>
        
  )
}

