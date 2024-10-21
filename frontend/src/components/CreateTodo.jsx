import { useState } from "react";

export function CreateTodo({ setTodos }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    return (
        <div style={{ display: "flex" }}>
            <input
                style={{ margin: 10, padding: 10 }}
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                style={{ margin: 10, padding: 10 }}
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
            />

            <button
                style={{ margin: 10, padding: 10 }}
                onClick={() => {
                    fetch("http://localhost:4000/todo", {
                        method: "POST",
                        body: JSON.stringify({ title, description }),
                        headers: { "Content-type": "application/json" },
                    })
                    .then(async (res) => {
                        const newTodo = await res.json();
                        setTodos((prevTodos) => [...prevTodos, newTodo]);
                        alert("Todo added");
                    })
                    .catch((err) => console.error("Error adding todo:", err));
                }}
            >
                Add Todo
            </button>
        </div>
    );
}
