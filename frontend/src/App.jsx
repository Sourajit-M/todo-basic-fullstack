import { useState, useEffect } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/todos")
      .then(res => res.json())
      .then(data => setTodos(data.todos))
      .catch(err => console.error("Error fetching todos:", err))
  }, [])

  return (
    <>
      <CreateTodo setTodos={setTodos} />
      <Todos todos={todos} setTodos={setTodos} />
    </>
  )
}

export default App
