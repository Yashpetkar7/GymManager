// src/components/Layout/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#f5f5f5',
        p: 2,
        textAlign: 'center'
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} GymManager. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
