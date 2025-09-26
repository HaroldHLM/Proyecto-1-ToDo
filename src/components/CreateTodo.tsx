import React, { useState } from "react";

interface Props {
    saveTodo: (title : string) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        saveTodo({ title: inputValue } as unknown as string)
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