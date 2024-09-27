export default function TaskFilter({ filter, setFilter }) {
  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={() => setFilter("all")}
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          filter === "all"
            ? "bg-indigo-100 text-indigo-800"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("Pending")}
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          filter === "Pending"
            ? "bg-red-100 text-red-800"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        Pending
      </button>
      <button
        onClick={() => setFilter("In Progress")}
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          filter === "In Progress"
            ? "bg-yellow-100 text-yellow-800"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        In Progress
      </button>
      <button
        onClick={() => setFilter("Completed")}
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          filter === "Completed"
            ? "bg-green-100 text-green-800"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        Completed
      </button>
    </div>
  );
}
