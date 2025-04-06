import express from "express";
import { getCharacters, getCharacterById, addCharacter, updateCharacters, deleteCharacter } from "../controllers/SLControllers.mjs";

// Importing the necessary functions from the controller
const router = express.Router();

// Importing express and the controller functions
router.get("/", getCharacters);
router.get(":id", getCharacterById);
router.post("/", addCharacter);
router.put(":id", updateCharacters);
router.delete("/:id", deleteCharacter);

// Define the routes for the API
export default router;