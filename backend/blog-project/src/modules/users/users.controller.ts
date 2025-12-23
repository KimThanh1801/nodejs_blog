import { Request, Response, NextFunction } from 'express';
import { CreateUserDto } from './dto/users.dto.js';
import { userService } from './users.service.js';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData: CreateUserDto = req.body;
    const newUser = await userService.create(userData);
    res.status(201).json({ message: 'Tạo người dùng thành công', data: newUser });
  } catch (error) {
    next(error);
  }
};
