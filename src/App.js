import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Assignment from './Asignment.jsx'
import FeeDetails from './FeeDetail.jsx'
import Profile from './Profile.jsx'
import StudyMaterial from './StudyMaterial.jsx'
import Class_Subjects from './Class_Subjects.jsx'
import LeftSidebar from './LeftSidebar.jsx'
import StudentDashboard from './StudentDashboard.jsx'

import LogOut from './LogOut.jsx'
import Time_Table from './Time_Table.jsx'
import Eng from './Subjects/Eng.jsx'
import Hindi from './Subjects/Hindi.jsx'
import Maths from './Subjects/Maths.jsx'
import Environment from './Subjects/Environment.jsx'
import English from './Subjects/English.jsx'
import Topic1 from './Subjects/Topic1.jsx'
import Topics2 from './Subjects/Topics2.jsx'
import Topics3 from './Subjects/Topics3.jsx'
import Setting from './Setting.jsx'
// StudentDetails
import Class_English from './StudentDetails/Class-English.jsx'
import Class_Hindi from './StudentDetails/Class-Chemistry.jsx'
import Class_Math from './StudentDetails/Class-Math.jsx'
import Class_Environment from './StudentDetails/Class-Environment.jsx'
import Class_Test from './StudentDetails/Class-Test.jsx'
import Login from './Login.jsx' 
import DownloadSchoolPDF from './Subjects/DownloadSchoolPDF.jsx'
import TwinkleVideo from './Subjects/TwinkleVideo.jsx'
import ClassPages from './Subjects/ClassPages.jsx'
import ModelEnglish from './TimeTableModel.jsx/ModelEnglish.jsx'
import ModelHindi from './TimeTableModel.jsx/ModelHindi.jsx'
// import ModelMath from './TimeTableModel.jsx/ModelMath.jsx'
import ModelEmpaty from './TimeTableModel.jsx/ModelEmpaty.jsx'
import ModelEnvironment from './TimeTableModel.jsx/ModelEnvironment.jsx'
import Notification from './Notification.jsx'
import MaterialDynamic from './Material_Dynamic.jsx'
import Class_Chemistry from './StudentDetails/Class-Chemistry.jsx'
import History from './Subjects/History.jsx'
// import AssignmentDetails from './StudentDetails/AssignmentDetails.jsx'
import { ToastContainer } from 'react-toastify';
import { SchoolLeavingPDF } from './Subjects/SchoolLeavingPDF.jsx'
import Exam from './Subjects/Exam.jsx'
import Chemistry from './Subjects/Chemistry.jsx'
import Social_Science from './Subjects/Social_Science.jsx'
import CollegeFrontPage from './CollegeFrontPage.jsx'
export default function App() {
  return (
    <div>
      {/* <ToastContainer /> */}
      <Routes>
        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/study-material" element={<StudyMaterial />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feedetails" element={<FeeDetails />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/class-subjects" element={<Class_Subjects />} />
        <Route path="/leftsidebar" element={<LeftSidebar />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path='/' element={<Login/>}></Route>
        <Route path="/timeTable" element={<Time_Table />} />
        <Route path='/notification' element={<Notification/>}></Route>
        {/* Subject pages */}
        <Route path="/eng" element={<Eng />} />
        <Route path="/Lession/:classId/:subjectId/english" element={<English />} />
        <Route path="/Lession/:classId/:subjectId/hindi" element={<Hindi />} />
         <Route path="/Lession/:classId/:subjectId/history" element={<History/>} />
        <Route path="/Lession/:classId/:subjectId/mathematics" element={<Maths />} />
        <Route path='/Lession/:classId/:subjectId/Chemistry' element={< Chemistry/>}></Route>
        <Route path='/Lession/:classId/:subjectId/social-science' element={<Social_Science/>}/>
        <Route path="/Lession/:classId/:subjectId/enviroment-" element={<Environment />} />
        // In App.jsx or wherever you're managing routes
        {/* <Route path="/school-leaving-pdf" element={<DownloadSchoolPDF />} /> */}
        <Route path="/download-pdf123" element={<DownloadSchoolPDF />} />
        <Route path="/twinkle-video" element={<TwinkleVideo />} />
        <Route path="/class/:subject" element={<ClassPages />} />
        <Route path="/class/:subject" element={<MaterialDynamic />} />
        {/* <Route path='/schoolLeaving_pdf' element={< SchoolLeavingPDF/>}></Route> */}
        {/*Table Model */}
        <Route path="/English" element={<ModelEnglish />} />
        <Route path="/Hindi" element={<ModelHindi />} />
        <Route path='/Empaty' element={<ModelEmpaty />} />
        <Route path="/Enviroment" element={<ModelEnvironment />} />
        {/* Assignment class pages */}
        <Route path="/class-eng/:subjectId" element={<Class_English />} />
        <Route path="/class-Chemistry/:subjectId" element={<Class_Chemistry />} />
        <Route path="/class-Maths/:subjectId" element={<Class_Math />} />
        <Route path="/class-Enviroment/:subjectId" element={<Class_Environment />} />
        <Route path="/class-Test/:subjectId" element={<Class_Test />} />
        <Route path='/collegeFormate' element={<CollegeFrontPage/>}></Route>

        {/* <Route path="/assignmentDetails" element={<AssignmentDetails />} /> */}
 
        {/* Topics */}
        <Route path="/topics1" element={<Topic1 />} />
        <Route path="/topics2" element={<Topics2 />} />
        <Route path="/topics3" element={<Topics3 />} />
        <Route path='/exam' element={<Exam/>}></Route>
      </Routes>
    </div>
  )
}
