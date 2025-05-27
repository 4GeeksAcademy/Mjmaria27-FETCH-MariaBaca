import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";

const USERNAME = "Mjmaria27";
const BASE_URL = "https://playground.4geeks.com/todo";

function App() {
  const [tasks, setTasks] = useState([]);

  // Crear usuario (una vez)
  const createUser = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/users/${USERNAME}`, {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) throw new Error("Usuario ya existe o no se pudo crear");
    } catch (error) {
      console.log("Usuario existente o error:", error.message);
    }
  };

  // Obtener tareas
  const fetchTasks = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/users/${USERNAME}`);
      const data = await resp.json();
      if (Array.isArray(data.todos)) {
        setTasks(data.todos);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  // Agregar tarea
  const addTask = async (label) => {
    const newTask = { label: label, is_done: false };
    try {
      await fetch(`${BASE_URL}/todos/${USERNAME}`, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  // Eliminar tarea
  const deleteTask = async (id) => {
    try {
      await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  // Limpiar todas las tareas
  const clearAllTasks = async () => {
    try {
      await fetch(`${BASE_URL}/users/${USERNAME}`, {
        method: "DELETE",
      });
      setTasks([]);
    } catch (error) {
      console.error("Error al borrar todas las tareas:", error);
    }
  };

  useEffect(() => {
    createUser().then(fetchTasks);
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">TO DO LIST</h1>
      <TodoInput onAddTask={addTask} />
      <TodoList tasks={tasks} deleteTask={deleteTask} />
      <div style={{ marginTop: "20px" }}>
       <button
  onClick={clearAllTasks}
  style={{ marginTop: "20px", backgroundColor: "red", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
>
  Limpiar todas las tareas
</button>

        <p style={{ paddingLeft: "3px" }}>
  {tasks.length === 0
    ? "No hay tareas, añadir tareas"
    : tasks.length === 1
    ? "1 item left"
    : `${tasks.length} items left`}
</p>

      </div>
    </div>
  );
}

export default App;
