import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { checkAuth } from "../middlewares/check.auth.middleware.js";
const router = Router();

router.get("/alltasks", checkAuth, getAllTasks);
router.post("/create-task", checkAuth, createTask);
router.put("/:task_id", checkAuth, updateTask);
router.delete("/:task_id", checkAuth, deleteTask);

export default router;
