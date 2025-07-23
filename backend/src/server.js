// 
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import routeserver from "./routes/routeserver.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ CORS should come before all routes
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

// ✅ All routes AFTER CORS is enabled
app.use("/api/data", rateLimiter, (req, res) => {
  res.json({ message: "✅ Success! You're within the rate limit." });
});

app.use("/api/notes", rateLimiter, routeserver);

// ✅ Connect DB & Start Server
connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server running successfully at 5001");
  });
});
