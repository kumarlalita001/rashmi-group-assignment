import React, { useState } from "react";

const TaskInputForm = ({ onSubmit, refValue, toggle }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    due_date: "",
    priority: "Low",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toggle();
    onSubmit(task); // Submit the task data
  };

  return (
    <div
      ref={refValue}
      className="w-[100%] md:w-[40%] right-0 top-[8%] md:top-[2%] md:left-[30%]   p-7  bg-green-100 rounded-lg shadow-lg absolute "
    >
      <span
        onClick={toggle}
        className="absolute top-0 right-0 p-5 font-bold cursor-pointer"
      >
        X
      </span>
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Create New Task
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task ID */}
        <div className="grid grid-cols-1 ">
          {/* Title */}
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={task.title}
              onChange={handleChange}
              required
              className="mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Task Title"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-sm font-medium  text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={task.description}
            onChange={handleChange}
            required
            className="mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Task Description"
            rows="2"
          ></textarea>
        </div>

        {/* Status and Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              value={task.status}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="priority"
              className="text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              value={task.priority}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div className="flex flex-col">
          <label
            htmlFor="due_date"
            className="text-sm font-medium text-gray-700"
          >
            Due Date
          </label>
          <input
            type="date"
            name="due_date"
            id="due_date"
            value={task.due_date}
            onChange={handleChange}
            required
            className="mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInputForm;
