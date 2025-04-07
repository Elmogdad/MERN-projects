const express = require('express');
const { registerUser, loginUser,  getUserProfile , updateUserProfile } = require('../controller/authController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// Auth Controller

// Auth Routes

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile' , protect, getUserProfile);
router.put('/profile' , protect, updateUserProfile);


module.exports = router;