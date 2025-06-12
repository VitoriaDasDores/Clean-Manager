const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getTasksByLocation, completeTask, getDashboardData, getUserDashboardData, getTaskById, getTasks, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require("../controllers/taskController");

const router = express.Router();

router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); 
router.get("/:id", protect, getTaskById); 
router.post("/", protect, adminOnly, createTask); 
router.put("/:id", protect, updateTask); 
router.delete("/:id", protect, adminOnly, deleteTask); 
router.put("/:id/status", protect, updateTaskStatus); 
router.put("/:id/todo", protect, updateTaskChecklist); 
router.get("/by-location/:loc", protect, getTasksByLocation);  
router.put("/:id/complete", protect, completeTask);

module.exports = router;
