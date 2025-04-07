const express = require('express');
const { registerUser, loginUser,  getUserProfile , updateUserProfile } = require('../controller/authController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Import the upload middleware

const router = express.Router();

// Auth Controller

// Auth Routes

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile' , protect, getUserProfile);
router.put('/profile' , protect, updateUserProfile);


router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;

    res.status(200).json({ imageUrl });
 
});


module.exports = router;