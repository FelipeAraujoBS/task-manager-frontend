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
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 flex flex-col gap-2">
      {isEditing ? (
        <>
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
        </>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {task.title}
            </h2>
            <p className="text-sm text-gray-600">
              {task.description || "Sem descrição."}
            </p>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
            >
              Deletar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
