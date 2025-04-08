const Task = require("../models/Task"); // Assuming you have a Task model defined in models/Task.js

// Get all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Create a new task for the logged-in user


const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoChecklist,
    } = req.body;

    // التأكد من أن assignedTo مصفوفة
    if (!Array.isArray(assignedTo)) {
      return res.status(400).json({ message: "assignedTo must be an array" });
    }
    // التأكد من أن todoChecklist مصفوفة
    if (!Array.isArray(todoChecklist)) {
      return res.status(400).json({ message: "todoChecklist must be an array" });
    }
    // تحقق من الحقول الأساسية
    if (!title || !description || !priority || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // إنشاء المهمة مع بيانات المستخدم logged-in عبر req.user._id
    const task = await Task.create({
      title,
      description,
      priority,       // سيتم تحويل القيمة إلى lower-case تلقائياً عبر setter
      dueDate,
      assignedTo,
      attachments,    // تأكد من ارسال attachments كـ array
      todoChecklist,  // يجب إرسالها ككائنات لكل بند
      createdBy: req.user._id,
    });
    
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};



  

// Update a task by ID for the logged-in user
const updateTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Delete a task by ID for the logged-in user
const deleteTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Get a task by ID for the logged-in user
const getTaskBy = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Get dashboard data for admin
const getDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Get dashboard data for user
const getUserDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Update task status by ID for the logged-in user
const updateTaskStatus = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Update task todo by ID for the logged-in user
const updateTaskTodo = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Export the controller functions
module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskBy,
  getDashboardData,
  getUserDashboardData,
  updateTaskStatus,
  updateTaskTodo,
};
