import React, { useState } from "react";
import { colors, colorClasses } from "../assets/colorMap";

export default function TaskCard({ task, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ""
  );
  const [editCategory, setEditCategory] = useState(task.category || "");
  const [editPriority, setEditPriority] = useState(task.priority || "");
  const [editDueDate, setEditDueDate] = useState(
    task.dueDate ? task.dueDate.split("T")[0] : ""
  );

  const categoryColor = colorClasses[colors[task.category] || "white"];

  const [year, month, day] = editDueDate.split("-").map(Number);
  const localDate = new Date(year, month - 1, day, 12);

  const handleSave = async () => {
    if (!editTitle.trim()) return;

    await onEdit(task._id, {
      title: editTitle,
      description: editDescription,
      category: editCategory,
      priority: editPriority,
      dueDate: localDate.toISOString(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditCategory(task.category || "");
    setEditPriority(task.priority || "");
    setEditDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
  };

  return (
    <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-4">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="px-3 py-2 border rounded"
            placeholder="Título"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="px-3 py-2 border rounded"
            placeholder="Descrição"
          />
          <select
            id="category"
            name="categories"
            value={editCategory}
            onChange={(e) => {
              const value =
                e.target.value.charAt(0).toUpperCase() +
                e.target.value.slice(1);

              setEditCategory(value);
            }}
            className="px-3 py-2 border rounded"
          >
            <option value="">
              {editCategory === "" ? "Selecione uma categoria" : editCategory}
            </option>
            <option value="trabalho">Trabalho</option>
            <option value="estudo">Estudo</option>
            <option value="negocios">Negócios</option>
            <option value="financas">Finanças</option>
            <option value="outros">Outros</option>
          </select>
          <div className="flex gap-2">
            {["Baixa", "Media", "Alta"].map((level) => (
              <label
                key={level}
                className={`cursor-pointer px-4 py-2 rounded border transition-all ${
                  editPriority === level
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => {
                  const value = level.charAt(0).toUpperCase() + level.slice(1);

                  setEditPriority(value);
                }}
              >
                <input
                  type="radio"
                  value={level}
                  checked={editPriority === level}
                  onChange={() => {
                    const value =
                      level.charAt(0).toUpperCase() + level.slice(1);

                    setEditPriority(value);
                  }}
                  className="hidden"
                />
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </label>
            ))}
          </div>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="px-3 py-2 border rounded"
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
            >
              Salvar
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm rounded bg-gray-400 text-white hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`flex items-center gap-2 text-lg font-bold ${categoryColor} text-gray-800 mb-2`}
          >
            🏷️ {task.title}
          </div>

          <hr className="my-2" />

          <div className="flex justify-between text-sm text-gray-600">
            <span>📂 Categoria: {task.category || "Não definida"}</span>
            <span>🔥 Prioridade: {task.priority || "Não definida"}</span>
          </div>

          <div className="mt-1 text-sm text-gray-600">
            🗓️ Prazo:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString("pt-BR")
              : "Sem prazo"}
          </div>

          <div className="mt-4 text-sm text-gray-800">
            ✏️ {task.description || "Sem descrição."}
          </div>

          <hr className="my-3" />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => onEdit(task._id, { completed: !task.completed })}
              className="text-sm px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
            >
              ✔️ Concluir
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              ✏️ Editar
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
            >
              🗑️ Deletar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
