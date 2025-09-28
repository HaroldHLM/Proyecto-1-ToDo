import React from "react";
import { CreateTodo } from "./CreateTodo";

interface Props {
    onAddTodo: (title : string) => void
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
    return (
        <header>
        <h1>todos<img
            style={{width: "60px", height: "auto"}}
            src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" 
            alt="TypeScript Logo" 
            />
        </h1>
        <CreateTodo saveTodo={onAddTodo}/>
        </header>
    )
}