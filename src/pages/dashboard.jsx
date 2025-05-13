// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../components/taskCard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

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
    if (!title.trim()) return;

    if (title !== "" && description !== "") {
      setCompleted(true);
    }

    try {
      await axios.post(
        "http://localhost:5000/task/register",
        { title, description, completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      setShowForm(false);
      fetchTasks();
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

  const handleEdit = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/task/update/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch {
      setError("Erro ao atualizar tarefa.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Minhas Tarefas</h1>

      <div className="mb-6">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Adicionar Tarefa
          </button>
        ) : (
          <form onSubmit={handleCreateTask} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Título da tarefa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 border rounded"
            />
            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 border rounded"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setTitle("");
                  setDescription("");
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : tasks.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id}>
              <TaskCard
                task={task}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
