import express from "express";
import { Request, Response } from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import reservationRoutes from "./routes/reservation";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

connectDB();

app.use(express.json()); // Middleware to parse JSON
app.use("/api", reservationRoutes);

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

app.use((err: any, _req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
