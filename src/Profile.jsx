import React, { useEffect, useState } from "react";
import './Profile.css';
import { useNavigate } from "react-router-dom";

// Utility: Converts camelCase or PascalCase to readable text
const readableKey = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace('_', ' ');
};

export default function Profile({ studentId }) {
  const [profileData, setProfileData] = useState(null);
  const [status, setStatus] = useState("loading");
let navigate=useNavigate();
  // Latest token and API endpoint
  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSkFWIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb25pbnN0YW50IjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTAxMiIsIkdycElkIjoiNCIsIlVzZXJUeXBlIjoiU3R1ZGVudCIsIkVtcElkIjoiMSIsIlNjaG9vbE5hbWUiOiJKZWV2YW4gQWRhcnNoIFNjaG9vbCIsIkVtcE5hbWUiOiJSQUdIQVYiLCJleHAiOjE3NzkzNTA5MzksImlzcyI6ImV4YW1FbmdpbmVBUGkiLCJhdWQiOiJNeUFwaVNlcnZpY2UifQ.MBYnyoludSizgqjcqUtbLWckdqnz9jg8lTzf9fLgADE";
  const apiUrl = "https://arizshad-002-site5.ktempurl.com/api/Student/FetchStudentProfile";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // setStatus("loading");

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          body: JSON.stringify({ studentID: studentId || "1" })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(Array.isArray(data))
        console.log("API response Data:", data);
        
        const profile = data[Math.floor(Math.random()*data.length)] || null;
        console.log("profile:", profile);
        setProfileData(profile);
        console.log("ProfileData:",profileData)
        setStatus("success");
        console.log(status)
      } catch (error) {
        console.error("Error fetching profile:", error);
        setStatus("error");
      }
    };

    fetchProfile();
  }, [studentId]);

 
  const closeModal = () => {setStatus("closed"); navigate('/studentDashboard')}

  return (
    <div role="dialog" aria-labelledby="profile-modal">
      {status !== "closed" && (
        <div className="ProfileModal-overlay active">
          <div className="ProfileModal-Div">
            <div className="ProfileHeaderdiv">
              <h2 >Student Profile Data</h2>
              <button
                className="close-button"
                onClick={closeModal}
                aria-label="Close profile modal"
              >
                ×
              </button>
            </div>
            <div className="body" style={{ padding: "20px", fontFamily: "Arial" }}>
              {status === "loading" && (
                <div className="skeleton-wrapper">
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                </div>
              )}

              {status === "error" && (
                <p className="error">❌ Failed to fetch profile data</p>
              )}

              {status === "success" && profileData ? (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {Object.entries(profileData)
                    .filter(([_, value]) => value !== null && value !== undefined)
                    .map(([key, value]) => (
                      <p key={key} style={{ marginBottom: "10px" ,fontSize:'1.2rem'}}>
                        <strong>{readableKey(key)}:</strong> {String(value)}
                      </p>
                    ))}
                </ul>
              ) : (
                status === "success" && <p>No profile data available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
