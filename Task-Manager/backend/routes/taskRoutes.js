const express = require("express");

const {getTasks, createTask, updateTask, deleteTask, getTaskBy, getDashboardData
    , getUserDashboardData, updateTaskStatus, updateTaskTodo} = require('../controller/taskController');

 const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

// Task management routes
router.get("/", protect, getTasks); // Get all tasks
router.post("/", protect, createTask); // Create a new task
router.put("/:id", protect, updateTask); // Update a task by ID
router.delete("/:id", protect, deleteTask); // Delete a task by ID
router.get("/:id", protect, getTaskBy); // Get a task by ID
router.get("/dashboard-data", protect, getDashboardData); // Get dashboard data for admin
router.get("/user-dashboard-data", protect, getUserDashboardData); // Get dashboard data for user
router.put("/:id/status", protect, updateTaskStatus); // Update task status by ID
router.put("/:id/todo", protect, updateTaskTodo); // Update task todo by ID

// Export the router
module.exports = router;
