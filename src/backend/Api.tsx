import type { Todo } from "../types.d";

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'
const API_URL = `${BASE}/todos`

export async function fetchTodos(): Promise<Todo[]> {
    const res = await fetch(API_URL)
    if(!res.ok) throw new Error('Error fetching todos')
    return await res.json()
}

export async function createTodo(title: string): Promise<Todo> {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title.trim(), completed: false })
    })
    if(!res.ok) throw new Error('Error creating todo')
    return await res.json()
}

export async function deleteTodo(id: string | number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    if(!res.ok) throw new Error('Error deleting todo')
}
