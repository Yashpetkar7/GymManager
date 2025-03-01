import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ 
      ...credentials, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the Flask auth API endpoint (using username now)
      const response = await axios.post('http://127.0.0.1:5000/api/auth/login', credentials);
      const data = response.data;
      if (data.authorized) {
        // Optionally store token or other info in localStorage here
        if (data.role === "admin") {
          navigate('/admin');  // Redirect to admin dashboard
        } else {
          navigate('/user/profile');  // Redirect to user profile
        }
      } else {
        setErrorMessage("Invalid credentials! Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed! Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            margin="normal"
            value={credentials.username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={credentials.password}
            onChange={handleChange}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
          {errorMessage && (
            <Typography variant="body1" color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default Login;
