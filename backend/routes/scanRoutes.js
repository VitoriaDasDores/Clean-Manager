const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const router  = express.Router();
const Task    = require("../models/Task");

async function handleScan(locId, res) {
  const task = await Task.findOne({ location: locId, status: "Pending" })
                         .sort({ createdAt: 1 });
  if (!task) return res.status(404).json({ message: "Nenhuma tarefa pendente" });

  task.status = "Completed";
  await task.save();
  res.json({ message: "Tarefa mais antiga concluída", task });
}

router.get("/:locId", protect, (req, res) => {
  return handleScan(req.params.locId, res);
});

router.post("/", protect, (req, res) => {
  const { code } = req.body;             
  return handleScan(code, res);
});

module.exports = router;
