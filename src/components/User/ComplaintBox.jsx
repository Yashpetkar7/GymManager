import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { createUserRequest } from '../../services/api';

const ComplaintBox = () => {
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUserRequest({
      userId: user.userId,
      type: 'complaint',
      details: { message },
    });
    setMessage('');
    alert('Complaint submitted!');
  };

  return (
    <div style={{marginTop:"100px"}}>

    <Container>
      <Typography variant="h5">Submit a Complaint</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your complaint here..."
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Container>
    </div>
  );
};

export default ComplaintBox;
