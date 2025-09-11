import {useState} from "react";
import { Todo } from "../models/Todo";

// Functional component for the TodoList
export const TodoList = () => {
    // State to hold the list of todos
    const [todos, setTodos] = useState<Todo[]>([
        new Todo(1, "Diska", false),
        new Todo(2, "Städa", false),
        new Todo(3, "Plugga", false),
        new Todo(4, "Vik tvätt", false),
    ])

    //Function to remove a todo by its id
    const removeTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }
    return (
        //Html structure for displaying the todo list
        <>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.task} <button onClick={() => removeTodo(todo.id)}>Del</button></li>
                ))}
            </ul>
        </>
    )
}