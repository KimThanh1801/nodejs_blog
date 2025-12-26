import { Router } from "express";
import { UsersModule } from "../modules/users/users.module";

const router = Router();

// Register
router.post("/register", (req, res) => {
    const { fullName, email, password } = req.body;
    if (UsersModule.service.findByEmail(email)) {
        return res.status(400).json({ message: "Email đã tồn tại" });
    }
    const user = UsersModule.service.create({ fullName, email, password });
    res.status(201).json(user);
});

// Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = UsersModule.service.findByEmail(email);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }
    const token = "fake-jwt-token";
    res.json({ user, token });
});
router.get("/", UsersModule.controller.getAll);
export default router;