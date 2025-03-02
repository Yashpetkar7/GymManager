// src/components/Layout/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <AppBar position="fixed" sx={{ top: 0, width: '100%', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          GymManager
        </Typography>
        {user ? (
          <>
            {user.role === 'admin' && (
              <>
                <Button color="inherit" component={Link} to="/admin/dashboard">
                  Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/admin/complaintlists">
                  List of Complaints
                </Button>
              </>
            )}
            {user.role === 'user' && (
              <>
                <Button color="inherit" component={Link} to="/user/landing">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/user/profile">
                  Profile
                </Button>
                <Button color="inherit" component={Link} to="/user/complaint">
                  Complaint
                </Button>
                <Button color="inherit" component={Link} to="/user/assistance">
                  Training Assistance
                </Button>
                <Button color="inherit" component={Link} to="/user/mealbooking">
                  Meal Booking
                </Button>
              </>
            )}
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
