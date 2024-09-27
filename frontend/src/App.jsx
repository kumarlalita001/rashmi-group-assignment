import React from "react";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AuthLayout from "./pages/Auth/AuthLayout";
import { Route, Routes } from "react-router-dom";
import TaskManagement from "./pages/DashBoard/TaskManagement";
import Dashboard from "./pages/DashBoard/DashBoard";

const App = () => {
  return (
    <div>
      <Routes>
        // public
        <Route path="/" element={<AuthLayout />}>
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        // private //
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="task" element={<TaskManagement />} />
      </Routes>
    </div>
  );
};

export default App;
