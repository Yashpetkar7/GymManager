import React from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';

const gymDetails = {
  name: 'Elite Fitness Gym',
  description: 'A modern facility with state-of-the-art equipment.',
  membershipPlans: [
    { type: 'Basic', price: '$20/month' },
    { type: 'Premium', price: '$40/month' },
    { type: 'VIP', price: '$60/month' },
  ],
};

const UserLandingPage = () => {
  return (
    <div style={{marginTop:"100px"}}>
    <Container>
      <Typography variant="h3" gutterBottom>
        Welcome to {gymDetails.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {gymDetails.description}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Membership Plans:
      </Typography>
      <Grid container spacing={2}>
        {gymDetails.membershipPlans.map((plan, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{plan.type}</Typography>
                <Typography variant="body2">{plan.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </div>
  );
};

export default UserLandingPage;
