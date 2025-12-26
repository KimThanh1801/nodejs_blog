import express from "express";
import cors from "cors";
import usersRouter from "./routes/user.routes";
const app = express();

// CORS
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.use(express.json());

// Route chính
app.use("/users", usersRouter);

app.listen(5000, () => console.log("Server chạy cổng 5000"));