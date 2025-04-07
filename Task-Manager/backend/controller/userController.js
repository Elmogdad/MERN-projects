const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password"); // Exclude password field from the response

    // Add task count to each user
    const usersWithTaskCount = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "pending",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "completed",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "in-progress",
        });
        return {
          ...user._doc,
          pendingTasks,
          completedTasks,
          inProgressTasks,
        };
      })
    );
    res.status(200).json(usersWithTaskCount);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
