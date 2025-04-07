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
      const { email, password } = req.body;
          
            // Check if the user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
    
            // Check if the password is correct
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
    
            // Return the user data and token
            const token = generateToken(user._id);
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                role: user.role,
                token,
            });
    } catch (error) {
        res.status(500).json({ message: 'Server error' , error: error.message });
    }
}
// @desc Login a new user
// @route POST /api/auth/register
// @access Public

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      
    } catch (error) {
        res.status(500).json({ message: 'Server error' , error: error.message });
    }
}
// @desc Get user profile
// @route GET /api/auth/profile
// @access Private


const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }
      
        user.profileImageUrl = req.body.profileImageUrl || user.profileImageUrl;
        user.role = req.body.role || user.role;

        
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profileImageUrl: updatedUser.profileImageUrl,
            role: updatedUser.role,
        });
      
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

