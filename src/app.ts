import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoutes"; // Ensure the path is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/users", userRoutes); // User routes under /api/users

// Handle unknown endpoints
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Global error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
