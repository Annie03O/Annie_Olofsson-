import {useState} from "react";
import { Todo } from "../models/Todo";

// Funktion som returnerar en lista med todos
export const TodoList = () => {
    //Lista med todosobjekt
    const [todos, setTodos] = useState<Todo[]>([
        new Todo(1, "Diska", false),
        new Todo(2, "Städa", false),
        new Todo(3, "Plugga", false),
        new Todo(4, "Vik tvätt", false),
    ])
    //Funktion som tar bort ett todoobjekt från listan med filter
    const removeTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }
    return (
        //Html som returneras
        <>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.task} <button onClick={() => removeTodo(todo.id)}>Del</button></li>
                ))}
            </ul>
        </>
    )
}