import { type ListOfTodos } from '../types.d'
import { Todo } from './Todo'

interface Props {
    todos: ListOfTodos
    onToggleCompleteTodo:  ({ id, completed }: { id: string | number; completed: boolean }) => void
    onRemoveTodo?: (id: string | number) => void
    onEditTodo: (id: string | number, title: string) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleteTodo, onEditTodo }) => {
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
                        onEditTodo={onEditTodo}
                    />

                </li>
            ))}            
        </ul>
    )
}
