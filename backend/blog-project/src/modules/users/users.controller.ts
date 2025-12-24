import { Request, Response } from "express";
import { UsersService } from "./users.service.js";

const usersService = new UsersService();

export const usersController = {
  register: (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;
    if (usersService.findByEmail(email)) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    const user = usersService.create({ fullName, email, password });
    res.status(201).json(user);
  },

  login: (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = usersService.findByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }
    const token = "fake-jwt-token";
    res.json({ user, token });
  },

  getAll: (req: Request, res: Response) => {
    res.json(usersService.findAll());
  },
};