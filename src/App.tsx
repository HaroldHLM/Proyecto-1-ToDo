import { useState } from "react"
import { Todos } from "./components/Todos";
import { TODO_FILTERS } from "./consts";
import type { FilterValue } from "./types.d";
import { Footer } from "./components/Footer";


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
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.All)

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

const handleFilterChange = (filter: FilterValue): void => {
  setFilterSelected(filter)
}

const activeCount = todos.filter(todo => !todo.completed).length
const completedCount = todos.length - activeCount

const filteredTodos = todos.filter(todo => {
  if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
  if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
  return todo
})

  return (
    <div className="todoapp">
      <Todos 
        onToggleCompleteTodo={handleComplete}
        onRemoveTodo={handleRemove}
        todos={filteredTodos} />


      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        onClearCompleted={() => {
          const newTodos = todos.filter(todo => !todo.completed)
          setTodos(newTodos)
        }}
      />
    </div>    
  )
}

export default App
