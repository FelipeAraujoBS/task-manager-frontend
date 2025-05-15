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
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "https://task-manager-api-zmo4.onrender.com/task/find",
        //"http://localhost:5000/task/find",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(res.data.Tarefas || []);
      setLoading(false);
    } catch (err) {
      setError("Erro ao carregar tarefas.");
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    try {
      const res = await axios.post(
        "https://task-manager-api-zmo4.onrender.com/task/register",
        //"http://localhost:5000/task/register",
        { title, description, category, priority, completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);

      setTitle("");
      setDescription("");
      setCategory("");
      setPriority("");
      setCompleted(false);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError("Erro ao criar tarefa.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://task-manager-api-zmo4.onrender.com/task/delete/${id}`,
        //`http://localhost:5000/task/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch {
      setError("Erro ao deletar tarefa.");
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      await axios.put(
        `https://task-manager-api-zmo4.onrender.com/task/update/${id}`,
        //`http://localhost:5000/task/update/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch {
      setError("Erro ao atualizar tarefa.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Minhas Tarefas</h1>

      <div className="mb-6">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Adicionar Tarefa
          </button>
        ) : (
          <form
            onSubmit={handleCreateTask}
            className="flex flex-col gap-4 bg-gray-100 p-4 rounded shadow"
          >
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
            <select
              id="category"
              name="categories"
              value={category}
              onChange={(e) => {
                const value =
                  e.target.value.charAt(0).toUpperCase() +
                  e.target.value.slice(1);

                setCategory(value);
              }}
              className="px-3 py-2 border rounded"
            >
              <option value="">
                {category === "" ? "Selecione uma categoria" : category}
              </option>
              <option value="trabalho">Trabalho</option>
              <option value="estudo">Estudo</option>
              <option value="negocios">Negócios</option>
              <option value="financas">Finanças</option>
              <option value="outros">Outros</option>
            </select>
            <div className="flex flex-col">
              <span className="mb-1 font-medium">Prioridade:</span>
              <div className="flex gap-2">
                {["Baixa", "Media", "Alta"].map((level) => (
                  <label
                    key={level}
                    className={`cursor-pointer px-4 py-2 rounded border transition-all ${
                      priority === level
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      const value =
                        level.charAt(0).toUpperCase() + level.slice(1);

                      setPriority(value);
                    }}
                  >
                    <input
                      type="radio"
                      value={level}
                      checked={priority === level}
                      onChange={() => {
                        const value =
                          level.charAt(0).toUpperCase() + level.slice(1);

                        setPriority(value);
                      }}
                      className="hidden"
                    />
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </label>
                ))}
              </div>
            </div>

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
                  setCategory("");
                  setPriority("");
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
