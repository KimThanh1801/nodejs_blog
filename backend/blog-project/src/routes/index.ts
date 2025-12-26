import { Router } from "express";

import userRoutes from "./user.routes";
import postRoutes from "./post.routes";
import commentRoute from "./post.routes";
import likeRoute from "./like.route";

const routers = Router();

// router.use("/auth", authRoutes);
routers.use("/users", userRoutes);
routers.use("/posts", postRoutes);
routers.use("/", commentRoute);
routers.use("/", likeRoute);

routers.get("/health", (req, res) => {
  res.json({
    status: "success",
    message: "API is running",
    statusCode: 200,
    data: {
      timestamp: new Date().toISOString(),
    },
  });
});

export default routers;
