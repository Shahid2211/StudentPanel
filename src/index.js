import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // ✅ Import BrowserRouter
//import FeeDetails from './FeeDetail';
import StudyMaterial from './StudyMaterial';
import App from './App';
import Notification from './Notification';
import Asignment from './Asignment';
import DownloadSchoolPDF from './Subjects/DownloadSchoolPDF';
import PDF_Views from './Subjects/PDF_Veiws';
import SchoolLeavingCertificate, { SchoolLeavingPDF } from './Subjects/SchoolLeavingPDF';
import GradientTest from './GradientTest';
import ModelEmpaty from './TimeTableModel.jsx/ModelEmpaty';
import UseMemos from './UseMemos';
import Header from './Header';

import Exam from './Subjects/Exam';
import TestImage from './Subjects/TestImage';
import CURD from './CURD/CURD';
import CURD2 from './CURD/CURD';
import CityManagement from './CURD/CityManagement.jsx';
import CollegeFrontPage from './CollegeFrontPage.jsx';
// import PDF_Views from './Subjects/PDF_Views';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* ✅ Wrap App in BrowserRouter */}
    
        
          <App></App> 
{/* <CollegeFrontPage></CollegeFrontPage> */}
          
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
