import { Task } from "../models/task.model.js";
import { v4 as uuidv4 } from "uuid";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user._id });
    return res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

export const createTask = async (req, res) => {
  const { title, description, status, due_date, priority } = req.body;

  console.log(req.body);

  try {
    const newTask = new Task({
      task_id: uuidv4(), // Generate unique task ID
      title,
      description,
      status,
      due_date,
      priority,
      user_id: req.user._id, // Extract user ID from the authenticated user
    });

    await newTask.save();
    return res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

export const getSpecificTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      task_id: req.params.task_id,
      user_id: req.user._id,
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error fetching task" });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, status, due_date, priority } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { task_id: req.params.task_id, user_id: req.user._id },
      {
        title,
        description,
        status,
        due_date,
        priority,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      task_id: req.params.task_id,
      user_id: req.user._id,
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
