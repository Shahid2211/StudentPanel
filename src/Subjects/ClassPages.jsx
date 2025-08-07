// import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import LeftSidebar from '../LeftSidebar';
import './Class_English.css';
import { useEffect,useState } from 'react';

export default function ClassPage() {
  const { subject } = useParams();
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedAssignments, setUploadedAssignments] = useState([]);
  const [checkedAssignments, setCheckedAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAssignmentChange = (e) => setSelectedAssignment(e.target.value);
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleUpload = () => {
    if (!selectedAssignment) return alert('Please select an assignment.');
    if (!selectedFile) return alert('No file selected.');
    alert(`Uploaded "${selectedAssignment}" with file "${selectedFile.name}"`);
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.post(
          'https://arizshad-002-site5.ktempurl.com/api/Student/GetStudentAssignment',
          {
            classId: '1',
            sectionId: '15',
            studentID: '1'
          },
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIs...`, // token (shortened)
              'Content-Type': 'application/json'
            }
          }
        );

        console.log('API Response:', response.data);

        const allAssignments = response.data;

        if (!Array.isArray(allAssignments)) {
          console.error('Invalid response format:', allAssignments);
          return;
        }

        const uploaded = allAssignments.filter(
          item =>
            item.subject?.toLowerCase() === subject?.toLowerCase() &&
            item.status?.toLowerCase() === 'uploaded'
        );

        const checked = allAssignments.filter(
          item =>
            item.subject?.toLowerCase() === subject?.toLowerCase() &&
            item.status?.toLowerCase() === 'checked'
        );

        console.log('Filtered uploaded:', uploaded);
        console.log('Filtered checked:', checked);

        setUploadedAssignments(uploaded);
        setCheckedAssignments(checked);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [subject]);

  return (
    <div className="container-fluid">
      <Header />
      <div className="container">
        <LeftSidebar />
        <div className="row justify-content-center" style={{ position: 'relative', left: '100px' }}>
          <div className="col-md-10">
            <ul className="nav nav-tabs custom-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'upload' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upload')}
                >
                  Assignment Upload
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'checked' ? 'active' : ''}`}
                  onClick={() => setActiveTab('checked')}
                >
                  Checked Assignments
                </button>
              </li>
            </ul>

            {loading ? (
              <p>Loading {subject} assignments...</p>
            ) : (
              <>
                {activeTab === 'upload' && (
                  <div className="p-4 mb-4 border rounded bg-light">
                    <h3 className="text-center mb-4">{subject} Assignment Upload</h3>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Select Assignment</label>
                      <select
                        className="form-select"
                        value={selectedAssignment}
                        onChange={handleAssignmentChange}
                      >
                        <option value="">Choose an assignment</option>
                        {uploadedAssignments.length === 0 ? (
                          <option disabled>No assignments available</option>
                        ) : (
                          uploadedAssignments.map((item, idx) => (
                            <option key={idx} value={item.assignment}>
                              {item.assignment}
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Upload File</label>
                      <input type="file" className="form-control" onChange={handleFileChange} />
                    </div>

                    <button className="btn btn-success mb-4" onClick={handleUpload}>
                      Upload
                    </button>

                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead className="heading">
                          <tr className="text-center">
                            <th style={{backgroundColor:'purple',fontFamily:'Enriqueta, serif',fontSize:'20px',color:'white'}}>Teacher Name</th>
                            <th style={{backgroundColor:'purple',fontFamily:'Enriqueta, serif',fontSize:'20px',color:'white'}}>Assignment</th>
                            <th style={{backgroundColor:'purple',fontFamily:'Enriqueta, serif',fontSize:'20px',color:'white'}}>Subject</th>
                            <th style={{backgroundColor:'purple',fontFamily:'Enriqueta, serif',fontSize:'20px',color:'white'}}>View</th>
                            <th style={{backgroundColor:'purple',fontFamily:'Enriqueta, serif',fontSize:'20px',color:'white'}}>Date</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {uploadedAssignments.length === 0 ? (
                            <tr>
                              <td colSpan="5">No uploaded assignments found for this subject.</td>
                            </tr>
                          ) : (
                            uploadedAssignments.map((item, index) => (
                              <tr key={index}>
                                <td>{item.teacher || '—'}</td>
                                <td>{item.assignment || '—'}</td>
                                <td>{item.subject}</td>
                                <td>
                                  <button className="btn btn-sm btn-info">View</button>
                                </td>
                                <td>{item.date || '—'}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'checked' && (
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr className="text-center">
                          <th style={{backgroundColor:'purple',fontFamily:'Enriqueta, serif',fontSize:'20px',color:'white'}}>Teacher</th>
                          <th style={{backgroundColor:'purple',fontFamily:'Enriqueta, serif',fontSize:'20px',color:'white'}}>Assignment</th>
                          <th style={{backgroundColor:'purple',fontFamily:'Enriqueta, serif',fontSize:'20px',color:'white'}}>Subject</th>
                          <th style={{backgroundColor:'purple',fontFamily:'Enriqueta, serif',fontSize:'20px',color:'white'}}>View</th>
                          <th style={{backgroundColor:'purple',fontFamily:'Enriqueta, serif',fontSize:'20px',color:'white'}}>Date</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {checkedAssignments.length === 0 ? (
                          <tr>
                            <td colSpan="5">No checked assignments found for this subject.</td>
                          </tr>
                        ) : (
                          checkedAssignments.map((item, index) => (
                            <tr key={index}>
                              <td>{item.teacher || '—'}</td>
                              <td>{item.assignment || '—'}</td>
                              <td>{item.subject}</td>
                              <td>
                                <button className="btn btn-sm btn-info">View</button>
                              </td>
                              <td>{item.date || '—'}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
