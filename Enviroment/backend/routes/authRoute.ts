const express = require('express');

const { registerHander, loginHandler } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerHander);
router.post('/login', loginHandler);

module.exports = router;
