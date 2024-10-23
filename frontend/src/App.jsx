import { useState, useEffect } from 'react';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';
import './App.css';

const TODOS_API = "http://localhost:4000/todos"; // API endpoint as a constant

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null);     // Track errors

  // Fetch todos from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(TODOS_API);
        if (!res.ok) throw new Error("Failed to fetch todos.");
        const data = await res.json();
        setTodos(data.todos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading after the request completes
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="app-container">
      <CreateTodo setTodos={setTodos} />
      {loading ? (
        <p className="loading-message">Loading todos...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <Todos todos={todos} setTodos={setTodos} />
      )}
    </div>
  );
}

export default App;
