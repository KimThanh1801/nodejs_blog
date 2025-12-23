import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("List of posts");
});

router.get("/:id", (req, res) => {
  res.send(`Post with ID ${req.params.id}`);
});

export default router;
