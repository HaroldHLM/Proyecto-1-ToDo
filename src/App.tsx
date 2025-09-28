import { useEffect, useState } from "react"
import { Todos } from "./components/Todos";
import { TODO_FILTERS } from "./consts";
import type { FilterValue } from "./types.d";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import * as api from './backend/Api'

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
  const [todos, setTodos] = useState<Array<{ id: string | number; title: string; completed: boolean }>>(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.All)

  useEffect(() =>{
    api.fetchTodos().then(setTodos).catch(() => {
      console.error('Error fetching todos from API')
    })
  }, [])

  const handleRemove = async (id: string | number): Promise<void> => {
    try{
      await api.deleteTodo(id)
      setTodos(todos => todos.filter(todo => todo.id !== id))
    }
    catch(error) {
      console.error('Error deleting todo from API', error)
    }  
  }


const handleComplete = ({ id, completed }: { id: string |number; completed: boolean }): void => {
  try{
    api.updateTodo(id, { completed })
    setTodos(prev => prev.map(todo => todo.id === id? { ...todo, completed } : todo))
  } catch(error) {
    console.error('Error updating todo in API', error)
  }
}

const handleFilterChange = (filter: FilterValue): void => {
  setFilterSelected(filter)
}

const handleRemoveAllCompleted = (): void => {
  const newTodos = todos.filter(todo => !todo.completed)
  setTodos(newTodos)
}

const activeCount = todos.filter(todo => !todo.completed).length
const completedCount = todos.length - activeCount

const filteredTodos = todos.filter(todo => {
  if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
  if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
  return todo
})

const handleEditTodo = (id: string | number, title: string): void => {
  setTodos(todos =>
    todos.map(todo =>
      todo.id === id ? { ...todo, title } : todo
    )
  )
}

const handleAddTodo = (title: string): void => {
  const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }
  const newTodos = [...todos, newTodo]
  setTodos(newTodos)
}
    

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo} />
      <Todos 
        onToggleCompleteTodo={handleComplete}
        onRemoveTodo={handleRemove}
        todos={filteredTodos} 
        onEditTodo={handleEditTodo}
      />


      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        onClearCompleted={handleRemoveAllCompleted}
      />
    </div>    
  )
}

export default App
