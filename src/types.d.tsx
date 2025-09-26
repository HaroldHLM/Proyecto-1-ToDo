import { TODO_FILTERS } from './consts'

export interface Todo {
    id: string | number
    title: string
    completed: boolean
}

export type ListOfTodos = Todo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]