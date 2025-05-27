import React, { useState } from "react";

function TodoInput({ onAddTask }) {
  const [input, setInput] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      onAddTask(input.trim());
      setInput("");
    }
  };

  return (
    <input
      type="text"
      placeholder="Agregar nueva tarea"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyPress}
    />
  );
}

export default TodoInput;
