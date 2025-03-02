// src/components/Admin/AdminComplaints.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import { getAllRequests } from '../../services/api';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await getAllRequests();
        // Filter requests to only include those of type 'complaint'
        const complaintRequests = data.filter(req => req.type === 'complaint');
        setComplaints(complaintRequests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Complaints
      </Typography>
      {complaints.length === 0 ? (
        <Typography variant="body1" align="center">
          No complaints found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {complaints.map((complaint) => (
            <Grid item xs={12} key={complaint._id}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Complaint ID: {complaint._id}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Message:</strong> {complaint.details.message}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {complaint.status} | Submitted on:{' '}
                    {new Date(complaint.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AdminComplaints;
