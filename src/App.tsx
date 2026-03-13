import { useState, useEffect } from 'react'
import type { Todo, Filter } from './types'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import './App.css'

const STORAGE_KEY = 'todo-claude-list'

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Todo[]) : []
  } catch {
    return []
  }
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    setTodos(prev => [
      { id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() },
      ...prev,
    ])
  }

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const editTodo = (id: string, text: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t))
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length
  const filters: Filter[] = ['all', 'active', 'completed']

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">todo</h1>
          <span className="subtitle">stay focused</span>
        </header>

        <TodoInput onAdd={addTodo} />

        {todos.length > 0 && (
          <>
            <div className="filter-bar">
              {filters.map(f => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <TodoList
              todos={todos}
              filter={filter}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />

            <footer className="footer">
              <span className="count">
                {activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
              </span>
              {completedCount > 0 && (
                <button className="clear-btn" onClick={clearCompleted}>
                  Clear completed ({completedCount})
                </button>
              )}
            </footer>
          </>
        )}
      </div>
    </div>
  )
}
