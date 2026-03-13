import type { Todo, Filter } from '../types'
import { TodoItem } from './TodoItem'

interface Props {
  todos: Todo[]
  filter: Filter
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export function TodoList({ todos, filter, onToggle, onDelete, onEdit }: Props) {
  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  if (filtered.length === 0) {
    return (
      <div className="empty-state">
        {filter === 'completed' ? 'No completed tasks yet' :
         filter === 'active' ? 'All tasks done!' :
         'No tasks yet. Add one above!'}
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {filtered.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
