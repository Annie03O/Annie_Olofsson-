import { Request, Response } from "express";
import { Todo } from "../models/todo.mts";

// Sample data for demonstration purposes
const todos: Todo[] = [
    new Todo("1", "Learn TypeScript", false),
    new Todo("2", "Learn Express", false),      
    new Todo("3", "Learn MongoDB", false),
    new Todo("4", "Learn React", false),
    new Todo("5", "Learn Node.js", false),
    new Todo("6", "Learn Angular", false),
];

// Controller functions for handling requests related to todos

// Get all todos or filter by query parameter
export const getTodos = (req: Request, res: Response) => {
    const { q } = req.query;

    try {
        // If a query parameter is provided, filter the todos based on it
        if (q) {
            const filteredTodos = todos.filter(
                (t) => t.text
            )
            res.status(200).json(filteredTodos)
            // If no query parameter is provided, return all todos
        } else {  
            res.status(200).json(todos);
        }
        // If an error occurs, send a 500 status code with the error message
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a todo by its ID
export const getTodosById = (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      // Find the todo with the specified ID
      const foundTodo = todos.find((t) => t.id === +id);

      // If the todo is found, return it with a 200 status code
      if (foundTodo) {
        res.status(200).json(foundTodo);
      } 
      // If the todo is not found, return a 400 status code with an error message
      else {
        res.status(400).json({ status: "Invalid id" });
      }
    } 
    // If an error occurs, send a 500 status code with the error message
    catch (error) {
      res.status(500).send(error);
    }
  }
  
// Create a new todo
  export const createTodo = (req: Request, res: Response) => {
    // Extract the text from the request body
    const { text } = req.body
  
    try {
      // If the text is not provided, return a 400 status code with an error message
      if (!text) {
        res.status(400).json({ error: "Text is required" })
      } 
      // If the text is provided, create a new todo and add it to the todos array
      else {
        const newTodo = new Todo(todos.length + 1, text)
        todos.push(newTodo)
        res.status(201).json(newTodo)
      }
    } 
    // If an error occurs, send a 500 status code with the error message
    catch (error) {
      res.status(500).send(error)
    }
  }
  
// Update an existing todo by its ID
  export const updateTodo = (req: Request, res: Response) => {
    const { id } = req.params
    const { text } = req.body
  
    try {
      // Find the todo with the specified ID
      if (!text) {
        res.status(400).json({ error: "Text is required" })
      } 
      // If the todo is not found, return a 400 status code with an error message
      else {
        const todo = todos.find((t) => t.id === +id)
        
        // If todo is not found, return a 400 status code with an error message
        if (!todo) {
          res.status(400).json({ error: "Invalid id"})
        } 
        
        // If todo is found, update its text and return it with a 200 status code
        else {
          todo.text = text
          res.status(200).json(todo)
        }
      }
    } 
    // If an error occurs, send a 500 status code with the error message
    catch (error) {
      res.status(500).send(error)
    }
  }

  // Delete a todo by its ID
  export const deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params
  
    try {
      // Find the index of the todo with the specified ID
      const index = todos.findIndex((t) => t.id === +id)
  
      //If index is -1, return a 404 status code with an error message
      if (index === -1) {
        res.status(404).json({ error: "Todo not found" })
      } 
      // If the todo is found, remove it from the todos array and return it with a 200 status code
      else {
        const removedTodo = todos.splice(index, 1)
        res.status(200).json(removedTodo)
      }
    } 
    // If an error occurs, send a 500 status code with the error message
    catch (error) {
      res.status(500).send(error)
    }
  }