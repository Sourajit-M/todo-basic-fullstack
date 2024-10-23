export function Todos({ todos, setTodos }) {
    const handleMarkAsDone = async (id) => {
      try {
        const res = await fetch("http://localhost:4000/completed", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
  
        if (!res.ok) throw new Error("Failed to mark as completed.");
  
        const data = await res.json();
        alert(data.msg);
  
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, completed: true } : todo
          )
        );
      } catch (err) {
        console.error("Error:", err.message);
        alert("Error completing the todo.");
      }
    };
  
    return (
      <div className="todos-container">
        {todos.length === 0 ? (
          <p>No todos available.</p>
        ) : (
          todos.map(({ _id, title, description, completed }) => (
            <div className="todo-item" key={_id}>
              <h2>{title}</h2>
              <h3>{description}</h3>
              <button
                onClick={() => handleMarkAsDone(_id)}
                disabled={completed}
              >
                {completed ? "Completed" : "Mark as Done"}
              </button>
            </div>
          ))
        )}
      </div>
    );
  }
  