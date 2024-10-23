import { useState } from "react";

export function CreateTodo({ setTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Both title and description are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("Failed to add todo.");

      const newTodo = await res.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);

      setTitle(""); // Clear input fields
      setDescription("");
      alert("Todo added successfully!");
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  return (
    <div className="create-todo">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}
