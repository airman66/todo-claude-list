import { useState, type KeyboardEvent } from 'react'

interface Props {
  onAdd: (text: string) => void
}

export function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState('')

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit()
  }

  return (
    <div className="todo-input-wrap">
      <input
        className="todo-input"
        type="text"
        placeholder="Add a new task..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKey}
        autoFocus
      />
      <button className="add-btn" onClick={submit} aria-label="Add task">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
