require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); // Ensure this path is correct


const app = express();


const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Middleware to handle CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON requests
app.use(express.json());


// Connect to MongoDB
connectDB(); // Uncomment if you want to connect to MongoDB here

//Routes
app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/reports', reportRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});