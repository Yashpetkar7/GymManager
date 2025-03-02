// src/components/Layout/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';

const Layout = ({ children, user, onLogout }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      {/* Navbar at the top */}
      <Box>
        <Navbar user={user} onLogout={onLogout} />
      </Box>

      {/* Main content area grows to fill space */}
      <Box component="main" sx={{ flex: 1, p: 2 }}>
        {children}
      </Box>

      {/* Footer at the bottom */}
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
