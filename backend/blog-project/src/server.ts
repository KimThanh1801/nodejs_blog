import express from "express";
import cors from "cors";
import usersRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";
import path from "path";
import likePost from './routes/like.route';
import commentPost from "./routes/comment.route";
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
app.use("/posts", postRouter);
app.use("/posts", likePost);
app.use("/posts", commentPost);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));


app.listen(5000, () => console.log("Server chạy cổng 5000"));