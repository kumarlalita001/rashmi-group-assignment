import { Task } from "../models/task.model.js";
import { v4 as uuidv4 } from "uuid";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user._id });
    return res
      .status(200)
      .json({ success: true, message: "Successfull Fetched", data: tasks });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Data Fetching Issue Poor Internet",
      data: false,
    });
  }
};

export const createTask = async (req, res) => {
  const { title, description, status, due_date, priority } = req.body;

  try {
    const newTask = new Task({
      task_id: uuidv4(),
      title,
      description,
      status,
      due_date,
      priority,
      user_id: req.user._id,
    });

    await newTask.save();
    return res
      .status(201)
      .json({ success: true, message: "Successfull Fetched", data: newTask });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "ERror in creating new task",
      data: false,
    });
  }
};

export const getSpecificTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      task_id: req.params.task_id,
      user_id: req.user._id,
    });
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task Not found", data: false });
    res
      .status(200)
      .json({ success: true, message: "Successfull Fetched One", data: task });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in Fetching", data: false });
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

    if (!task)
      return res
        .status(404)
        .json({ success: false, data: false, error: "Task not found" });

    res
      .status(200)
      .json({ success: true, message: "Successfull Fetched", data: task });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in Updating", data: false });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      task_id: req.params.task_id,
      user_id: req.user._id,
    });
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task Not Found", data: false });
    res
      .status(200)
      .json({ success: true, message: "Deleted Successfully", data: true });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in Fetching", data: false });
  }
};
