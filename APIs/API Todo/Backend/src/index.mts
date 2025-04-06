import express from "express";
import { logger } from './middleware/logger.mjs'
import dotenv from "dotenv";
import morgan from 'morgan'
import todoRoutes from './routes/todoRoutes.mjs'
import cors from 'cors'

// Load environment variables from .env file
dotenv.config();

// Set the port to the value from the environment variable or default to 3000
const port = process.env.PORT || 3000;

// Create an Express application
const app = express();

// Middleware setup
app.use(express.json())
app.use(logger)
app.use(morgan('tiny'))
// Enable CORS for all routes and origins
app.use(cors({
  credentials: true,
  origin: true,
}))

// Endpoint to serve static files from the "public" directory
app.use('/todos', todoRoutes)
app.get("/ping", (_, res) => {
  res.status(200).json({ status: "Alive" });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
