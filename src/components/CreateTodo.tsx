import React, { useState } from "react";

interface Props {
    saveTodo: (title : string) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        if (inputValue.trim().length === 0) return
        saveTodo(inputValue )
        setInputValue('')
    }
    return (
        <form onSubmit={handleSubmit}>
            <input  
                className="new-todo"
                value={inputValue}
                onChange={(e)=>{setInputValue(e.target.value)}}
                placeholder="¿Qué hay que hacer?"
                autoFocus
            />
        </form>
    )
}