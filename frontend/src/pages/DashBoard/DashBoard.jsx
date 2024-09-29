import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";
import NoTaskComponent from "./NoTaskComponent";
import TaskInputForm from "./TaskForm";

export default function Dashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      console.log("No token found");
      alert("No token found in localStorage");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/tasks/alltasks", {
        // method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`, // Add the token to Authorization header
        //   "Content-Type": "application/json",
        // },
      });

      if (response.ok) {
        const data = await response.json();

        console.log("TASKS", data);
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const modalRef = useRef(null);
  // Toggle modal open/close
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false); // Close modal when click outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-gray-200 relative">
      <nav className="bg-white shadow-sm  w-full">
        <div className="max-w-7xl mx-auto   ">
          <div className="flex justify-between px-4 md:px-10  bg-gray-100 border-b border-gray-300 h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold  text-gray-800">
                  TASK<span className="text-blue-400 font-bold">NEXT</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={onLogout}
                className="ml-4 px-6 py-2 bg-slate-200 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8 ">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
            <button
              onClick={toggleModal}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create New Task
            </button>
          </div>
          <TaskFilter filter={filter} setFilter={setFilter} />

          <div className="mt-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {isOpen && <TaskInputForm refValue={modalRef} toggle={toggleModal} />}

          {tasks.length == 0 ? (
            <NoTaskComponent />
          ) : (
            <TaskList tasks={filteredTasks} />
          )}
        </div>
      </main>
    </div>
  );
}
