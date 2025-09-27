import { useState } from 'react';
import { type Todo as TodoType } from '../types.d'

interface Props extends TodoType {
  onToggleCompleteTodo:  ({ id, completed }: { id: string | number; completed: boolean }) => void
  onRemoveTodo?: (id: string | number) => void
  onEditTodo: (id: string | number, title: string) => void
}

export const Todo: React.FC<Props> = ({ id,  title, completed, onRemoveTodo, onToggleCompleteTodo, onEditTodo }) => {

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompleteTodo({ id, completed: event.target.checked })
  }

  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(title)

  const handleDoubleClick = (): void => {
    setEditing(true)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEditText(event.target.value)
  }

  const handleBlur = (): void => {
    setEditing(false)
    if(editText.trim() && editText !== title) {
      onEditTodo(id, editText.trim())
    } else {
      setEditText(title)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleBlur()
    } else if (event.key === 'Escape') {
      setEditing(false)
      setEditText(title)
    }
  }

  return (
    <div className="view">
        <input 
            className="toggle"
            type="checkbox" 
            checked={completed} 
            onChange = {handleChangeCheckbox}
        />
        {editing ? (
          <input
            value={editText}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ):(
          <label onDoubleClick={handleDoubleClick}>
            {title}
          </label>
        )}  
    <button 
      className="destroy"
      onClick={() => onRemoveTodo?.(id)}
    />
    </div>
  )
}