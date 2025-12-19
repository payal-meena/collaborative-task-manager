const Task = require("../models/Task");
const User = require("../models/User");
const createTaskDto = require("../dtos/createTaskDto");
const { getIO } = require("../socket");

exports.createTask = async (req, res) => {
  try {
    createTaskDto.parse(req.body);

    const { title, description, dueDate, priority, assignedToId } = req.body;

    const assignedUser = await User.findById(assignedToId);
    if (!assignedUser) {
      return res.status(404).json({ message: "Assigned user not found" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      assignedToId,
      creatorId: req.user.id
    });

    getIO().emit("taskUpdated");

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({
      message: err.errors ? err.errors[0].message : err.message
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { status, priority, sort } = req.query;

    let query = {};

    if (status) query.status = status;
    if (priority) query.priority = priority;

    let tasksQuery = Task.find(query)
      .populate("assignedToId", "name email")
      .populate("creatorId", "name email");

    if (sort === "dueDate") {
      tasksQuery = tasksQuery.sort({ dueDate: 1 });
    }

    const tasks = await tasksQuery;
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    getIO().emit("taskUpdated");

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    getIO().emit("taskUpdated");

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

exports.getAssignedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedToId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch assigned tasks" });
  }
};

exports.getCreatedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ creatorId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch created tasks" });
  }
};

exports.getOverdueTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      dueDate: { $lt: new Date() },
      status: { $ne: "Completed" }
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch overdue tasks" });
  }
};
