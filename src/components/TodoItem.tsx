import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import type { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const commitEdit = () => {
    const trimmed = value.trim()
    if (trimmed && trimmed !== todo.text) onEdit(todo.id, trimmed)
    else setValue(todo.text)
    setEditing(false)
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') { setValue(todo.text); setEditing(false) }
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
      <button
        className="check-btn"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        <span className="check-circle">
          {todo.completed && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </button>

      {editing ? (
        <input
          ref={inputRef}
          className="edit-input"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKey}
        />
      ) : (
        <span className="todo-text" onDoubleClick={() => !todo.completed && setEditing(true)}>
          {todo.text}
        </span>
      )}

      <div className="todo-actions">
        {!todo.completed && (
          <button
            className="action-btn edit"
            onClick={() => setEditing(true)}
            aria-label="Edit task"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M10.5 2.5l2 2-7 7-2.5.5.5-2.5 7-7z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <button
          className="action-btn delete"
          onClick={() => onDelete(todo.id)}
          aria-label="Delete task"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M3 3l9 9M12 3l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </li>
  )
}
