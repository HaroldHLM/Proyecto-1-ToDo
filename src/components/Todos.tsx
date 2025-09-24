import { type ListOfTodos } from '../types.d'
import { Todo } from './Todo'

interface Props {
    todos: ListOfTodos
    onToggleCompleteTodo:  ({ id, completed }: { id: number; completed: boolean }) => void
    onRemoveTodo?: (id: number) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleteTodo }) => {
    return (
        <ul className='todo-list'>
            {todos.map(todo => (
                <li key={todo.id} 
                    className={todo.completed ? 'completed' : ''}
                >
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed} 
                        onToggleCompleteTodo={onToggleCompleteTodo}
                        onRemoveTodo={onRemoveTodo}
                    />

                </li>
            ))}            
        </ul>
    )
}
