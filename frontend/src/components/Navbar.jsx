import React from "react";

const Navbar = ({ userName, onLogout }) => {
  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center p-4">
      <div className="text-xl font-bold">Task Manager</div>
      <div className="flex items-center space-x-4">
        <span>Hello, {userName}</span>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
