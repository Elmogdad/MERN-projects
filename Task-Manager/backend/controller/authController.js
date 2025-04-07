const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const registerUser = async (req, res) => {
    try {
      const { name, email, password, profileImageUrl, adminInviteToken } = req.body;

      // Check if the user already exists
      const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Determine user role : admin if is provided, else member
        let role = 'member';
        if (adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
            role = 'admin';
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            role,
        });

        // Return the user data and token
        if (user) {
            const token = generateToken(user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                role: user.role,
                token,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' , error: error.message });
    }
}

// @desc Register a new user
// @route POST /api/auth/register
// @access Public

const loginUser = async (req, res) => {
    try {
      
    } catch (error) {
        res.status(500).json({ message: 'Server error' , error: error.message });
    }
}
// @desc Login a new user
// @route POST /api/auth/register
// @access Public

const getUserProfile = async (req, res) => {
    try {
      
    } catch (error) {
        res.status(500).json({ message: 'Server error' , error: error.message });
    }
}
// @desc Get user profile
// @route GET /api/auth/profile
// @access Private


const updateUserProfile = async (req, res) => {
    try {
      
    } catch (error) {
        res.status(500).json({ message: 'Server error' , error: error.message });
    }
}
// @desc Update user profile
// @route PUT /api/auth/profile


module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
};

