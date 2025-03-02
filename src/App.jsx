// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserLandingPage from './components/User/UserLandingPage';
import UserProfile from './components/User/UserProfile';
import ComplaintBox from './components/User/ComplaintBox';
import TrainingAssistance from './components/User/TrainingAssistance';
import MealBooking from './components/User/MealBooking';
import TrainingRequestsList from './components/Admin/Trainingrequest';
import AdminComplaints from './components/Admin/Complintslist';
// import other necessary components

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user from local storage if present
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          {/* Admin Routes */}
          {user && user.role === 'admin' && (
            <>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/trainingRequests" element={<TrainingRequestsList />} />
              <Route path="/admin/complaintlists" element={<AdminComplaints />} />


              {/* other admin routes */}
            </>
          )}
          {/* User Routes */}
          {user && user.role === 'user' && (
            <>
              <Route path="/user/landing" element={<UserLandingPage />} />
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/user/complaint" element={<ComplaintBox />} />
              <Route path="/user/assistance" element={<TrainingAssistance />} />
              <Route path="/user/mealbooking" element={<MealBooking />} />
              {/* other user routes */}
            </>
          )}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
