import React from "react";

const NoTaskComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 mt-20 md:mt-5">
      <h2 className="text-2xl font-semibold text-gray-700 mt-4">
        No Tasks Available
      </h2>
      <p className="text-gray-500 mt-2 text-center">
        You're all caught up! Start by adding a new task.
      </p>
      <button className="mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition">
        Add Task
      </button>
    </div>
  );
};

export default NoTaskComponent;
