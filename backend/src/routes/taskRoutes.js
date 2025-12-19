const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
  getAssignedTasks,
  getCreatedTasks,
  getOverdueTasks
} = require("../controllers/taskController");

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.patch("/:id/status", auth, updateTaskStatus);
router.delete("/:id", auth, deleteTask);

router.get("/assigned/me", auth, getAssignedTasks);
router.get("/created/me", auth, getCreatedTasks);
router.get("/overdue", auth, getOverdueTasks);


module.exports = router;
