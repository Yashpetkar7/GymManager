// src/components/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper
} from '@mui/material';
import { getAllUsers, createUser, deleteUser, updateUser } from '../../services/api';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newUserData, setNewUserData] = useState({
    username: '',
    password: '',
    role: 'user',
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: ''
    },
    healthDetails: {
      weight: '',
      height: '',
      medicalConditions: '',
      fitnessExperience: false
    },
    membership: {
      membershipType: '',
      startDate: '',
      endDate: '',
      active: true
    },
    trainingProgram: ''
  });

  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
// Updated modal style for a wider, responsive registration form
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 800, // maximum width for larger screens
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    maxHeight: '90vh', // allows scrolling if content overflows vertically
  };
  
  // Open edit modal for existing user
  const handleViewMore = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  // New User Modal handling
  const handleNewUserModalOpen = () => {
    setNewUserModalOpen(true);
  };

  const handleNewUserModalClose = () => {
    setNewUserModalOpen(false);
    // Reset form if needed
    setNewUserData({
      username: '',
      password: '',
      role: 'user',
      personalDetails: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: ''
      },
      healthDetails: {
        weight: '',
        height: '',
        medicalConditions: '',
        fitnessExperience: false
      },
      membership: {
        membershipType: '',
        startDate: '',
        endDate: '',
        active: true
      },
      trainingProgram: ''
    });
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    // For nested fields like personalDetails.weight, split the key
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setNewUserData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setNewUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await createUser(newUserData);
      fetchUsers();
      handleNewUserModalClose();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Delete user handling
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirmClose = () => {
    setDeleteConfirmOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(userToDelete._id);
      fetchUsers();
      handleDeleteConfirmClose();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      {/* Register New User Button */}
      <Button variant="contained" color="primary" onClick={handleNewUserModalOpen} sx={{ mb: 2 }}>
        Register New User
      </Button>
      
      {/* Users Table */}
      <Paper sx={{ width: '100%', overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.personalDetails.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" onClick={() => handleViewMore(user)} sx={{ mr: 1 }}>
                    View/Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteClick(user)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Modal for Editing Existing User (View More) */}
      <Modal open={editModalOpen} onClose={handleEditModalClose}>
        <Box sx={modalStyle}>
          {selectedUser && (
            <>
              <Typography variant="h6" gutterBottom>
                Edit User: {selectedUser.username}
              </Typography>
              {/* Example fields for editing user */}
              <TextField
                fullWidth
                margin="normal"
                label="First Name"
                value={selectedUser.personalDetails.firstName || ''}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    personalDetails: { ...selectedUser.personalDetails, firstName: e.target.value }
                  })
                }
              />
              <TextField
                fullWidth
                margin="normal"
                label="Last Name"
                value={selectedUser.personalDetails.lastName || ''}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    personalDetails: { ...selectedUser.personalDetails, lastName: e.target.value }
                  })
                }
              />
              {/* Add more fields as necessary */}
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={async () => {
                // Update API call here if needed
                await updateUser(selectedUser._id, selectedUser);
                fetchUsers();
                handleEditModalClose();
              }}>
                Save Changes
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Modal for Registering New User */}
   {/* Modal for Registering New User */}
<Modal open={newUserModalOpen} onClose={handleNewUserModalClose}>
  <Box sx={modalStyle} component="form" onSubmit={handleCreateUser}>
    <Typography variant="h6" gutterBottom>
      Register New User
    </Typography>
    <TextField
      fullWidth
      margin="normal"
      label="Username"
      name="username"
      value={newUserData.username}
      onChange={handleNewUserChange}
      required
    />
    <TextField
      fullWidth
      margin="normal"
      label="Password"
      name="password"
      type="password"
      value={newUserData.password}
      onChange={handleNewUserChange}
      required
    />
    <TextField
      fullWidth
      margin="normal"
      label="Role"
      name="role"
      value={newUserData.role}
      onChange={handleNewUserChange}
      helperText="Use 'admin' or 'user'"
      required
    />
    <Typography variant="subtitle1" sx={{ mt: 2 }}>Personal Details</Typography>
    <TextField
      fullWidth
      margin="normal"
      label="First Name"
      name="personalDetails.firstName"
      value={newUserData.personalDetails.firstName}
      onChange={handleNewUserChange}
      required
    />
    <TextField
      fullWidth
      margin="normal"
      label="Last Name"
      name="personalDetails.lastName"
      value={newUserData.personalDetails.lastName}
      onChange={handleNewUserChange}
      required
    />
    <TextField
      fullWidth
      margin="normal"
      label="Email"
      name="personalDetails.email"
      value={newUserData.personalDetails.email}
      onChange={handleNewUserChange}
      required
    />
    <TextField
      fullWidth
      margin="normal"
      label="Phone"
      name="personalDetails.phone"
      value={newUserData.personalDetails.phone}
      onChange={handleNewUserChange}
    />
    <TextField
      fullWidth
      margin="normal"
      label="Address"
      name="personalDetails.address"
      value={newUserData.personalDetails.address}
      onChange={handleNewUserChange}
    />
    <TextField
      fullWidth
      margin="normal"
      label="Date of Birth"
      name="personalDetails.dateOfBirth"
      type="date"
      InputLabelProps={{ shrink: true }}
      value={newUserData.personalDetails.dateOfBirth}
      onChange={handleNewUserChange}
    />
    {/* Additional fields for healthDetails, membership, trainingProgram can be added similarly */}
    <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
      Create User
    </Button>
  </Box>
</Modal>


      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteConfirmClose}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the user "{userToDelete?.username}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose}>Cancel</Button>
          <Button onClick={handleDeleteUser} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
