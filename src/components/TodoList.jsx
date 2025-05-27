import React from "react";

function TodoList({ tasks, deleteTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="todo-item">
          {task.label}
          <span className="delete-icon" onClick={() => deleteTask(task.id)}>
            ✖
          </span>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
