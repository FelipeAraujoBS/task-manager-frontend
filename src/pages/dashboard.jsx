import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../components/taskCard";
import { colors, colorClasses } from "../assets/colorMap";

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
  const [dueDate, setDueDate] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const [page, setPage] = useState(1);
  const [taskColor, setTaskColor] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/task/find?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalTasks(res.data.totalTasks);
      setTotalPages(res.data.totalPages);
      setPage(res.data.page);
      setTasks(res.data.tarefas || []);
      setLoading(false);
    } catch (err) {
      setError("Erro ao carregar tarefas.");
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (
      !title.trim() ||
      !description.trim() ||
      !category ||
      !priority ||
      !dueDate
    )
      return;

    const [year, month, day] = dueDate.split("-").map(Number);
    const localDate = new Date(year, month - 1, day, 12);

    try {
      await axios.post(
        "http://localhost:5000/task/register",
        {
          title,
          description,
          category,
          priority,
          completed,
          dueDate: localDate.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      setCategory("");
      setPriority("");
      setDueDate("");
      setCompleted(false);
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
      fetchTasks();
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

  // Agrupa tarefas por categoria
  const groupTasksByCategory = (tasks) => {
    return tasks.reduce((groups, task) => {
      const category = task.category || "Sem Categoria";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(task);
      return groups;
    }, {});
  };

  const groupedTasks = groupTasksByCategory(tasks);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4">
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

            <div className="flex justify-between">
              <div>
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

              <div className="mr-12 gap-2 items-center">
                <label htmlFor="dueDate" className="font-medium">
                  Prazo:
                </label>
                <div>
                  <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="px-3 py-2 border rounded"
                  />
                </div>
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
                  setDueDate("");
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
        <>
          <p className="text-sm text-gray-500 mb-2">
            Total de tarefas: {totalTasks}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedTasks).map(([category, tasks]) => (
              <div key={category} className={`rounded shadow p-4`}>
                <h2
                  className={`text-lg ${
                    colorClasses[colors[category]] || "bg-white"
                  } text-black font-semibold mb-4 text-center p-1.5 rounded`}
                >
                  {category}
                </h2>
                <ul className="space-y-2">
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
              </div>
            ))}
          </div>
        </>
      )}

      {tasks.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`px-4 py-2 rounded ${
              page === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Anterior
          </button>
          <span className="text-sm text-gray-700">
            Página <strong>{page}</strong> de <strong>{totalPages}</strong>
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded ${
              page === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
