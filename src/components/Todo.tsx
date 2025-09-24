import { type Todo as TodoType } from '../types.d'

interface Props extends TodoType {
    onToggleCompleteTodo:  ({ id, completed }: { id: number; completed: boolean }) => void
    onRemoveTodo?: (id: number) => void
}

export const Todo: React.FC<Props> = ({ id,  title, completed, onRemoveTodo, onToggleCompleteTodo }) => {

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompleteTodo({ id, completed: event.target.checked })
  }

  return (
    <div className="view">
        <input 
            className="toggle"
            type="checkbox" 
            checked={completed} 
            onChange={(event) => handleChangeCheckbox(event)}
        />
        <label>{title}</label>  
    <button 
      className="destroy"
      onClick={() => onRemoveTodo?.(id)}
    />
    </div>
  )
}