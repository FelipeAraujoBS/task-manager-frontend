import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const isAuthenticated = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-150 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Bem-vindo ao Task Manager {isAuthenticated ? username : ""}
      </h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Organize suas tarefas, aumente sua produtividade e tenha controle total
        sobre seu dia.
      </p>

      {!isAuthenticated ? (
        <div className="flex gap-6">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Entrar
          </Link>
          <Link
            to="/register"
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-100 transition"
          >
            Criar conta
          </Link>
        </div>
      ) : (
        <Link
          to="/dashboard"
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          Acessar Dashboard
        </Link>
      )}
    </div>
  );
}
