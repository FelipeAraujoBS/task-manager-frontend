import React, { useState } from "react";

export default function TaskCard({ task, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ""
  );

  const handleSave = async () => {
    if (!editTitle.trim()) return;

    await onEdit(task._id, {
      title: editTitle,
      description: editDescription,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
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
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
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
          <div className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-2">
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
