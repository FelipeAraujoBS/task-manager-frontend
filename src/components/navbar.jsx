import React from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  homeIcon,
  userAccount,
  dashboardIcon,
  logoutIcon,
} from "../assets/icons";

export default function Navbar() {
  const isAuthenticated = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-md">
      <Link to="/" className="text-xl font-semibold text-blue-600">
        Rotinando
      </Link>
      <div className="flex gap-10">
        <Link
          to="/"
          className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
        >
          {homeIcon}
          <span>Inicio</span>
        </Link>

        {!isAuthenticated ? (
          <>
            <Link
              to="login"
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
            >
              {userAccount}
              <span>Login</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="dashboard"
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
            >
              {dashboardIcon}
              <span>Tarefas</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition"
            >
              {logoutIcon}
              <span>Logout</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
