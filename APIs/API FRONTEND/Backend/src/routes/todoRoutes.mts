import express  from "express";
import { getTodos, updateTodo, deleteTodo, createTodo, getTodosById } from "../controllers/todoController.mts";

//Create a new router instance
const router = express.Router();

// Define routes for the todo resource
router.get("/", getTodos);
router.get("/:id", getTodosById);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

// Export the router to be used in other parts of the application
export default router;