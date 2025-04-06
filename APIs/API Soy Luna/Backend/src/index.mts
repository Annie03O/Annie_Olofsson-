import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { logger } from "./middeware/logger.mjs";
import router from "./routes/SLRoutes.mjs";

dotenv.config();

// My app runs on port 3000 or the port specified in the environment variable PORT
const port = process.env.PORT || 3000;

// Create an instance of express
const app = express();

// Middleware to parse JSON requests and responses
app.use(express.json());

// Middleware to parse URL-encoded requests and responses
app.use(logger);
app.use(morgan('tiny'));
app.use(cors ({
   credentials: true,
   origin: true
}));

//My endpoint to get the characters
app.use('/Soy_Luna', router);

//Get request to check if the server is alive
app.get("/ping", (_, res) => {
    res.status(200).json({ status: "Alive"})
});

//Listen to the server on the specified port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    
})