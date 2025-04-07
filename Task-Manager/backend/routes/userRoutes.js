const express = require('express');

const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controller/userController');

const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// User Routes
router.get('/', protect, adminOnly, getAllUsers); // Get all users
router.get('/:id', protect, adminOnly, getUserById); // Get user by ID
router.put('/:id', protect, adminOnly, updateUser); // Update user by ID
router.delete('/:id', protect, adminOnly, deleteUser); // Delete user by ID

module.exports = router;