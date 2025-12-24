import { Router } from "express";

import userRoutes from "./user.routes.js";
import postRoutes from "./post.routes.js";

const router = Router();

// router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);

router.get("/health", (req, res) => {
  res.json({
    status: "success",
    message: "API is running",
    statusCode: 200,
    data: {
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
