import { Todo } from "./models/Todo";
import "./style.css";

// This constants are used to define the API URL and the headers for the fetch requests
const response = await fetch("http://localhost:3000/todos");

//  This is the type of the response we expect from the API
const todos: Todo[] = await response.json();

// This is the ul element where we will append the todos
const ul = document.createElement("ul");
document.body.appendChild(ul);

// This foreach loop iterates over the todos array and creates a li element for each todo 
todos.forEach((todo) => {
  const li = document.createElement("li");
  li.innerHTML = todo.text;
  ul.appendChild(li);
  // This if statement checks if the todo is done and adds the class "done" to the li element
  if (todo.done) {  
    li.className = "done";
  }
})
