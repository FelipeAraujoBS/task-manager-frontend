import React from "react";

export default function taskCard({ task, onDelete, onEdit }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 flex flex-col gap-2">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
        <p className="text-sm text-gray-600">
          {task.description || "Sem descrição."}
        </p>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => onEdit(task)}
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
    </div>
  );
}
