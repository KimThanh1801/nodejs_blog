import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("List of users");
});

router.get("/:id", (req, res) => {
  res.send(`User with ID ${req.params.id}`);
});

export default router;
