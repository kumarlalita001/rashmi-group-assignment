import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import connectDB from "./config/dbConneection.js";
import cors from "cors";

dotenv.config(); // Load environment variables from.env file.

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // If you need to include credentials like cookies
  })
);

app.use(cookieParser()); // to get cookie in req.cookie.jwt
app.use(express.json()); // middlware for forms datas stuffs
app.use(express.urlencoded({ extended: true }));

//Import Routes

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("ERROR at DB");
  });
