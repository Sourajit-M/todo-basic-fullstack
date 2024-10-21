export function Todos({ todos, setTodos }) {
    const handleMarkAsDone = (id) => {
        fetch("http://localhost:4000/completed", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Todo not found");
            }
            return res.json();
        })
        .then((data) => {
            alert(data.msg);
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo._id === id ? { ...todo, completed: true } : todo
                )
            );
        })
        .catch((err) => console.error("Error:", err.message));
    };
    

    return (
        <>
            {todos.map(({ _id, title, description, completed }) => (
                <div key={_id}>
                    <h2>{title}</h2>
                    <h3>{description}</h3>
                    <button
                        onClick={() => handleMarkAsDone(_id, title, description)}
                        disabled={completed}
                    >
                        {completed ? "Completed" : "Mark as done"}
                    </button>
                </div>
            ))}
        </>
    );
}
