import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task_id: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    due_date: { type: Date, required: true },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
