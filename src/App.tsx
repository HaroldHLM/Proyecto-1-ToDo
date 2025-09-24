import { useState } from "react"
import { Todos } from "./components/Todos";


const mockTodos = [
  { id: 1, 
    title: "Learn TypeScript", 
    completed: true
  },
  { id: 2, 
    title: "Build a Todo App", 
    completed: false
   },
  { id: 3, 
    title: "Master React", 
    completed: false 
  },
]

const App: React.FC = () => {
  const [todos, setTodos] = useState(mockTodos)

  const handleRemove = (id: number):void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }


const handleComplete = ({ id, completed }: { id: number; completed: boolean }): void => {
  const newTodos = todos.map(todo =>{
    if (todo.id === id) {
      return { ...todo, completed };
    }
    return todo;
  })
  setTodos(newTodos)
}

  return (
    <div className="todoapp">
      <Todos 
        onRemoveTodo={handleRemove}
        onToggleCompleteTodo={handleComplete}
        todos={todos} />
    </div>
    
  )
}

export default App
