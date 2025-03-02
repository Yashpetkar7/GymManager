// src/components/User/TrainingAssistance.jsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Box
} from '@mui/material';
import { createUserRequest } from '../../services/api';
import { useNavigate } from 'react-router-dom';

// Dummy dropdown options
const daysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlotsOptions = [
  '6:00 AM - 7:00 AM',
  '7:00 AM - 8:00 AM',
  '8:00 AM - 9:00 AM',
  '10:00 AM - 11:00 AM',
  '6:00 PM - 7:00 PM',
  '7:00 PM - 8:00 PM'
];
const assistanceTypes = ['Personal Training', 'Group Training', 'Program Design'];
const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];

const TrainingAssistance = () => {
  const [formData, setFormData] = useState({
    assistanceType: '',
    trainingGoals: '',
    preferredTrainer: '',
    preferredDays: [],
    preferredTimeSlots: [],
    experienceLevel: '',
    dietaryRequirements: '',
    medicalConditions: '',
    additionalNotes: '',
    budget: '',
    startDate: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle multi-select fields (for days and time slots)
  const handleMultiSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: typeof value === 'string' ? value.split(',') : value }));
  };
  const user = JSON.parse(localStorage.getItem('user'));
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        type: 'trainingAssistance',
        details: {
         userName:user.fullname,
          userId: user.userId,
          assistanceType: formData.assistanceType,
          trainingGoals: formData.trainingGoals,
          preferredTrainer: formData.preferredTrainer,
          preferredDays: formData.preferredDays,
          preferredTimeSlots: formData.preferredTimeSlots,
          experienceLevel: formData.experienceLevel,
          dietaryRequirements: formData.dietaryRequirements,
          medicalConditions: formData.medicalConditions,
          additionalNotes: formData.additionalNotes,
          budget: formData.budget,
          startDate: formData.startDate
        }
      };

      await createUserRequest(payload);
      alert('Training assistance request submitted successfully!');
      navigate('/user/landing');
    } catch (error) {
      console.error('Error submitting training assistance request:', error);
      alert('Error submitting request. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Training Assistance Request
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        {/* Assistance Type Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Assistance Type</InputLabel>
          <Select
            name="assistanceType"
            value={formData.assistanceType}
            onChange={handleChange}
            label="Assistance Type"
            required
          >
            {assistanceTypes.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Training Goals */}
        <TextField
          fullWidth
          margin="normal"
          label="Training Goals"
          name="trainingGoals"
          value={formData.trainingGoals}
          onChange={handleChange}
          multiline
          rows={3}
          required
        />
        {/* Preferred Trainer */}
        <TextField
          fullWidth
          margin="normal"
          label="Preferred Trainer"
          name="preferredTrainer"
          value={formData.preferredTrainer}
          onChange={handleChange}
          required
        />
        {/* Preferred Days Multi-Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Preferred Days</InputLabel>
          <Select
            name="preferredDays"
            multiple
            value={formData.preferredDays}
            onChange={handleMultiSelectChange}
            input={<OutlinedInput label="Preferred Days" />}
            renderValue={(selected) => selected.join(', ')}
            required
          >
            {daysOptions.map((day) => (
              <MenuItem key={day} value={day}>
                <Checkbox checked={formData.preferredDays.indexOf(day) > -1} />
                <ListItemText primary={day} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Preferred Time Slots Multi-Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Preferred Time Slots</InputLabel>
          <Select
            name="preferredTimeSlots"
            multiple
            value={formData.preferredTimeSlots}
            onChange={handleMultiSelectChange}
            input={<OutlinedInput label="Preferred Time Slots" />}
            renderValue={(selected) => selected.join(', ')}
            required
          >
            {timeSlotsOptions.map((slot) => (
              <MenuItem key={slot} value={slot}>
                <Checkbox checked={formData.preferredTimeSlots.indexOf(slot) > -1} />
                <ListItemText primary={slot} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Experience Level */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Experience Level</InputLabel>
          <Select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            label="Experience Level"
            required
          >
            {experienceLevels.map((level) => (
              <MenuItem key={level} value={level}>{level}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Dietary Requirements */}
        <TextField
          fullWidth
          margin="normal"
          label="Dietary Requirements"
          name="dietaryRequirements"
          value={formData.dietaryRequirements}
          onChange={handleChange}
          required
        />
        {/* Medical Conditions */}
        <TextField
          fullWidth
          margin="normal"
          label="Medical Conditions"
          name="medicalConditions"
          value={formData.medicalConditions}
          onChange={handleChange}
          required
        />
        {/* Additional Notes */}
        <TextField
          fullWidth
          margin="normal"
          label="Additional Notes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          multiline
          rows={3}
        />
        {/* Budget */}
        <TextField
          fullWidth
          margin="normal"
          label="Budget (in currency)"
          name="budget"
          type="number"
          value={formData.budget}
          onChange={handleChange}
          required
        />
        {/* Start Date */}
        <TextField
          fullWidth
          margin="normal"
          label="Preferred Start Date"
          name="startDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
          Submit Request
        </Button>
      </Box>
    </Container>
  );
};

export default TrainingAssistance;
