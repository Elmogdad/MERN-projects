const Task = require("../models/Task"); // Assuming you have a Task model defined in models/Task.js

// Get all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const { status } = req.query; // Get status from query parameters
    let filter = {};
    if (status) {
      filter.status = status; // Filter by status if provided
    }

    let tasks;

    if (req.user.role === "admin") {
      // If the user is an admin, fetch all tasks
      tasks = await Task.find(filter)
        .populate("assignedTo", "name email profileImageUrl")
        .populate("createdBy", "name email");
    } else {
      tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    }

    // Add Completed Tasks Count to each task
    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completedCount = task.todoChecklist.filter(
          (item) => item.completed
        ).length;
        return {
          ...task._doc,
          completedTodoCount: completedCount,
        };
      })
    );

    // Status sumary
    const allTasks = await Task.find({ assignedTo: req.user._id });
    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "pending",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: "in-progress",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    const completedTasks = await Task.countDocuments({
      ...filter,
      status: "completed",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    res.status(200).json({
      tasks,
      statusSummary: {
        allTasks: allTasks.length,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
    });
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
      return res
        .status(400)
        .json({ message: "todoChecklist must be an array" });
    }
    // تحقق من الحقول الأساسية
    if (!title || !description || !priority || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // إنشاء المهمة مع بيانات المستخدم logged-in عبر req.user._id
    const task = await Task.create({
      title,
      description,
      priority, // سيتم تحويل القيمة إلى lower-case تلقائياً عبر setter
      dueDate,
      assignedTo,
      attachments, // تأكد من ارسال attachments كـ array
      todoChecklist, // يجب إرسالها ككائنات لكل بند
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
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
    task.attachments = req.body.attachments || task.attachments;

    if (req.body.assignedTo) {
      if (!Array.isArray(req.body.assignedTo)) {
        return res
          .status(400)
          .json({ message: "assignedTo must be an array of user Ids" });
      }
      task.assignedTo = req.body.assignedTo;
    }

    const updatedTask = await task.save();
    res.json({ message: "Task updated successfully", updateTask });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Delete a task by ID for the logged-in user
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne(); // Remove the task from the database
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Get a task by ID for the logged-in user
const getTaskBy = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
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
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const isAssigned = task.assignedTo.some(
      (userId) => userId.toString() === req.user._id.toString()
    );
    if (!isAssigned && req.user.role !== "admin")
      return res
        .status(403)
        .json({ message: "You are not authorized to update this task" });

    task.status = req.body.status || task.status;

    if (req.status === "completed") {
      task.todoChecklist = task.todoChecklist.forEach(
        (item) =>
          (item.completed = true) // Mark all todo items as completed
      );
      task.progress = 100; // Set progress to 100%
    }

    await task.save(); // Save the updated task

    res.json({ message: "Task status updated successfully", updateTask });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Update task todo by ID for the logged-in user
const updateTaskTodo = async (req, res) => {
  try { 
    const {todoChecklist} = req.body; // Get todoChecklist from request body
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if(!task.assignedTo.includes(req.user._id) && req.user.role !== "admin"){
      return res.status(403).json({ message: "You are not authorized to update this task" });
    }

    task.completedCount = task.todoChecklist.length; // Update the completed count
    const completedCount = task.todoChecklist.filter(
      (item) => item.completed
    ).length;
    const totalItems = task.todoChecklist.length;
    task.progress = totalItems ? (completedCount / totalItems) * 100 : 0; // Update progress

    //Auto-mark task as completed if all items are done
    if (task.progress === 100) {
      task.status = "completed"; // Set status to completed
    } else if(task.progress > 0) {
      task.status = "in-progress"; // Set status to in-progress
    } else {
      task.status = "pending"; // Set status to pending
    }
    await task.save(); // Save the updated task
    const updatedTask = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );
    res.json({ message: "Task todo updated successfully", updatedTask });

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
