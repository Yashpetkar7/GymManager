import React, { useState, useEffect } from 'react';
import { baseURL } from '../../services/api';

const TrainingRequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [expanded, setExpanded] = useState({}); // to track which request's details are expanded

  useEffect(() => {
    fetch(`${baseURL}/api/admin/requests?type=trainingAssistance`)
      .then((response) => response.json())
      .then((data) => {
        setRequests(data);
      })
      .catch((err) => console.error('Error fetching requests:', err));
  }, []);

  const toggleDetails = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container" style={{marginTop:"70px"}}>
      <h1>Training Assistance Requests</h1>
      {requests.map((req) => (
        <div key={req._id} className="card">
          <div className="card-header">
            <h2>Training Request from {req.fullName || "Unknown User"}</h2>
          </div>
          <div className="card-body">
            <p>
              <strong>Assistance Type:</strong> {req.details.assistanceType}
            </p>
            <p>
              <strong>Training Goals:</strong> {req.details.trainingGoals}
            </p>
            <p>
              <strong>Preferred Trainer:</strong> {req.details.preferredTrainer}
            </p>
            {expanded[req._id] && (
              <div className="details">
                <p>
                  <strong>Preferred Days:</strong>{' '}
                  {req.details.preferredDays.join(', ')}
                </p>
                <p>
                  <strong>Preferred Time Slots:</strong>{' '}
                  {req.details.preferredTimeSlots.join(', ')}
                </p>
                <p>
                  <strong>Experience Level:</strong>{' '}
                  {req.details.experienceLevel}
                </p>
                <p>
                  <strong>Dietary Requirements:</strong>{' '}
                  {req.details.dietaryRequirements}
                </p>
                <p>
                  <strong>Medical Conditions:</strong>{' '}
                  {req.details.medicalConditions}
                </p>
                {req.details.additionalNotes && req.details.additionalNotes.trim() && (
                  <p>
                    <strong>Additional Notes:</strong>{' '}
                    {req.details.additionalNotes}
                  </p>
                )}
                <p>
                  <strong>Budget:</strong> ${req.details.budget}
                </p>
                <p>
                  <strong>Start Date:</strong> {req.details.startDate}
                </p>
              </div>
            )}
          </div>
          <div className="card-footer">
            <button onClick={() => toggleDetails(req._id)}>
              {expanded[req._id] ? 'Hide Details' : 'View More'}
            </button>
          </div>
        </div>
      ))}
      <style jsx="true">{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
        }
        .card {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease-in-out;
        }
        .card:hover {
          transform: scale(1.02);
        }
        .card-header h2 {
          margin: 0;
          font-size: 1.2em;
          color: #555;
        }
        .card-body p {
          margin: 8px 0;
          color: #666;
          line-height: 1.5;
        }
        .card-footer {
          margin-top: 15px;
          text-align: right;
        }
        .card-footer button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .card-footer button:hover {
          background-color: #0056b3;
        }
        @media (max-width: 600px) {
          .card {
            padding: 15px;
          }
          .card-header h2 {
            font-size: 1em;
          }
          .card-body p {
            font-size: 0.9em;
          }
          .card-footer button {
            padding: 8px 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default TrainingRequestsList;
