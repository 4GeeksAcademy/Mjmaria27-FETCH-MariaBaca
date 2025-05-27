import React, { useState } from 'react';

export default function TodoItem({ task, onDelete }) {
  const [hover, setHover] = useState(false);

  return (
    <li
      className="todo-item"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span>{task}</span>
      {hover && (
        <button className="delete-btn" onClick={onDelete} aria-label="Eliminar tarea">
          ✖
        </button>
      )}
    </li>
  );
}
