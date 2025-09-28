import { useEffect, useState } from "react"
import { Todos } from "./components/Todos";
import { TODO_FILTERS } from "./consts";
import type { FilterValue } from "./types.d";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import * as api from './backend/Api'



const App: React.FC = () => {
  const [todos, setTodos] = useState<Array<{ id: string | number; title: string; completed: boolean }>>([])
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.All)

  useEffect(() =>{
    api.fetchTodos().then(setTodos).catch(() => {
      console.error('Error fetching todos from API')
    })
  }, [])

  const handleRemove = async (id: string | number): Promise<void> => {
    try{
      await api.deleteTodo(id)
      setTodos(prev => prev.filter(todo => todo.id !== id))
    }
    catch(error) {
      console.error('Error deleting todo from API', error)
    }  
  }


const handleComplete = async ({ id, completed }: { id: string |number; completed: boolean }): Promise<void> => {
  try{
    await  api.updateTodo(id, { completed })
    setTodos(prev => prev.map(todo => todo.id === id? { ...todo, completed } : todo))
  } catch(error) {
    console.error('Error updating todo in API', error)
  }
}

const handleFilterChange = (filter: FilterValue): void => {
  setFilterSelected(filter)
}

const handleRemoveAllCompleted = async (): Promise<void> => {
  try{
    const completedIds = todos.filter(todo => todo.completed).map(todo => todo.id)
    await Promise.all(completedIds.map(id => api.deleteTodo(id)))
    setTodos(todos => todos.filter(todo => !todo.completed))
  } catch(error) {
    console.error('Error removing completed todos from API', error)
  }
}

const activeCount = todos.filter(todo => !todo.completed).length
const completedCount = todos.length - activeCount

const filteredTodos = todos.filter(todo => {
  if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
  if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
  return todo
})

const handleEditTodo = async (id: string | number, title: string): Promise<void> => {
  try{
    const next = title.trim()
    if(!next) throw new Error('Title cannot be empty')
    await api.updateTodo(id, { title: next })
    setTodos(todos => 
      todos.map(todo => 
        todo.id === id ? { ...todo, title: next } : todo
      )
    )
  } catch(error) {
    console.error('Error updating todo in API', error)
  }
}


const handleAddTodo = async (title: string): Promise<void> => {
  try{
    const newTodo = await api.createTodo(title)
    setTodos(todos => [...todos, newTodo])
  } catch(error) {
    console.error('Error creating todo in API', error)
  }  
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
