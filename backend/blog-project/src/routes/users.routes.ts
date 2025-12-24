import { Router } from "express";
import { UsersService } from "../modules/users/users.service.js";
import { usersController } from "../modules/users/users.controller.js";

const router = Router();
const usersService = new UsersService();

// Register
router.post("/register", (req, res) => {
    const { fullName, email, password } = req.body;
    if (usersService.findByEmail(email)) {
        return res.status(400).json({ message: "Email đã tồn tại" });
    }
    const user = usersService.create({ fullName, email, password });
    res.status(201).json(user);
});

// Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = usersService.findByEmail(email);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }
    const token = "fake-jwt-token";
    res.json({ user, token });
});
router.get("/", usersController.getAll);
export default router;
