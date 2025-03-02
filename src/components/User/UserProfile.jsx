import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
} from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react'; // Correct named import
import { getUserProfile } from '../../services/api';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await getUserProfile(user.userId);
      setProfile(data);
    };
    fetchProfile();
  }, [user.userId]);

  if (!profile) return <Typography align="center">Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom align="center">
        Your Profile
      </Typography>
      
      <Card variant="outlined" sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Personal Details
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {profile.personalDetails.firstName}{' '}
                {profile.personalDetails.lastName}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {profile.personalDetails.email}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {profile.personalDetails.phone}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {profile.personalDetails.address}
              </Typography>
              <Typography variant="body1">
                <strong>Date of Birth:</strong>{' '}
                {new Date(profile.personalDetails.dateOfBirth).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6" gutterBottom>
                Your QR Code
              </Typography>
              <Box
                sx={{
                  border: '1px solid #ddd',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: '#fafafa',
                }}
              >
                <QRCodeCanvas value={user.userId} size={128} />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Card variant="outlined" sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Health Details
          </Typography>
          <Typography variant="body1">
            <strong>Weight:</strong> {profile.healthDetails.weight} kg
          </Typography>
          <Typography variant="body1">
            <strong>Height:</strong> {profile.healthDetails.height} cm
          </Typography>
          <Typography variant="body1">
            <strong>Medical Conditions:</strong>{' '}
            {profile.healthDetails.medicalConditions}
          </Typography>
          <Typography variant="body1">
            <strong>Fitness Experience:</strong>{' '}
            {profile.healthDetails.fitnessExperience ? 'Yes' : 'No'}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
