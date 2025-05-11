// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/task/find", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data.Tarefas || []);
      setLoading(false);
    } catch (err) {
      setError("Erro ao carregar tarefas.");
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      await axios.post(
        "http://localhost:5000/task/register",
        { name: newTask },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewTask("");
      fetchTasks(); // Atualiza a lista
    } catch (err) {
      setError("Erro ao criar tarefa.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/task/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks(); // Atualiza a lista
    } catch {
      setError("Erro ao deletar tarefa.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Minhas Tarefas</h1>

      <form onSubmit={handleCreateTask} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar
        </button>
      </form>

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : tasks.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{task.title}</span>
              <span>{task.description}</span>
              <button
                onClick={() => handleDelete(task._id)}
                className="text-sm text-red-600 hover:underline"
              >
                Deletar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
